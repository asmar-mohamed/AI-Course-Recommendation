from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from database import get_db
import crud.course_skill as crud
from schemas import CourseSkillCreate, CourseSkillResponse

router = APIRouter(tags=["Course Skills"])

@router.post("/", response_model=CourseSkillResponse)
def create(data: CourseSkillCreate, db: Session = Depends(get_db)):
    return crud.create(db, data.course_id, data.skill_id, data.weight)

@router.get("/", response_model=list[CourseSkillResponse])
def get_all(db: Session = Depends(get_db)):
    return crud.get_all(db)

@router.get("/{cs_id}", response_model=CourseSkillResponse)
def get_by_id(cs_id: int, db: Session = Depends(get_db)):
    return crud.get_by_id(db, cs_id)

@router.put("/{cs_id}", response_model=CourseSkillResponse)
def update(cs_id: int, data: CourseSkillCreate, db: Session = Depends(get_db)):
    return crud.update(db, cs_id, data.course_id, data.skill_id, data.weight)

@router.delete("/{cs_id}", response_model=CourseSkillResponse)
def delete(cs_id: int, db: Session = Depends(get_db)):
    return crud.delete(db, cs_id)
