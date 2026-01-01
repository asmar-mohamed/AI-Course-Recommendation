from sqlalchemy.orm import Session
import models

def get_all(db: Session):
    return db.query(models.User).all()

def get_by_id(db: Session, user_id: int):
    return db.query(models.User).filter(models.User.id == user_id).first()

def create(db: Session, data):
    user = models.User(**data.dict())
    db.add(user)
    db.commit()
    db.refresh(user)
    return user

def update(db: Session, user_id: int, data):
    user = get_by_id(db, user_id)
    if not user:
        return None
    for key, value in data.dict(exclude_unset=True).items():
        if value is not None:
            setattr(user, key, value)
    db.commit()
    db.refresh(user)
    return user

def delete(db: Session, user_id: int):
    user = get_by_id(db, user_id)
    if user:
        db.delete(user)
        db.commit()
    return user
