import csv
import ast

csv_path = r'..\data\coursera-courses.csv'
sql_path = 'insert_courses.sql'

def escape_sql(text):
    if not text:
        return ""
    # Replace single quotes with double single quotes for SQL escaping
    text = text.replace("'", "''")
    # Also handle some edge cases if needed, but '' is standard for SQLAlchemy/MySQL/SQLite
    return text

def parse_skills(skills_str):
    try:
        # Skills are stored as "['Skill 1', 'Skill 2']"
        return ast.literal_eval(skills_str)
    except:
        return []

try:
    all_rows = []
    unique_skills = set()
    
    with open(csv_path, 'r', encoding='utf-8') as f:
        reader = csv.DictReader(f)
        for i, row in enumerate(reader):
            if i >= 10:
                break
            
            # Extract skills for this course
            row_skills = parse_skills(row.get('skills', '[]'))
            row['parsed_skills'] = row_skills
            for skill in row_skills:
                unique_skills.add(skill)
                
            all_rows.append(row)

    with open(sql_path, 'w', encoding='utf-8') as f:
        f.write("-- Clear existing data if needed (Optional)\n")
        f.write("-- SET FOREIGN_KEY_CHECKS = 0;\n")
        f.write("-- TRUNCATE TABLE course_skills;\n")
        f.write("-- TRUNCATE TABLE courses;\n")
        f.write("-- TRUNCATE TABLE skills;\n")
        f.write("-- SET FOREIGN_KEY_CHECKS = 1;\n\n")

        # 1. Insert Unique Skills
        f.write("-- ---------------------------------------------------------\n")
        f.write("-- 1. Insert Skills\n")
        f.write("-- ---------------------------------------------------------\n")
        skill_list = sorted(list(unique_skills))
        if skill_list:
            f.write("INSERT INTO skills (name, description) VALUES\n")
            skill_vals = []
            for s in skill_list:
                skill_vals.append(f"('{escape_sql(s)}', 'Skill related to various courses')")
            f.write(",\n".join(skill_vals) + " ON DUPLICATE KEY UPDATE name=name;\n\n")

        # 2. Insert Courses
        f.write("-- ---------------------------------------------------------\n")
        f.write("-- 2. Insert Courses\n")
        f.write("-- ---------------------------------------------------------\n")
        f.write("INSERT INTO courses (title, description, category, course_url) VALUES\n")
        course_vals = []
        for row in all_rows:
            title = escape_sql(row.get('course_name', 'No Title'))
            desc = escape_sql(row.get('description', 'No Description'))[:400] + "..."
            level = escape_sql(row.get('level', 'Beginner'))
            url = escape_sql(row.get('course_url', ''))
            course_vals.append(f"('{title}', '{escape_sql(desc)}', '{level}', '{url}')")
        f.write(",\n".join(course_vals) + ";\n\n")

        # 3. Insert Course-Skill Mappings
        f.write("-- ---------------------------------------------------------\n")
        f.write("-- 3. Insert Course-Skill Mappings\n")
        f.write("-- ---------------------------------------------------------\n")
        f.write("INSERT INTO course_skills (course_id, skill_id, weight) VALUES\n")
        mapping_vals = []
        for row in all_rows:
            course_title = escape_sql(row.get('course_name', 'No Title'))
            for skill_name in row['parsed_skills']:
                skill_esc = escape_sql(skill_name)
                # Use subqueries to find IDs by name/title
                mapping_vals.append(
                    f"((SELECT id FROM courses WHERE title = '{course_title}' LIMIT 1), "
                    f"(SELECT id FROM skills WHERE name = '{skill_esc}' LIMIT 1), "
                    f"1.0)"
                )
        
        f.write(",\n".join(mapping_vals) + ";\n")
    
    print(f"Successfully generated {sql_path} with {len(all_rows)} courses and {len(unique_skills)} skills.")

except Exception as e:
    print(f"Error: {e}")
