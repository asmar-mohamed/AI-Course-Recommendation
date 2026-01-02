from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from database import get_db
import crud.choice as crud
from schemas import ChoiceCreate, ChoiceResponse

router = APIRouter(tags=["Choices"])

@router.post("/", response_model=ChoiceResponse)
def create(data: ChoiceCreate, db: Session = Depends(get_db)):
    return crud.create(db, data.question_id, data.text, data.is_correct)

@router.get("/", response_model=list[ChoiceResponse])
def get_all(db: Session = Depends(get_db)):
    return crud.get_all(db)

@router.get("/{choice_id}", response_model=ChoiceResponse)
def get_by_id(choice_id: int, db: Session = Depends(get_db)):
    return crud.get_by_id(db, choice_id)

@router.put("/{choice_id}", response_model=ChoiceResponse)
def update(choice_id: int, data: ChoiceCreate, db: Session = Depends(get_db)):
    return crud.update(db, choice_id, data.text, data.is_correct)

@router.delete("/{choice_id}", response_model=ChoiceResponse)
def delete(choice_id: int, db: Session = Depends(get_db)):
    return crud.delete(db, choice_id)
