import axios from '@/api/axios'
import type { Skill } from '@/types'

export async function getAllSkills() {
  const { data } = await axios.get<Skill[]>('/skills/')
  return data
}
