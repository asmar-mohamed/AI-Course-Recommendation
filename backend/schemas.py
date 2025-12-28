from pydantic import BaseModel
from datetime import datetime

# ---------------- USER ----------------
class UserCreate(BaseModel):
    name: str
    email: str
    password: str
    role: str

class UserResponse(UserCreate):
    id: int
    created_at: datetime

    class Config:
        from_attributes = True


# ---------------- SKILL ----------------
class SkillCreate(BaseModel):
    name: str
    description: str

class SkillResponse(SkillCreate):
    id: int

    class Config:
        from_attributes = True


# ---------------- USER SKILL ----------------
class UserSkillCreate(BaseModel):
    user_id: int
    skill_id: int
    score: float
    level: str

class UserSkillResponse(UserSkillCreate):
    id: int

    class Config:
        from_attributes = True


# ---------------- RECOMMENDATION ----------------
class RecommendationResponse(BaseModel):
    id: int
    user_id: int
    course_id: int
    score: float
    created_at: datetime

    class Config:
        from_attributes = True


# ---------------- COURSE ----------------
class CourseCreate(BaseModel):
    title: str
    description: str
    category: str

class CourseResponse(CourseCreate):
    id: int

    class Config:
        from_attributes = True


# ---------------- COURSE SKILL ----------------
class CourseSkillCreate(BaseModel):
    course_id: int
    skill_id: int
    weight: float

class CourseSkillResponse(CourseSkillCreate):
    id: int

    class Config:
        from_attributes = True


# ---------------- CHOICE ----------------
class ChoiceCreate(BaseModel):
    question_id: int
    text: str
    is_correct: bool

class ChoiceResponse(ChoiceCreate):
    id: int

    class Config:
        from_attributes = True


# ---------------- TEST ----------------
class TestCreate(BaseModel):
    skill_id: int
    title: str
    duration: int

class TestResponse(TestCreate):
    id: int

    class Config:
        from_attributes = True


# ---------------- QUESTION ----------------
class QuestionCreate(BaseModel):
    test_id: int
    text: str
    points: int

class QuestionResponse(QuestionCreate):
    id: int

    class Config:
        from_attributes = True


# ---------------- USER ANSWER ----------------
class UserAnswerCreate(BaseModel):
    user_id: int
    question_id: int
    choice_id: int
    score: float

class UserAnswerResponse(UserAnswerCreate):
    id: int

    class Config:
        from_attributes = True


# ---------------- ENROLLMENT ----------------
class EnrollmentCreate(BaseModel):
    user_id: int
    course_id: int

class EnrollmentResponse(EnrollmentCreate):
    id: int
    status: str
    enrolled_at: datetime

    class Config:
        from_attributes = True
