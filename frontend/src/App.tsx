import { useEffect } from 'react'
import { Routes, Route, Navigate, Outlet } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { authMe } from '@/store/authSlice'
import Login from './pages/Login'
import Register from './pages/Register'
import Recommendations from './pages/Recommendations'
import Dashboard from './pages/Dashboard'
import CoursesList from './pages/CoursesList'
import CourseDetails from './pages/CourseDetails'
import Profile from './pages/Profile'
import TestPage from './pages/TestPage'
import ProtectedRoute from './components/ProtectedRoute'
import AdminRoute from './components/AdminRoute'
import ApiStatus from './components/ApiStatus'
import FullLayout from './layouts/full/FullLayout'

import AdminDashboard from './pages/AdminDashboard'
import AdminCourses from './pages/AdminCourses'
import AdminSkills from './pages/AdminSkills'
import AdminTests from './pages/AdminTests'

export default function App() {
  const dispatch = useDispatch()

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      dispatch(authMe() as any)
    }
  }, [dispatch])

  return (
    <>
      <div className="fixed top-0 left-0 right-0 z-[9999] pointer-events-none">
        <ApiStatus />
      </div>

      <Routes>
        {/* Auth Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Dashboard Layout Routes */}
        <Route element={<ProtectedRoute><FullLayout><Dashboard /></FullLayout></ProtectedRoute>}>
          <Route path="/dashboard" element={<Dashboard />} />
        </Route>

        <Route path="/recommendations" element={<ProtectedRoute><FullLayout><Recommendations /></FullLayout></ProtectedRoute>} />
        <Route path="/profile" element={<ProtectedRoute><FullLayout><Profile /></FullLayout></ProtectedRoute>} />
        <Route path="/test/:skillId" element={<ProtectedRoute><FullLayout><TestPage /></FullLayout></ProtectedRoute>} />
        <Route path="/courses" element={<ProtectedRoute><FullLayout><CoursesList /></FullLayout></ProtectedRoute>} />
        <Route path="/courses/:id" element={<ProtectedRoute><FullLayout><CourseDetails /></FullLayout></ProtectedRoute>} />

        {/* Admin Routes */}
        <Route path="/admin" element={<AdminRoute><FullLayout><Outlet /></FullLayout></AdminRoute>}>
          <Route index element={<AdminDashboard />} />
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="courses" element={<AdminCourses />} />
          <Route path="skills" element={<AdminSkills />} />
          <Route path="tests" element={<AdminTests />} />
        </Route>

        {/* Default Route */}
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </>
  )
}
