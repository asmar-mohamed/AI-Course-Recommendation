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
    <div className="min-h-[80vh] flex items-center justify-center p-4">
      <div className="w-full max-w-[440px]">
        <div className="bg-white dark:bg-slate-900 rounded-[3rem] p-8 md:p-12 shadow-2xl border border-slate-100 dark:border-slate-800 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-3xl -mr-16 -mt-16"></div>

          <div className="relative space-y-8">
            <div className="text-center">
              <div className="w-20 h-20 bg-lightprimary rounded-[1rem] flex items-center justify-center text-primary mx-auto mb-6 shadow-inner">
                <Icon icon="solar:lock-password-bold-duotone" width={48} />
              </div>
              <h1 className="text-4xl font-black tracking-tight mb-2">Welcome <span className="text-primary">Back</span></h1>
              <p className="text-slate-400 font-bold text-sm uppercase tracking-widest leading-relaxed">Enter your credentials to access your dashboard</p>
            </div>

            <ErrorMessage message={auth.error} />

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-1">Email Address</label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-primary transition-colors">
                    <Icon icon="solar:letter-bold-duotone" width={20} />
                  </div>
                  <Input
                    className="pl-12 rounded-2xl border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50 h-14 font-bold focus:ring-primary/20"
                    placeholder="name@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-1">Secure Password</label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-primary transition-colors">
                    <Icon icon="solar:key-minimalistic-bold-duotone" width={20} />
                  </div>
                  <Input
                    type="password"
                    className="pl-12 rounded-2xl border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50 h-14 font-bold focus:ring-primary/20"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              </div>

              <Button
                disabled={auth.loading}
                type="submit"
                className="w-full rounded-2xl h-14 font-black text-lg shadow-xl shadow-primary/30 transition-all hover:translate-y-[-2px] active:translate-y-[0px]"
              >
                {auth.loading ? (
                  <div className="flex items-center gap-2">
                    <Icon icon="line-md:loading-twotone-loop" width={24} />
                    <span>Signing in...</span>
                  </div>
                ) : (
                  <>
                    Sign In
                    <Icon icon="solar:arrow-right-linear" className="ml-2" strokeWidth={2.5} />
                  </>
                )}
              </Button>
            </form>

            <div className="pt-8 border-t border-slate-100 dark:border-slate-800 text-center">
              <p className="text-slate-500 font-medium">
                Don't have an account?{' '}
                <Link to="/register" className="text-primary font-black hover:underline underline-offset-4">
                  Register now
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
