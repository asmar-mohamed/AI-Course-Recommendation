import axios from '@/api/axios'
import type { UserSkill } from '@/types'

export async function getUserSkills(userId: number) {
  const { data } = await axios.get<UserSkill[]>(`/user-skills/user/${userId}`)
  return data
}

export async function addUserSkill(payload: Partial<UserSkill>) {
  const { data } = await axios.post<UserSkill>('/user-skills/', payload)
  return data
}

export async function deleteUserSkill(userSkillId: number) {
  const { data } = await axios.delete<UserSkill>(`/user-skills/${userSkillId}`)
  return data
}
