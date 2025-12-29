from sqlalchemy.orm import Session
import models

def get_all(db: Session):
    return db.query(models.Choice).all()

def get_by_id(db: Session, choice_id: int):
    return db.query(models.Choice).filter(models.Choice.id == choice_id).first()

def create(db: Session, question_id: int, text: str, is_correct: bool):
    c = models.Choice(
        question_id=question_id,
        text=text,
        is_correct=is_correct
    )
    db.add(c)
    db.commit()
    db.refresh(c)
    return c

def update(db: Session, choice_id: int, text: str = None, is_correct: bool = None):
    c = get_by_id(db, choice_id)
    if not c:
        return None
    if text is not None:
        c.text = text
    if is_correct is not None:
        c.is_correct = is_correct
    db.commit()
    db.refresh(c)
    return c

def delete(db: Session, choice_id: int):
    c = get_by_id(db, choice_id)
    if c:
        db.delete(c)
        db.commit()
    return c
