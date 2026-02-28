"use client"

import { useState, useEffect } from "react"
import { useRouter, usePathname } from "next/navigation"

interface AdminUser {
  id: string
  email: string
  name: string
  role: string
}

interface AdminSession {
  isAuthenticated: boolean
  user: AdminUser
  expiresAt: number
}

export function useAdminAuth() {
  const router = useRouter()
  const pathname = usePathname()
  const [isLoading, setIsLoading] = useState(true)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [user, setUser] = useState<AdminUser | null>(null)

  useEffect(() => {
    checkAuth()
  }, [pathname])

  const checkAuth = () => {
    try {
      const stored = localStorage.getItem("adminAuth")
      
      if (!stored) {
        handleUnauthenticated()
        return
      }

      const session: AdminSession = JSON.parse(stored)
      
      // Check if session is expired
      if (Date.now() > session.expiresAt) {
        localStorage.removeItem("adminAuth")
        handleUnauthenticated()
        return
      }

      // Valid session
      setIsAuthenticated(true)
      setUser(session.user)
      setIsLoading(false)
    } catch {
      handleUnauthenticated()
    }
  }

  const handleUnauthenticated = () => {
    setIsAuthenticated(false)
    setUser(null)
    setIsLoading(false)
    
    // Only redirect if not already on login page
    if (pathname !== "/admin/login") {
      router.push("/admin/login")
    }
  }

  const logout = () => {
    localStorage.removeItem("adminAuth")
    setIsAuthenticated(false)
    setUser(null)
    router.push("/admin/login")
  }

  const refreshSession = () => {
    const stored = localStorage.getItem("adminAuth")
    if (stored) {
      const session: AdminSession = JSON.parse(stored)
      session.expiresAt = Date.now() + 24 * 60 * 60 * 1000 // Extend by 24 hours
      localStorage.setItem("adminAuth", JSON.stringify(session))
    }
  }

  return {
    isLoading,
    isAuthenticated,
    user,
    logout,
    refreshSession,
    checkAuth,
  }
}
