import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import * as authService from '@/services/authService'
import type { User } from '@/types'

interface AuthState {
  user: User | null
  token: string | null
  loading: boolean
  error: string | null
}

const initialState: AuthState = {
  user: typeof window !== 'undefined' && localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')!) : null,
  token: typeof window !== 'undefined' ? localStorage.getItem('token') : null,
  loading: false,
  error: null,
}

export const login = createAsyncThunk('auth/login', async (payload: { email: string; password: string }, thunkAPI) => {
  try {
    const data = await authService.login(payload)
    return data
  } catch (err: any) {
    return thunkAPI.rejectWithValue(err.response?.data?.detail || err.message)
  }
})

export const register = createAsyncThunk('auth/register', async (payload: any, thunkAPI) => {
  try {
    const data = await authService.register(payload)
    return data
  } catch (err: any) {
    return thunkAPI.rejectWithValue(err.response?.data?.detail || err.message)
  }
})

export const authMe = createAsyncThunk('auth/me', async (_, thunkAPI) => {
  try {
    const data = await authService.me()
    return data
  } catch (err: any) {
    return thunkAPI.rejectWithValue(err.response?.data?.detail || err.message)
  }
})

const slice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout(state) {
      state.user = null
      state.token = null
      localStorage.removeItem('token')
      localStorage.removeItem('user')
    },
  },
  extraReducers(builder) {
    builder.addCase(login.pending, (state) => {
      state.loading = true
      state.error = null
    })
    builder.addCase(login.fulfilled, (state, action: any) => {
      state.loading = false
      state.token = action.payload.access_token
      state.user = action.payload.user
      try {
        localStorage.setItem('token', action.payload.access_token)
        localStorage.setItem('user', JSON.stringify(action.payload.user))
      } catch (e) {
        // ignore
      }
    })
    builder.addCase(register.pending, (state) => {
      state.loading = true
      state.error = null
    })
    builder.addCase(register.fulfilled, (state, action: any) => {
      state.loading = false
      // registration returns token by default in backend; optionally auto-login
      state.token = action.payload.access_token
      state.user = action.payload.user
      try {
        if (action.payload.access_token) {
          localStorage.setItem('token', action.payload.access_token)
          localStorage.setItem('user', JSON.stringify(action.payload.user))
        }
      } catch (e) {}
    })
    builder.addCase(register.rejected, (state, action: any) => {
      state.loading = false
      state.error = action.payload || action.error?.message || 'Registration failed'
    })
    builder.addCase(login.rejected, (state, action: any) => {
      state.loading = false
      state.error = action.payload || action.error?.message || 'Login failed'
    })

    builder.addCase(authMe.fulfilled, (state, action: any) => {
      state.user = action.payload
    })
  },
})

export const { logout } = slice.actions
export default slice.reducer
