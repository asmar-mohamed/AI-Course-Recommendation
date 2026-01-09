from fastapi import APIRouter, Depends, UploadFile, File, HTTPException
from sqlalchemy.orm import Session
from database import get_db
import crud.user as crud
from schemas import UserCreate, UserUpdate, UserResponse
import os
from datetime import datetime

router = APIRouter()

# Directory for profile pictures - save to frontend/public
UPLOAD_DIR = "../frontend/public/uploads/profile_pictures"
os.makedirs(UPLOAD_DIR, exist_ok=True)

@router.post("/", response_model=UserResponse)
def create(user: UserCreate, db: Session = Depends(get_db)):
    return crud.create(db, user)

@router.get("/", response_model=list[UserResponse])
def get_all(db: Session = Depends(get_db)):
    return crud.get_all(db)

@router.get("/{user_id}", response_model=UserResponse)
def get_by_id(user_id: int, db: Session = Depends(get_db)):
    return crud.get_by_id(db, user_id)

@router.put("/{user_id}", response_model=UserResponse)
def update(user_id: int, user: UserUpdate, db: Session = Depends(get_db)):
    return crud.update(db, user_id, user)

@router.delete("/{user_id}", response_model=UserResponse)
def delete(user_id: int, db: Session = Depends(get_db)):
    return crud.delete(db, user_id)

@router.post("/{user_id}/profile-picture")
async def upload_profile_picture(user_id: int, file: UploadFile = File(...), db: Session = Depends(get_db)):
    """Upload profile picture for a user"""
    try:
        # Validate file type
        allowed_types = ["image/jpeg", "image/png", "image/gif", "image/webp"]
        if file.content_type not in allowed_types:
            raise HTTPException(status_code=400, detail="Invalid file type. Only image files allowed.")
        
        # Generate unique filename
        timestamp = datetime.utcnow().timestamp()
        filename = f"user_{user_id}_{timestamp}_{file.filename}"
        filepath = os.path.join(UPLOAD_DIR, filename)
        
        # Save file
        contents = await file.read()
        with open(filepath, "wb") as f:
            f.write(contents)
        
        # Update user profile picture in database
        picture_url = f"/uploads/profile_pictures/{filename}"
        user_data = UserUpdate(profile_picture=picture_url)
        updated_user = crud.update(db, user_id, user_data)
        
        return {"message": "Profile picture uploaded successfully", "user": updated_user}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
