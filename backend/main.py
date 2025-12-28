from fastapi import FastAPI
from database import engine
import models

from routers import (
    user,
    skill,
    user_skill,
    recommendation,
    course,
    course_skill,
    choice,
    enrollment,
    question,
    test,
    user_answer
)

models.Base.metadata.create_all(bind=engine)

app = FastAPI(title="AI Course Recommendation System")

app.include_router(user.router, prefix="/users", tags=["Users"])
app.include_router(skill.router, prefix="/skills", tags=["Skills"])
app.include_router(user_skill.router, prefix="/user-skills", tags=["User Skills"])
app.include_router(course.router, prefix="/courses", tags=["Courses"])
app.include_router(course_skill.router, prefix="/course-skills", tags=["Course Skills"])
app.include_router(choice.router, prefix="/choices", tags=["Choices"])
app.include_router(enrollment.router, prefix="/enrollments", tags=["Enrollments"])
app.include_router(question.router, prefix="/questions", tags=["Questions"])
app.include_router(test.router, prefix="/tests", tags=["Tests"])
app.include_router(user_answer.router, prefix="/user-answers", tags=["User Answers"])
app.include_router(recommendation.router, prefix="/recommendations", tags=["Recommendations"])

@app.get("/")
def root():
    return {"status": "API is running 🚀"}
