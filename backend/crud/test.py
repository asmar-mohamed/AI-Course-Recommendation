from sqlalchemy.orm import Session
import models

def get_all(db: Session):
    return db.query(models.Test).all()

def get_by_id(db: Session, test_id: int):
    return db.query(models.Test).filter(models.Test.id == test_id).first()

def create(db: Session, skill_id: int, title: str, duration: int):
    test = models.Test(
        skill_id=skill_id,
        title=title,
        duration=duration
    )
    db.add(test)
    db.commit()
    db.refresh(test)
    return test

def update(db: Session, test_id: int, title: str = None, duration: int = None):
    t = get_by_id(db, test_id)
    if not t:
        return None
    if title is not None:
        t.title = title
    if duration is not None:
        t.duration = duration
    db.commit()
    db.refresh(t)
    return t

def delete(db: Session, test_id: int):
    t = get_by_id(db, test_id)
    if t:
        db.delete(t)
        db.commit()
    return t
