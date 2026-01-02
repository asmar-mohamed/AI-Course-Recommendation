import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '@/store/authSlice'
import type { RootState } from '@/store'

export default function Navbar() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const auth = useSelector((s: RootState) => s.auth)

  const handleLogout = () => {
    dispatch(logout())
    navigate('/login')
  }

  return (
    <div className="bg-white shadow-sm">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="font-bold">AI Course Recommender</Link>
        <div className="flex gap-4 items-center">
          <Link to="/courses" className="text-sm text-slate-600">Courses</Link>
          <Link to="/recommendations" className="text-sm text-slate-600">Recommendations</Link>
          <Link to="/dashboard" className="text-sm text-slate-600">Dashboard</Link>
          {auth.user ? (
            <>
              <div className="text-sm text-slate-700">{auth.user.name ?? auth.user.username}</div>
              <Link to="/profile" className="text-sm text-indigo-600 hover:text-indigo-800">Profile</Link>
              <button onClick={handleLogout} className="px-3 py-1 border rounded">Logout</button>
            </>
          ) : (
            <Link to="/login" className="text-sm text-slate-600">Login</Link>
          )}
        </div>
      </div>
    </div>
  )
}
