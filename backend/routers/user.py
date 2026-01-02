from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from database import get_db
import crud.user as crud
from schemas import UserCreate, UserUpdate, UserResponse

router = APIRouter()

@router.post("/", response_model=UserResponse)
def create(user: UserCreate, db: Session = Depends(get_db)):
    return crud.create(db, user)

@router.get("/", response_model=list[UserResponse])
def get_all(db: Session = Depends(get_db)):
    return crud.get_all(db)

@router.get("/{user_id}", response_model=UserResponse)
def get_by_id(user_id: int, db: Session = Depends(get_db)):
    return crud.get_by_id(db, user_id)

@router.put("/{user_id}", response_model=UserResponse)
def update(user_id: int, user: UserUpdate, db: Session = Depends(get_db)):
    return crud.update(db, user_id, user)

@router.delete("/{user_id}", response_model=UserResponse)
def delete(user_id: int, db: Session = Depends(get_db)):
    return crud.delete(db, user_id)
