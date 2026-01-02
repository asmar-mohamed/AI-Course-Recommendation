import  { useEffect, useState } from 'react'
import { API_BASE } from '@/api/axios'

export default function ApiStatus() {
  const [online, setOnline] = useState<boolean | null>(null)
  const [message, setMessage] = useState<string | null>(null)

  useEffect(() => {
    let mounted = true

    // initial lightweight health check
    const check = async () => {
      try {
        const controller = new AbortController()
        const timeout = setTimeout(() => controller.abort(), 3000)
        const res = await fetch(API_BASE + '/', { signal: controller.signal })
        clearTimeout(timeout)
        if (!mounted) return
        if (res.ok) {
          setOnline(true)
          setMessage(null)
        } else {
          setOnline(false)
          setMessage(`Status ${res.status}`)
        }
      } catch (err: any) {
        if (!mounted) return
        setOnline(false)
        setMessage(err?.message || 'Network error')
      }
    }

    check()

    const handler = (e: any) => {
      if (typeof e?.detail?.online === 'boolean') {
        setOnline(e.detail.online)
        setMessage(e.detail.message || null)
      }
    }
    window.addEventListener('api-status', handler)
    return () => {
      mounted = false
      window.removeEventListener('api-status', handler)
    }
  }, [])

  if (online === null) return null
  if (online) return null

  return (
    <div className="bg-yellow-50 border-l-4 border-yellow-400 text-yellow-700 p-3 rounded mb-4">
      <strong>API unreachable</strong>
      <div className="text-sm">{message || 'Unable to reach the backend API. Ensure the backend is running at the URL set in your .env (VITE_API_BASE_URL).'}</div>
    </div>
  )
}
