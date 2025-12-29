from sqlalchemy.orm import Session
import models

def get_all(db: Session):
    return db.query(models.Skill).all()

def get_by_id(db: Session, skill_id: int):
    return db.query(models.Skill).filter(models.Skill.id == skill_id).first()

def create(db: Session, data):
    skill = models.Skill(**data.dict())
    db.add(skill)
    db.commit()
    db.refresh(skill)
    return skill

def update(db: Session, skill_id: int, data):
    skill = get_by_id(db, skill_id)
    if not skill:
        return None
    for key, value in data.dict().items():
        setattr(skill, key, value)
    db.commit()
    db.refresh(skill)
    return skill

def delete(db: Session, skill_id: int):
    skill = get_by_id(db, skill_id)
    if skill:
        db.delete(skill)
        db.commit()
    return skill
