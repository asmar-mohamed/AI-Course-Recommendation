from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from database import get_db
import crud.user_answer as crud
from schemas import UserAnswerCreate, UserAnswerResponse

router = APIRouter(tags=["User Answers"])

@router.post("/", response_model=UserAnswerResponse)
def create(data: UserAnswerCreate, db: Session = Depends(get_db)):
    return crud.create(db, data.user_id, data.question_id, data.choice_id, data.score)

@router.get("/", response_model=list[UserAnswerResponse])
def get_all(db: Session = Depends(get_db)):
    return crud.get_all(db)

@router.get("/user/{user_id}", response_model=list[UserAnswerResponse])
def get_by_user(user_id: int, db: Session = Depends(get_db)):
    return crud.get_by_user(db, user_id)

@router.get("/{ua_id}", response_model=UserAnswerResponse)
def get_by_id(ua_id: int, db: Session = Depends(get_db)):
    return crud.get_by_id(db, ua_id)

@router.put("/{ua_id}", response_model=UserAnswerResponse)
def update(ua_id: int, data: UserAnswerCreate, db: Session = Depends(get_db)):
    return crud.update(db, ua_id, data.score, data.choice_id)

@router.delete("/{ua_id}", response_model=UserAnswerResponse)
def delete(ua_id: int, db: Session = Depends(get_db)):
    return crud.delete(db, ua_id)
