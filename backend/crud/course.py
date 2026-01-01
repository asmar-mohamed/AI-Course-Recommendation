from sqlalchemy.orm import Session
import models

def get_all(db: Session):
    return db.query(models.Course).all()

def get_by_id(db: Session, course_id: int):
    return db.query(models.Course).filter(models.Course.id == course_id).first()

def create(db: Session, data):
    course = models.Course(**data.dict())
    db.add(course)
    db.commit()
    db.refresh(course)
    return course

def update(db: Session, course_id: int, data):
    course = get_by_id(db, course_id)
    if not course:
        return None
    for key, value in data.dict().items():
        setattr(course, key, value)
    db.commit()
    db.refresh(course)
    return course

def delete(db: Session, course_id: int):
    course = get_by_id(db, course_id)
    if course:
        db.delete(course)
        db.commit()
    return course
