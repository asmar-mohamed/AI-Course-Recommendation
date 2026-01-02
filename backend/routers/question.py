from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from database import get_db
import crud.question as crud
from schemas import QuestionCreate, QuestionResponse

router = APIRouter(tags=["Questions"])

@router.post("/", response_model=QuestionResponse)
def create(data: QuestionCreate, db: Session = Depends(get_db)):
    return crud.create(db, data.test_id, data.text, data.points)

@router.get("/", response_model=list[QuestionResponse])
def get_all(db: Session = Depends(get_db)):
    return crud.get_all(db)

@router.get("/{question_id}", response_model=QuestionResponse)
def get_by_id(question_id: int, db: Session = Depends(get_db)):
    return crud.get_by_id(db, question_id)

@router.put("/{question_id}", response_model=QuestionResponse)
def update(question_id: int, data: QuestionCreate, db: Session = Depends(get_db)):
    return crud.update(db, question_id, data.text, data.points)

@router.delete("/{question_id}", response_model=QuestionResponse)
def delete(question_id: int, db: Session = Depends(get_db)):
    return crud.delete(db, question_id)
