from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from database import get_db
import crud.skill as crud
from schemas import SkillCreate, SkillResponse

router = APIRouter()

@router.post("/", response_model=SkillResponse)
def create(skill: SkillCreate, db: Session = Depends(get_db)):
    return crud.create(db, skill)

@router.get("/", response_model=list[SkillResponse])
def get_all(db: Session = Depends(get_db)):
    return crud.get_all(db)

@router.get("/{skill_id}", response_model=SkillResponse)
def get_by_id(skill_id: int, db: Session = Depends(get_db)):
    return crud.get_by_id(db, skill_id)

@router.put("/{skill_id}", response_model=SkillResponse)
def update(skill_id: int, skill: SkillCreate, db: Session = Depends(get_db)):
    return crud.update(db, skill_id, skill)

@router.delete("/{skill_id}", response_model=SkillResponse)
def delete(skill_id: int, db: Session = Depends(get_db)):
    return crud.delete(db, skill_id)
