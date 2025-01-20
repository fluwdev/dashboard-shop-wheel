'use client'

import { createContext, useContext, useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useMutation } from '@tanstack/react-query'
import { signIn } from '@/services/auth-services'

export interface AuthProviderProps {
  children: React.ReactNode
}

const AuthContext = createContext<{
  user: any
  isAuthenticated: boolean
  login: (email: string, password: string) => void
  logout: () => void
}>({
  user: null,
  isAuthenticated: false,
  login: async () => {},
  logout: () => {},
})

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<Record<string, string> | null>(null)
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false)
  const router = useRouter()
  const mutation = useMutation({
    mutationFn: signIn,
    mutationKey: ['signIn'],
    onSuccess: (data) => {
      localStorage.setItem('token', data.token)
      localStorage.setItem('user', JSON.stringify(data.user))
      setIsAuthenticated(true)
      setUser(data.user)
      router.push('/')
    },
  })

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      setIsAuthenticated(true)
      const user = localStorage.getItem('user')
      if (user) {
        try {
          setUser(JSON.parse(user))
        } catch (error) {
          console.error('Failed to parse user from localStorage', error)
          localStorage.removeItem('user')
        }
      }
    }
  }, [])

  const login = (email: string, password: string) => {
    console.log({ email, password })
    mutation.mutate({ email, password })
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        login,
        logout: () => {
          localStorage.removeItem('token')
          localStorage.removeItem('user')
          setIsAuthenticated(false)
          setUser(null)
          router.push('/login')
        },
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within a AuthProvider')
  }
  return context
}
