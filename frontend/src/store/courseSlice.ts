import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { Course } from '../types/types';

interface CourseState {
  list: Course[];
  currentCourse: Course | null;
  loading: boolean;
  error: string | null;
}
import * as courseService from '../services/courseService';

const initialState: CourseState = {
  list: [],
  currentCourse: null,
  loading: false,
  error: null,
};

// Async thunk to fetch all courses
export const fetchCourses = createAsyncThunk(
  'courses/fetchAll',
  async (_, thunkAPI) => {
    try {
      const data = await courseService.getAll();
      return data;
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
  }
);

// Async thunk to fetch course by ID
export const fetchCourseById = createAsyncThunk(
  'courses/fetchById',
  async (id: number, thunkAPI) => {
    try {
      const data = await courseService.getCourseById(id);
      return data;
    } catch (error: any) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.detail) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const courseSlice = createSlice({
  name: 'courses',
  initialState,
  reducers: {
    resetCourseState: (state) => {
      state.loading = false;
      state.error = null;
      state.currentCourse = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCourses.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCourses.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(fetchCourses.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(fetchCourseById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCourseById.fulfilled, (state, action) => {
        state.loading = false;
        state.currentCourse = action.payload;
      })
      .addCase(fetchCourseById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { resetCourseState } = courseSlice.actions;
export default courseSlice.reducer;
