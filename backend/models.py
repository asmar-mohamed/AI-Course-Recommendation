from sqlalchemy import Column, Integer, String, Text, Float, Boolean, DateTime, ForeignKey
from sqlalchemy.orm import relationship
from datetime import datetime
from database import Base

# ---------------- User ----------------
class User(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(255))
    email = Column(String(255), unique=True, index=True)
    password = Column(String(255))
    role = Column(String(50))
    profile_picture = Column(String(500), nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)
    skills = relationship("UserSkill", back_populates="user")
    enrollments = relationship("Enrollment", back_populates="user")
    recommendations = relationship("Recommendation", back_populates="user")
    answers = relationship("UserAnswer", back_populates="user")

# ---------------- Skill ----------------
class Skill(Base):
    __tablename__ = "skills"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(255))
    description = Column(Text)
    courses = relationship("CourseSkill", back_populates="skill")
    users = relationship("UserSkill", back_populates="skill")
    tests = relationship("Test", back_populates="skill")

# ---------------- Course ----------------
class Course(Base):
    __tablename__ = "courses"
    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(255))
    description = Column(Text)
    category = Column(String(255))
    course_url = Column(String(500), nullable=True)
    skills = relationship("CourseSkill", back_populates="course")
    enrollments = relationship("Enrollment", back_populates="course")
    recommendations = relationship("Recommendation", back_populates="course")

# ---------------- CourseSkill ----------------
class CourseSkill(Base):
    __tablename__ = "course_skills"
    id = Column(Integer, primary_key=True, index=True)
    course_id = Column(Integer, ForeignKey("courses.id", ondelete="CASCADE"))
    skill_id = Column(Integer, ForeignKey("skills.id", ondelete="CASCADE"))
    weight = Column(Float)
    course = relationship("Course", back_populates="skills")
    skill = relationship("Skill", back_populates="courses")

# ---------------- UserSkill ----------------
class UserSkill(Base):
    __tablename__ = "user_skills"
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id", ondelete="CASCADE"))
    skill_id = Column(Integer, ForeignKey("skills.id", ondelete="CASCADE"))
    score = Column(Float)
    level = Column(String(100))
    updated_at = Column(DateTime, default=datetime.utcnow)
    user = relationship("User", back_populates="skills")
    skill = relationship("Skill", back_populates="users")
    
    from sqlalchemy import UniqueConstraint
    __table_args__ = (
        UniqueConstraint('user_id', 'skill_id', name='uq_user_skill'),
    )

# ---------------- Enrollment ----------------
class Enrollment(Base):
    __tablename__ = "enrollments"
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id", ondelete="CASCADE"))
    course_id = Column(Integer, ForeignKey("courses.id", ondelete="CASCADE"))
    status = Column(String(50))
    enrolled_at = Column(DateTime, default=datetime.utcnow)
    user = relationship("User", back_populates="enrollments")
    course = relationship("Course", back_populates="enrollments")

# ---------------- Recommendation ----------------
class Recommendation(Base):
    __tablename__ = "recommendations"
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id", ondelete="CASCADE"))
    course_id = Column(Integer, ForeignKey("courses.id", ondelete="CASCADE"))
    score = Column(Float)
    created_at = Column(DateTime, default=datetime.utcnow)
    user = relationship("User", back_populates="recommendations")
    course = relationship("Course", back_populates="recommendations")

# ---------------- Test ----------------
class Test(Base):
    __tablename__ = "tests"
    id = Column(Integer, primary_key=True, index=True)
    skill_id = Column(Integer, ForeignKey("skills.id", ondelete="CASCADE"))
    title = Column(String(255))
    duration = Column(Integer)
    skill = relationship("Skill", back_populates="tests")
    questions = relationship("Question", back_populates="test")

# ---------------- Question ----------------
class Question(Base):
    __tablename__ = "questions"
    id = Column(Integer, primary_key=True, index=True)
    test_id = Column(Integer, ForeignKey("tests.id", ondelete="CASCADE"))
    text = Column(Text)
    points = Column(Integer)
    test = relationship("Test", back_populates="questions")
    choices = relationship("Choice", back_populates="question")
    user_answers = relationship("UserAnswer", back_populates="question")

# ---------------- Choice ----------------
class Choice(Base):
    __tablename__ = "choices"
    id = Column(Integer, primary_key=True, index=True)
    question_id = Column(Integer, ForeignKey("questions.id", ondelete="CASCADE"))
    text = Column(Text)
    is_correct = Column(Boolean)
    question = relationship("Question", back_populates="choices")
    user_answers = relationship("UserAnswer", back_populates="choice")

# ---------------- UserAnswer ----------------
class UserAnswer(Base):
    __tablename__ = "user_answers"
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id", ondelete="CASCADE"))
    question_id = Column(Integer, ForeignKey("questions.id", ondelete="CASCADE"))
    choice_id = Column(Integer, ForeignKey("choices.id", ondelete="CASCADE"))
    score = Column(Float)
    user = relationship("User", back_populates="answers")
    question = relationship("Question", back_populates="user_answers")
    choice = relationship("Choice", back_populates="user_answers")
