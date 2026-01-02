from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from database import get_db
import crud.test as crud
from schemas import TestCreate, TestResponse, TestWithQuestionsResponse, TestSubmission, TestResult
from routers.auth import get_current_user
import models

router = APIRouter(tags=["Tests"])

@router.post("/", response_model=TestResponse)
def create(data: TestCreate, db: Session = Depends(get_db)):
    return crud.create(db, data.skill_id, data.title, data.duration)

@router.get("/", response_model=list[TestResponse])
def get_all(db: Session = Depends(get_db)):
    return crud.get_all(db)

@router.get("/{test_id}", response_model=TestResponse)
def get_by_id(test_id: int, db: Session = Depends(get_db)):
    return crud.get_by_id(db, test_id)

@router.put("/{test_id}", response_model=TestResponse)
def update(test_id: int, data: TestCreate, db: Session = Depends(get_db)):
    return crud.update(db, test_id, data.title, data.duration)

@router.delete("/{test_id}", response_model=TestResponse)
def delete(test_id: int, db: Session = Depends(get_db)):
    return crud.delete(db, test_id)

@router.get("/test-by-skill/{skill_id}", response_model=TestResponse)
def get_by_skill(skill_id: int, db: Session = Depends(get_db)):
    test = db.query(models.Test).filter(models.Test.skill_id == skill_id).first()
    if not test:
        from fastapi import HTTPException
        raise HTTPException(status_code=404, detail="No test found for this skill")
    return test

@router.get("/{test_id}/questions", response_model=TestWithQuestionsResponse)
def get_questions(test_id: int, db: Session = Depends(get_db)):
    test = crud.get_by_id(db, test_id)
    if not test:
        from fastapi import HTTPException
        raise HTTPException(status_code=404, detail="Test not found")
    return test

@router.post("/{test_id}/submit", response_model=TestResult)
def submit_test(test_id: int, data: TestSubmission, db: Session = Depends(get_db)):
    test = crud.get_by_id(db, test_id)
    if not test:
        from fastapi import HTTPException
        raise HTTPException(status_code=404, detail="Test not found")
    
    total_score = 0
    max_score = sum(q.points for q in test.questions)
    
    for ans in data.answers:
        question_id = ans.get("question_id")
        choice_id = ans.get("choice_id")
        
        q = next((q for q in test.questions if q.id == question_id), None)
        if q:
            correct_choice = next((c for c in q.choices if c.is_correct), None)
            if correct_choice and correct_choice.id == choice_id:
                total_score += q.points
                
    score_ratio = total_score / max_score if max_score > 0 else 1.0
    passed = score_ratio >= 0.6
    
    if passed:
        # Determine level based on score
        level = "Beginner"
        if score_ratio >= 1.0:
            level = "Expert"
        elif score_ratio >= 0.8:
            level = "Advanced"
        elif score_ratio >= 0.6:
            level = "Intermediate"

        from crud.user_skill import get_by_user, create as create_user_skill, update as update_user_skill
        from schemas import UserSkillCreate
        
        # Check if user already has this skill
        existing_skills = get_by_user(db, data.user_id)
        existing_us = next((us for us in existing_skills if us.skill_id == test.skill_id), None)
        
        if existing_us:
            # Update if the new score is higher or equal
            if score_ratio >= existing_us.score:
                update_user_skill(db, existing_us.id, score=score_ratio, level=level)
        else:
            # Create new
            create_user_skill(db, UserSkillCreate(
                user_id=data.user_id,
                skill_id=test.skill_id,
                level=level,
                score=score_ratio
            ))

    return {
        "score": score_ratio,
        "total_points": total_score,
        "passed": passed,
        "skill_id": test.skill_id
    }
