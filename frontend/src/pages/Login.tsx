import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { login } from '@/store/authSlice'
import type { RootState } from '@/store'
import ErrorMessage from '@/components/ErrorMessage'
import { Icon } from '@iconify/react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

export default function Login() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const auth = useSelector((s: RootState) => s.auth)

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const result = await dispatch(login({ email, password }) as any)
      if (result && result.payload && result.payload.access_token) {
        navigate('/recommendations')
      }
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-background">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-12">
          <img 
            src="/reco.png" 
            alt="RECO Logo" 
            className="h-16 mx-auto mb-8"
          />
          <h1 className="text-3xl font-bold text-dark dark:text-white mb-2">Welcome Back</h1>
          <p className="text-slate-600 dark:text-slate-300">Sign in to your account</p>
        </div>

        {/* Login Card */}
        <div className="bg-white dark:bg-slate-900 rounded-lg p-8 shadow-md border border-border">
          <ErrorMessage message={auth.error} />

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email Field */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-dark dark:text-white">Email Address</label>
              <Input
                type="email"
                className="w-full rounded-lg border-border bg-background dark:bg-slate-800 h-12"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-dark dark:text-white">Password</label>
              <Input
                type="password"
                className="w-full rounded-lg border-border bg-background dark:bg-slate-800 h-12"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            {/* Sign In Button */}
            <Button
              disabled={auth.loading}
              type="submit"
              className="w-full rounded-lg h-12 font-semibold mt-8"
            >
              {auth.loading ? (
                <div className="flex items-center gap-2">
                  <Icon icon="line-md:loading-twotone-loop" width={20} />
                  <span>Signing in...</span>
                </div>
              ) : (
                'Sign In'
              )}
            </Button>
          </form>

          {/* Register Link */}
          <div className="mt-8 text-center border-t border-border pt-6">
            <p className="text-sm dark:text-slate-300">
              Don't have an account?{' '}
              <Link to="/register" className="text-primary font-semibold hover:underline">
                Register here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
