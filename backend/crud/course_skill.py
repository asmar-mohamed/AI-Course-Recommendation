from sqlalchemy.orm import Session
import models

def get_all(db: Session):
    return db.query(models.CourseSkill).all()

def get_by_id(db: Session, cs_id: int):
    return db.query(models.CourseSkill).filter(models.CourseSkill.id == cs_id).first()

def create(db: Session, course_id: int, skill_id: int, weight: float):
    cs = models.CourseSkill(
        course_id=course_id,
        skill_id=skill_id,
        weight=weight
    )
    db.add(cs)
    db.commit()
    db.refresh(cs)
    return cs

def update(db: Session, cs_id: int, course_id: int = None, skill_id: int = None, weight: float = None):
    cs = get_by_id(db, cs_id)
    if not cs:
        return None
    if course_id is not None:
        cs.course_id = course_id
    if skill_id is not None:
        cs.skill_id = skill_id
    if weight is not None:
        cs.weight = weight
    db.commit()
    db.refresh(cs)
    return cs

def delete(db: Session, cs_id: int):
    cs = get_by_id(db, cs_id)
    if cs:
        db.delete(cs)
        db.commit()
    return cs
