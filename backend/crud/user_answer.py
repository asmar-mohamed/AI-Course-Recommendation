from sqlalchemy.orm import Session
import models

def get_all(db: Session):
    return db.query(models.UserAnswer).all()

def get_by_id(db: Session, ua_id: int):
    return db.query(models.UserAnswer).filter(models.UserAnswer.id == ua_id).first()

def get_by_user(db: Session, user_id: int):
    return db.query(models.UserAnswer).filter(models.UserAnswer.user_id == user_id).all()

def create(db: Session, user_id: int, question_id: int, choice_id: int, score: float):
    ua = models.UserAnswer(
        user_id=user_id,
        question_id=question_id,
        choice_id=choice_id,
        score=score
    )
    db.add(ua)
    db.commit()
    db.refresh(ua)
    return ua

def update(db: Session, ua_id: int, score: float = None, choice_id: int = None):
    ua = get_by_id(db, ua_id)
    if not ua:
        return None
    if score is not None:
        ua.score = score
    if choice_id is not None:
        ua.choice_id = choice_id
    db.commit()
    db.refresh(ua)
    return ua

def delete(db: Session, ua_id: int):
    ua = get_by_id(db, ua_id)
    if ua:
        db.delete(ua)
        db.commit()
    return ua
