from sqlalchemy.orm import Session
import models

def get_all(db: Session):
    return db.query(models.Question).all()

def get_by_id(db: Session, question_id: int):
    return db.query(models.Question).filter(models.Question.id == question_id).first()

def create(db: Session, test_id: int, text: str, points: int):
    q = models.Question(
        test_id=test_id,
        text=text,
        points=points
    )
    db.add(q)
    db.commit()
    db.refresh(q)
    return q

def update(db: Session, question_id: int, text: str = None, points: int = None):
    q = get_by_id(db, question_id)
    if not q:
        return None
    if text is not None:
        q.text = text
    if points is not None:
        q.points = points
    db.commit()
    db.refresh(q)
    return q

def delete(db: Session, question_id: int):
    q = get_by_id(db, question_id)
    if q:
        db.delete(q)
        db.commit()
    return q
