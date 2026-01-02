import axios from '@/api/axios'
import type { Enrollment } from '@/types'

export async function getUserEnrollments(userId: number) {
  const { data } = await axios.get<Enrollment[]>(`/enrollments/user/${userId}`)
  return data
}
