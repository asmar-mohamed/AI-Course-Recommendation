import axios from '@/api/axios'
import type { Test } from '@/types'

export interface TestSubmission {
  user_id: number
  answers: Array<{ question_id: number; choice_id: number }>
}

export interface TestResult {
  score: number
  total_points: number
  passed: boolean
  skill_id: number
}

export interface TestWithQuestions extends Test {
  questions: Array<{
    id: number
    text: string
    points: number
    choices: Array<{ id: number; text: string }>
  }>
}

export async function getTestBySkill(skillId: number) {
  const { data } = await axios.get<Test>(`/tests/test-by-skill/${skillId}`)
  return data
}

export async function getTestQuestions(testId: number) {
  const { data } = await axios.get<TestWithQuestions>(`/tests/${testId}/questions`)
  return data
}

export async function submitTest(testId: number, submission: TestSubmission) {
  const { data } = await axios.post<TestResult>(`/tests/${testId}/submit`, submission)
  return data
}
