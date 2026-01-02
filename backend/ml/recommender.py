from sklearn.metrics.pairwise import cosine_similarity
import numpy as np

import models


def compute_similarity_scores(db, user_id: int):
    """Return a list of (course_id, score) sorted by score desc.
    Scores are cosine similarity between the user's skill vector and each course's skill vector.
    """
    # ordered list of skill ids for consistent vectors
    skills = db.query(models.Skill).order_by(models.Skill.id).all()
    skill_ids = [s.id for s in skills]

    if not skill_ids:
        return []

    # user vector
    user_skills = db.query(models.UserSkill).filter(models.UserSkill.user_id == user_id).all()
    user_map = {us.skill_id: us.score for us in user_skills}
    user_vec = np.array([user_map.get(sid, 0.0) for sid in skill_ids]).reshape(1, -1)

    # course vectors
    courses = db.query(models.Course).all()
    if not courses:
        return []

    course_vectors = []
    course_ids = []
    for course in courses:
        cs_map = {cs.skill_id: cs.weight for cs in course.skills}
        vec = [cs_map.get(sid, 0.0) for sid in skill_ids]
        course_vectors.append(vec)
        course_ids.append(course.id)

    X = np.array(course_vectors)

    # handle case where either user vector or course vectors are all zeros
    if np.all(user_vec == 0) or np.all(X == 0):
        # all zeros -> similarity undefined; fallback to zeros
        sims = np.zeros(len(course_ids))
    else:
        sims = cosine_similarity(user_vec, X)[0]

    results = list(zip(course_ids, sims.tolist()))
    results.sort(key=lambda x: x[1], reverse=True)
    return results
