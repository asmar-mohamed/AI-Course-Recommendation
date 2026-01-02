from database import SessionLocal
import models

def check_db():
    db = SessionLocal()
    try:
        tests = db.query(models.Test).all()
        print(f"Total tests in DB: {len(tests)}")
        for t in tests:
            print(f"ID: {t.id}, Skill ID: {t.skill_id}, Title: {t.title}")
            
        skills = db.query(models.Skill).all()
        print(f"Total skills in DB: {len(skills)}")
        for s in skills:
            print(f"ID: {s.id}, Name: {s.name}")
            
    finally:
        db.close()

if __name__ == "__main__":
    check_db()
