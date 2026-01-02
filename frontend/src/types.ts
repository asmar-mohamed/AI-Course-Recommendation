export interface User {
  id: number
  username: string
  email: string
  name?: string
  role?: string
}

export interface Skill {
  id: number
  name: string
  weight?: number
}

export interface Course {
  id: number
  title: string
  name?: string
  description?: string
  course_url?: string
  skills?: Array<{ skill: Skill; weight: number }>
}

export interface Recommendation {
  course_id: number
  course_name: string
  course_url?: string
  matched_skills: Skill[]
  score: number
}

export interface Enrollment {
  id: number
  user_id: number
  course_id: number
  status: string
  enrolled_at: string
  course?: Course
}

export interface UserSkill {
  id: number
  user_id: number
  skill_id: number
  score: number
  level: string
  skill?: Skill
}

export interface Test {
  id: number
  skill_id: number
  title: string
  duration: number
}
