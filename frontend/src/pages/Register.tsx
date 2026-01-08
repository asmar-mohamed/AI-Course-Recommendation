import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { register } from '@/store/authSlice'
import type { RootState } from '@/store'
import ErrorMessage from '@/components/ErrorMessage'
import { Icon } from '@iconify/react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

export default function Register() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const auth = useSelector((s: RootState) => s.auth)

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const result = await dispatch(register({ name, email, password }) as any)
      if (result && result.payload) {
        navigate('/login')
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
          <h1 className="text-3xl font-bold text-dark dark:text-white mb-2">Create Account</h1>
          <p className="text-muted">Join our community of lifelong learners</p>
        </div>

        {/* Register Card */}
        <div className="bg-white dark:bg-slate-900 rounded-lg p-8 shadow-md border border-border">
          <ErrorMessage message={auth.error} />

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Full Name Field */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-dark dark:text-white">Full Name</label>
              <Input
                type="text"
                className="w-full rounded-lg border-border bg-background dark:bg-slate-800 h-12"
                placeholder="Enter your full name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

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
                placeholder="Create a password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            {/* Sign Up Button */}
            <Button
              disabled={auth.loading}
              type="submit"
              className="w-full rounded-lg h-12 font-semibold mt-8"
            >
              {auth.loading ? (
                <div className="flex items-center gap-2">
                  <Icon icon="line-md:loading-twotone-loop" width={20} />
                  <span>Creating account...</span>
                </div>
              ) : (
                'Sign Up'
              )}
            </Button>
          </form>

          {/* Login Link */}
          <div className="mt-8 text-center border-t border-border pt-6">
            <p className="text-sm text-muted">
              Already have an account?{' '}
              <Link to="/login" className="text-primary font-semibold hover:underline">
                Sign in here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
