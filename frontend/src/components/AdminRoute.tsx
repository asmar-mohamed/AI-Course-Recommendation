import { Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import type { RootState } from '@/store'
import React from 'react'

export default function AdminRoute({ children }: { children: React.ReactNode }) {
    const { user, token } = useSelector((state: RootState) => state.auth)

    if (!token) {
        return <Navigate to="/login" replace />
    }

    if (user && user.role !== 'admin') {
        return <Navigate to="/dashboard" replace />
    }

    return children
}
