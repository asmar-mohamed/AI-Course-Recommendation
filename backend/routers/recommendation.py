from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from database import get_db
import crud.recommendation as crud
import services.recommendation_service as rec_service
from schemas import RecommendationResponse

router = APIRouter(tags=["Recommendations"])

@router.post("/{user_id}")
def generate(user_id: int, db: Session = Depends(get_db)):
    return rec_service.generate_for_user(db, user_id)

from .auth import get_current_user
import models

@router.get("/", response_model=list[RecommendationResponse])
def get_all(db: Session = Depends(get_db), current_user: models.User = Depends(get_current_user)):
    return rec_service.get_for_user(db, current_user.id)

@router.get("/{user_id}", response_model=list[RecommendationResponse])
def get_by_user(user_id: int, db: Session = Depends(get_db)):
    return rec_service.get_for_user(db, user_id)

@router.get("/id/{rec_id}", response_model=RecommendationResponse)
def get_by_id(rec_id: int, db: Session = Depends(get_db)):
    return crud.get_by_id(db, rec_id)

@router.put("/id/{rec_id}", response_model=RecommendationResponse)
def update(rec_id: int, db: Session = Depends(get_db), score: float = None):
    return crud.update(db, rec_id, score)

@router.delete("/id/{rec_id}", response_model=RecommendationResponse)
def delete(rec_id: int, db: Session = Depends(get_db)):
    return crud.delete(db, rec_id)
