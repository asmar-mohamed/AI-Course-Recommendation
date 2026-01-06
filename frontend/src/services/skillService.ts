import axios from '@/api/axios'
import type { Skill } from '@/types/types'

export async function getAll() {
  const { data } = await axios.get<Skill[]>('/skills/')
  return data
}

export async function create(skill: Partial<Skill>) {
  const { data } = await axios.post<Skill>('/skills/', skill)
  return data
}

export async function update(id: number, skill: Partial<Skill>) {
  const { data } = await axios.put<Skill>(`/skills/${id}`, skill)
  return data
}

export async function remove(id: number) {
  const { data } = await axios.delete<Skill>(`/skills/${id}`)
  return data
}
