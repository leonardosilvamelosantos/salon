"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { ArrowLeft, User, Scissors } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Link from "next/link"
import { useRouter } from "next/navigation"

export default function LoginPage() {
  const [selectedType, setSelectedType] = useState<"client" | "professional" | null>(null)
  const router = useRouter()

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 p-4">
      <div className="max-w-md mx-auto">
        <div className="flex items-center mb-6">
          <Link href="/">
            <Button variant="ghost" size="icon" className="rounded-full">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <h1 className="text-2xl font-bold ml-2 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
            Entrar
          </h1>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-6"
        >
          <Card className="border-0 shadow-lg">
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Como você quer entrar?</h2>
              
              <div className="grid grid-cols-2 gap-4">
                <Button
                  variant={selectedType === "client" ? "default" : "outline"}
                  className={`h-24 flex flex-col items-center justify-center gap-2 ${
                    selectedType === "client" ? "bg-purple-600 text-white" : "text-gray-800"
                  }`}
                  onClick={() => setSelectedType("client")}
                >
                  <User className="h-6 w-6" />
                  <span>Cliente</span>
                </Button>

                <Button
                  variant={selectedType === "professional" ? "default" : "outline"}
                  className={`h-24 flex flex-col items-center justify-center gap-2 ${
                    selectedType === "professional" ? "bg-purple-600 text-white" : "text-gray-800"
                  }`}
                  onClick={() => setSelectedType("professional")}
                >
                  <Scissors className="h-6 w-6" />
                  <span>Profissional</span>
                </Button>
              </div>
            </CardContent>
          </Card>

          {selectedType === "client" && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <Card className="border-0 shadow-lg">
                <CardContent className="p-6">
                  <h3 className="text-lg font-medium text-gray-800 mb-4">Entrar como Cliente</h3>
                  <div className="space-y-4">
                    <Button
                      className="w-full bg-purple-600 text-white hover:bg-purple-700"
                      onClick={() => router.push("/login/client")}
                    >
                      Entrar com Email
                    </Button>
                    <Button
                      variant="outline"
                      className="w-full"
                      onClick={() => router.push("/register/client")}
                    >
                      Criar Conta
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {selectedType === "professional" && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <Card className="border-0 shadow-lg">
                <CardContent className="p-6">
                  <h3 className="text-lg font-medium text-gray-800 mb-4">Entrar como Profissional</h3>
                  <div className="space-y-4">
                    <Button
                      className="w-full bg-purple-600 text-white hover:bg-purple-700"
                      onClick={() => router.push("/login/professional")}
                    >
                      Entrar com Email
                    </Button>
                    <Button
                      variant="outline"
                      className="w-full"
                      onClick={() => router.push("/register-business")}
                    >
                      Cadastrar Estabelecimento
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </motion.div>
      </div>
    </main>
  )
} 