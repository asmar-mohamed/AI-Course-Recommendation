import axios from '@/api/axios'

export interface LoginPayload {
  email: string
  password: string
}

export interface RegisterPayload {
  name: string
  email: string
  password: string
}

export async function login(payload: LoginPayload) {
  const { data } = await axios.post('/auth/login', payload)
  return data
}

export async function register(payload: RegisterPayload) {
  const { data } = await axios.post('/auth/register', payload)
  return data
}

export async function me() {
  const { data } = await axios.get('/auth/me')
  return data
}
