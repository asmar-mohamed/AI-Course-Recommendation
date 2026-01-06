import axios from '@/api/axios'
import type { Recommendation } from '@/types/types'

export async function fetchRecommendations() {
  const { data } = await axios.get<Recommendation[]>('/recommendations/')
  return data
}
