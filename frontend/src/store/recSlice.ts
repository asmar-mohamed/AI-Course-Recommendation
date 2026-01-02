import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import * as recService from '@/services/recommendationService'
import type { Recommendation } from '@/types'

interface RecState {
  items: Recommendation[]
  loading: boolean
  error: string | null
}

const initialState: RecState = {
  items: [],
  loading: false,
  error: null,
}

export const fetchRecs = createAsyncThunk('rec/fetch', async (_, thunkAPI) => {
  try {
    const data = await recService.fetchRecommendations()
    return data
  } catch (error: any) {
    const message =
      (error.response &&
        error.response.data &&
        (typeof error.response.data.detail === 'string'
          ? error.response.data.detail
          : JSON.stringify(error.response.data.detail))) ||
      error.message ||
      error.toString();
    return thunkAPI.rejectWithValue(message);
  }
})

const slice = createSlice({
  name: 'rec',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchRecs.pending, (state) => {
      state.loading = true
      state.error = null
    })
    builder.addCase(fetchRecs.fulfilled, (state, action) => {
      state.loading = false
      state.items = action.payload
    })
    builder.addCase(fetchRecs.rejected, (state, action) => {
      state.loading = false
      state.error = (action.payload as string) || action.error.message || 'Failed to fetch recommendations'
    })
  },
})

export default slice.reducer
