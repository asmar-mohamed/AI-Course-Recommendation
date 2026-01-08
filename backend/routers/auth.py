from fastapi import APIRouter, Depends, HTTPException, status, Header
from sqlalchemy.orm import Session
from datetime import datetime, timedelta
from database import get_db
import models
from schemas import LoginPayload, RegisterPayload, TokenResponse, UserOut
from passlib.context import CryptContext
import jwt

# Password hashing context using bcrypt, with pbkdf2_sha256 as a fallback if bcrypt is unavailable
pwd_context = CryptContext(schemes=["bcrypt", "pbkdf2_sha256"], deprecated="auto")
# bcrypt has a 72-byte maximum — enforce a friendly validation for bcrypt scheme
MAX_BCRYPT_PASSWORD_BYTES = 72

router = APIRouter(tags=["Auth"])

import os

# WARNING: In production load this from environment variables and keep it secret
SECRET_KEY = os.environ.get('SECRET_KEY', 'CHANGE_THIS_SECRET')
ALGORITHM = 'HS256'
ACCESS_TOKEN_EXPIRE_MINUTES = 60 * 24  # 1 day

@router.post('/register', response_model=TokenResponse)
def register(payload: RegisterPayload, db: Session = Depends(get_db)):
    # check existing
    existing = db.query(models.User).filter(models.User.email == payload.email).first()
    if existing:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail='Email already registered')

    # Enforce bcrypt max password length (72 bytes)
    if len(payload.password.encode('utf-8')) > MAX_BCRYPT_PASSWORD_BYTES:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f'Password too long. Maximum {MAX_BCRYPT_PASSWORD_BYTES} bytes allowed.'
        )

    try:
        # try hashing with bcrypt (default)
        hashed = pwd_context.hash(payload.password)
    except Exception as e:
        # If bcrypt fails (e.g. backend incompatible or length error), fall back to pbkdf2_sha256
        try:
            hashed = pwd_context.hash(payload.password, scheme='pbkdf2_sha256')
            # Log a warning; pbkdf2 used as fallback
            print(f"WARNING: bcrypt hashing failed, used pbkdf2_sha256 fallback: {str(e)}")
        except Exception as e2:
            # Both hashing attempts failed — surface a helpful message
            raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                                detail=(f'Password hashing failed: {str(e)}. Fallback failed: {str(e2)}. '
                                        'Ensure the "bcrypt" backend is installed (pip install bcrypt) or fix password constraints.'))

    user = models.User(name=payload.name, email=payload.email, password=hashed, role='user')
    db.add(user)
    db.commit()
    db.refresh(user)

    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    expire = datetime.utcnow() + access_token_expires
    token = jwt.encode({'user_id': user.id, 'exp': expire}, SECRET_KEY, algorithm=ALGORITHM)

    return {'access_token': token, 'token_type': 'bearer', 'user': user}

@router.post('/login', response_model=TokenResponse)
def login(payload: LoginPayload, db: Session = Depends(get_db)):
    user = db.query(models.User).filter(models.User.email == payload.email).first()
    if not user:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail='Invalid credentials')

    verified = False
    try:
        verified = pwd_context.verify(payload.password, user.password)
    except Exception as e:
        # If the stored value is a legacy plaintext password (no leading '$'), allow a one-time migration:
        stored = str(user.password or '')
        if stored and not stored.startswith('$'):
            # compare plaintext (unsafe), then re-hash with bcrypt and save
            if payload.password == stored:
                try:
                    new_hash = pwd_context.hash(payload.password)
                    user.password = new_hash
                    db.commit()
                    db.refresh(user)
                    verified = True
                except Exception as e2:
                    raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                                        detail=f'Password migration failed: {str(e2)}')
            else:
                raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail='Invalid credentials')
        else:
            # Unknown hash format or bcrypt backend error
            raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                                detail=f'Password verification failed: {str(e)}. Ensure the "bcrypt" backend is installed and compatible.')

    if not verified:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail='Invalid credentials')

    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    expire = datetime.utcnow() + access_token_expires
    token = jwt.encode({'user_id': user.id, 'exp': expire}, SECRET_KEY, algorithm=ALGORITHM)
    return {'access_token': token, 'token_type': 'bearer', 'user': user}

# Dependency to get current user
def get_current_user(authorization: str | None = Header(None), db: Session = Depends(get_db)):
    if not authorization:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail='Not authenticated')
    try:
        scheme, token = authorization.split()
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        user_id = payload.get('user_id')
        if user_id is None:
            raise Exception('Invalid token')
    except Exception:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail='Invalid authentication token')
    user = db.query(models.User).filter(models.User.id == user_id).first()
    if not user:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail='User not found')
    return user
    
def get_admin_user(current_user: models.User = Depends(get_current_user)):
    if current_user.role != 'admin':
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="The user doesn't have enough privileges"
        )
    return current_user

@router.get('/me', response_model=UserOut)
def me(current_user: models.User = Depends(get_current_user)):
    return current_user
