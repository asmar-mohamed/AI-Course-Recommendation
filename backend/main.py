from fastapi import FastAPI
from database import engine
import models

models.Base.metadata.create_all(bind=engine)

app = FastAPI(title="AI Course Recommendation System")

@app.get("/")
def root():
    return {"message": "FastAPI + MySQL Project Running Successfully!"}
