from sqlalchemy.orm import Session
import models

def get_all(db: Session):
    return db.query(models.Enrollment).all()

def get_by_id(db: Session, enrollment_id: int):
    return db.query(models.Enrollment).filter(models.Enrollment.id == enrollment_id).first()

def enroll(db: Session, user_id: int, course_id: int):
    enrollment = models.Enrollment(
        user_id=user_id,
        course_id=course_id,
        status="enrolled"
    )
    db.add(enrollment)
    db.commit()
    db.refresh(enrollment)
    return enrollment

def get_by_user(db: Session, user_id: int):
    return db.query(models.Enrollment).filter(
        models.Enrollment.user_id == user_id
    ).all()

def update(db: Session, enrollment_id: int, status: str = None):
    e = get_by_id(db, enrollment_id)
    if not e:
        return None
    if status is not None:
        e.status = status
    db.commit()
    db.refresh(e)
    return e

def delete(db: Session, enrollment_id: int):
    e = get_by_id(db, enrollment_id)
    if e:
        db.delete(e)
        db.commit()
    return e
