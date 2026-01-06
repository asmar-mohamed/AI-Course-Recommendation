from fastapi import APIRouter, Depends
import models
from routers.auth import get_admin_user
from sqlalchemy.orm import Session
from database import get_db
import crud.course as crud
from schemas import CourseCreate, CourseResponse

router = APIRouter(tags=["Courses"])

@router.post("/", response_model=CourseResponse)
def create(course: CourseCreate, db: Session = Depends(get_db), admin: models.User = Depends(get_admin_user)):
    return crud.create(db, course)

@router.get("/", response_model=list[CourseResponse])
def get_all(db: Session = Depends(get_db)):
    return crud.get_all(db)

@router.get("/{course_id}", response_model=CourseResponse)
def get_by_id(course_id: int, db: Session = Depends(get_db)):
    return crud.get_by_id(db, course_id)

@router.put("/{course_id}", response_model=CourseResponse)
def update(course_id: int, course: CourseCreate, db: Session = Depends(get_db), admin: models.User = Depends(get_admin_user)):
    return crud.update(db, course_id, course)

@router.delete("/{course_id}", response_model=CourseResponse)
def delete(course_id: int, db: Session = Depends(get_db), admin: models.User = Depends(get_admin_user)):
    return crud.delete(db, course_id)
