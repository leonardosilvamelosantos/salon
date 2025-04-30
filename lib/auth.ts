"use client"

import { create } from "zustand"
import { persist } from "zustand/middleware"
import { authenticateUser } from "./data"

interface AuthState {
  isAuthenticated: boolean
  isAdmin: boolean
  user: {
    email: string
  } | null
  login: (email: string, password: string) => Promise<boolean>
  logout: () => void
}

export const useAuth = create<AuthState>()(
  persist(
    (set) => ({
      isAuthenticated: false,
      isAdmin: false,
      user: null,
      login: async (email: string, password: string) => {
        try {
          const result = await authenticateUser(email, password)

          if (result.success) {
            set({
              isAuthenticated: true,
              isAdmin: result.isAdmin,
              user: { email },
            })
            return true
          }

          return false
        } catch (error) {
          console.error("Erro ao fazer login:", error)
          return false
        }
      },
      logout: () => {
        set({
          isAuthenticated: false,
          isAdmin: false,
          user: null,
        })
      },
    }),
    {
      name: "auth-storage",
    },
  ),
)
