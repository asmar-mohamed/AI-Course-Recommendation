import axios from '@/api/axios'
import type { User } from '@/types'

export async function fetchUser() {
  const { data } = await axios.get<User>('/auth/me')
  return data
}

export async function updateUser(userId: number, payload: Partial<User>) {
  const { data } = await axios.put<User>(`/users/${userId}`, payload)
  return data
}
