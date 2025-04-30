"use client"

import type React from "react"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { User, X, LayoutDashboard } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useAuth } from "@/lib/auth"
import { useRouter } from "next/navigation"

interface LoginButtonProps {
  businessType?: "barbershop" | "salon" | null
}

export default function LoginButton({ businessType = null }: LoginButtonProps) {
  const [showModal, setShowModal] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const { isAuthenticated, isAdmin, user, login, logout } = useAuth()
  const router = useRouter()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setIsLoading(true)

    try {
      const success = await login(email, password)

      if (success) {
        setShowModal(false)
        if (isAdmin) {
          router.push("/dashboard")
        }
      } else {
        setError("Credenciais inválidas. Tente novamente.")
      }
    } catch (err) {
      setError("Ocorreu um erro ao fazer login. Tente novamente.")
    } finally {
      setIsLoading(false)
    }
  }

  const handleLogout = () => {
    logout()
    // If on dashboard, redirect to home
    if (window.location.pathname.includes("/dashboard")) {
      router.push("/")
    }
  }

  const goToDashboard = () => {
    router.push("/dashboard")
  }

  const handleRegisterClick = () => {
    router.push("/register-business")
  }

  return (
    <>
      {isAuthenticated ? (
        <div className="flex items-center gap-2">
          <span className="text-sm hidden md:inline">Olá, {user?.email}</span>
          {isAdmin && (
            <Button
              variant="outline"
              size="sm"
              onClick={goToDashboard}
              className="rounded-full flex items-center gap-1"
            >
              <LayoutDashboard className="h-4 w-4" />
              <span className="hidden md:inline">Dashboard</span>
            </Button>
          )}
          <Button variant="outline" size="sm" onClick={handleLogout} className="rounded-full">
            Sair
          </Button>
        </div>
      ) : (
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            className={`${
              businessType === "barbershop"
                ? "text-white hover:bg-gray-800"
                : "text-gray-800 hover:bg-gray-200"
            }`}
            onClick={() => router.push("/login")}
          >
            Entrar
          </Button>
          <Button
            variant="outline"
            className={`${
              businessType === "barbershop"
                ? "bg-white text-gray-900 hover:bg-gray-100"
                : "bg-gradient-to-r from-purple-600 to-purple-500 text-white hover:from-purple-700 hover:to-purple-600"
            }`}
            onClick={handleRegisterClick}
          >
            Cadastrar Salão
          </Button>
        </div>
      )}

      <AnimatePresence>
        {showModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-2xl p-6 w-full max-w-md relative shadow-xl border border-gray-200"
            >
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-4 top-4 rounded-full"
                onClick={() => setShowModal(false)}
                type="button"
              >
                <X className="h-4 w-4" />
              </Button>

              <div className="text-center mb-6">
                <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                  SmartSalão
                </h2>
                <p className="text-gray-600">Acesse sua conta</p>
              </div>

              <form onSubmit={handleLogin} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-gray-800 font-medium">
                    Email
                  </Label>
                  <Input
                    id="email"
                    type="text"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="seu@email.com"
                    className="bg-gray-50 border-gray-300 text-gray-900 focus:ring-purple-500 focus:border-purple-500"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password" className="text-gray-800 font-medium">
                    Senha
                  </Label>
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="bg-gray-50 border-gray-300 text-gray-900 focus:ring-purple-500 focus:border-purple-500"
                    required
                  />
                </div>

                {error && <div className="text-red-500 text-sm font-medium">{error}</div>}

                <Button
                  type="submit"
                  className="w-full py-6 rounded-xl bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white"
                  disabled={isLoading}
                >
                  {isLoading ? "Entrando..." : "Entrar"}
                </Button>

                <div className="text-center text-sm text-gray-500 mt-4">
                  <p>Para teste, use:</p>
                  <p className="font-medium">Email: admin@teste</p>
                  <p className="font-medium">Senha: teste123</p>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  )
}
