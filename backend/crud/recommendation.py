from sqlalchemy.orm import Session
import models

def get_all(db: Session):
    return db.query(models.Recommendation).all()

def get_by_id(db: Session, rec_id: int):
    return db.query(models.Recommendation).filter(models.Recommendation.id == rec_id).first()

def create(db: Session, user_id: int, course_id: int, score: float):
    rec = models.Recommendation(
        user_id=user_id,
        course_id=course_id,
        score=score
    )
    db.add(rec)
    db.commit()
    db.refresh(rec)
    return rec

def generate_for_user(db: Session, user_id: int):
    # Simple scorer: sum of (user_skill.score * course_skill.weight)
    user_skills = {us.skill_id: us.score for us in db.query(models.UserSkill).filter(models.UserSkill.user_id == user_id).all()}
    courses = db.query(models.Course).all()
    result = []
    for course in courses:
        score = 0.0
        for cs in course.skills:
            if cs.skill_id in user_skills and cs.weight:
                score += user_skills[cs.skill_id] * cs.weight
        rec = models.Recommendation(user_id=user_id, course_id=course.id, score=score)
        db.add(rec)
        db.commit()
        db.refresh(rec)
        result.append(rec)
    return result

def get_by_user(db: Session, user_id: int):
    return db.query(models.Recommendation).filter(
        models.Recommendation.user_id == user_id
    ).order_by(models.Recommendation.score.desc()).all()

def update(db: Session, rec_id: int, score: float = None):
    r = get_by_id(db, rec_id)
    if not r:
        return None
    if score is not None:
        r.score = score
    db.commit()
    db.refresh(r)
    return r

def delete(db: Session, rec_id: int):
    r = get_by_id(db, rec_id)
    if r:
        db.delete(r)
        db.commit()
    return r
