import models
from ml.recommender import compute_similarity_scores


def generate_for_user(db, user_id: int, top_k: int | None = None):
    #compute similarity scores
    scores = compute_similarity_scores(db, user_id)

    #filter
    scores = [s for s in scores if s[1] > 0]

    #remove previous recommendations for user
    db.query(models.Recommendation).filter(models.Recommendation.user_id == user_id).delete(synchronize_session=False)
    db.commit()

    #create new recommendations
    created = []
    for course_id, score in (scores if top_k is None else scores[:top_k]):
        rec = models.Recommendation(user_id=user_id, course_id=course_id, score=float(score))
        db.add(rec)
        created.append(rec)

    db.commit()
    for rec in created:
        db.refresh(rec)

    return created


def get_for_user(db, user_id: int):
    recs = db.query(models.Recommendation)\
             .filter(models.Recommendation.user_id == user_id)\
             .order_by(models.Recommendation.score.desc()).all()
    
    # Populate extra fields required by schema
    results = []
    for r in recs:
        # Pydantic will read basic fields from 'r'
        # We inject the computed/related fields
        if r.course:
            r.course_name = r.course.title
            r.course_url = r.course.course_url
            r.matched_skills = [cs.skill for cs in r.course.skills]
        else:
            r.course_name = "Unknown Course"
            r.course_url = None
            r.matched_skills = []
        results.append(r)
    return results
