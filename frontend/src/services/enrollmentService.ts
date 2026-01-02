import axios from '@/api/axios'
import type { Enrollment } from '@/types'

export async function getUserEnrollments(userId: number) {
  const { data } = await axios.get<Enrollment[]>(`/enrollments/user/${userId}`)
  return data
}

export async function enroll(userId: number, course_id: number) {
  const { data } = await axios.post<Enrollment>('/enrollments/', { user_id: userId, course_id })
  return data
}

export async function deleteEnrollment(enrollmentId: number) {
  const { data } = await axios.delete<Enrollment>(`/enrollments/${enrollmentId}`)
  return data
}
