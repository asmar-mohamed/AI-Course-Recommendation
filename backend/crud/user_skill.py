from sqlalchemy.orm import Session, joinedload
import models
import services.recommendation_service as rec_service

def get_all(db: Session):
    return db.query(models.UserSkill).options(joinedload(models.UserSkill.skill)).all()

def get_by_id(db: Session, us_id: int):
    return db.query(models.UserSkill).options(joinedload(models.UserSkill.skill)).filter(models.UserSkill.id == us_id).first()

def get_by_user(db: Session, user_id: int):
    return db.query(models.UserSkill).options(joinedload(models.UserSkill.skill)).filter(
        models.UserSkill.user_id == user_id
    ).all()

def create(db: Session, data):
    existing = db.query(models.UserSkill).filter(
        models.UserSkill.user_id == data.user_id,
        models.UserSkill.skill_id == data.skill_id
    ).first()
    if existing:
        # Avoid circular import issues by importing HTTPException inside the function or file
        from fastapi import HTTPException
        raise HTTPException(status_code=400, detail="Skill already added for this user")

    us = models.UserSkill(**data.dict())
    db.add(us)
    db.commit()
    db.refresh(us)
    # trigger recommendation generation for the user
    rec_service.generate_for_user(db, us.user_id)
    return us

def update(db: Session, us_id: int, score: float = None, level: str = None):
    us = get_by_id(db, us_id)
    if not us:
        return None
    if score is not None:
        us.score = score
    if level is not None:
        us.level = level
    db.commit()
    db.refresh(us)
    # trigger recommendation generation for the user
    rec_service.generate_for_user(db, us.user_id)
    return us

def delete(db: Session, us_id: int):
    us = get_by_id(db, us_id)
    if us:
        user_id = us.user_id
        db.delete(us)
        db.commit()
        # regenerate recommendations since the user's skill changed
        rec_service.generate_for_user(db, user_id)
    return us
