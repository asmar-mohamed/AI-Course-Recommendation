from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from database import get_db
import crud.user_skill as crud
from schemas import UserSkillCreate, UserSkillResponse

router = APIRouter()

@router.post("/", response_model=UserSkillResponse)
def create(data: UserSkillCreate, db: Session = Depends(get_db)):
    return crud.create(db, data)

@router.get("/", response_model=list[UserSkillResponse])
def get_all(db: Session = Depends(get_db)):
    return crud.get_all(db)

@router.get("/{us_id}", response_model=UserSkillResponse)
def get_by_id(us_id: int, db: Session = Depends(get_db)):
    return crud.get_by_id(db, us_id)

@router.get("/user/{user_id}", response_model=list[UserSkillResponse])
def get_by_user(user_id: int, db: Session = Depends(get_db)):
    return crud.get_by_user(db, user_id)

@router.put("/{us_id}", response_model=UserSkillResponse)
def update(us_id: int, data: UserSkillCreate, db: Session = Depends(get_db)):
    return crud.update(db, us_id, data.score, data.level)

@router.delete("/{us_id}", response_model=UserSkillResponse)
def delete(us_id: int, db: Session = Depends(get_db)):
    return crud.delete(db, us_id)
