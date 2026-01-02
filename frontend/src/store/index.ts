import { configureStore } from '@reduxjs/toolkit'
import { combineReducers } from 'redux'
import authReducer from './authSlice'
import recReducer from './recSlice'
import courseReducer from './courseSlice'

const rootReducer = combineReducers({
  auth: authReducer,
  rec: recReducer,
  courses: courseReducer,
})

export const store = configureStore({
  reducer: rootReducer,
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
