from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from database import get_db
import crud.enrollment as crud
from schemas import EnrollmentCreate, EnrollmentResponse

router = APIRouter()

@router.post("/", response_model=EnrollmentResponse)
def enroll(data: EnrollmentCreate, db: Session = Depends(get_db)):
    return crud.enroll(db, data.user_id, data.course_id)

@router.get("/", response_model=list[EnrollmentResponse])
def get_all(db: Session = Depends(get_db)):
    return crud.get_all(db)

@router.get("/user/{user_id}", response_model=list[EnrollmentResponse])
def get_by_user(user_id: int, db: Session = Depends(get_db)):
    return crud.get_by_user(db, user_id)

@router.get("/{enrollment_id}", response_model=EnrollmentResponse)
def get_by_id(enrollment_id: int, db: Session = Depends(get_db)):
    return crud.get_by_id(db, enrollment_id)

@router.put("/{enrollment_id}", response_model=EnrollmentResponse)
def update(enrollment_id: int, status: str, db: Session = Depends(get_db)):
    return crud.update(db, enrollment_id, status)

@router.delete("/{enrollment_id}", response_model=EnrollmentResponse)
def delete(enrollment_id: int, db: Session = Depends(get_db)):
    return crud.delete(db, enrollment_id)
