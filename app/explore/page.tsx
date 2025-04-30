"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import CitySelector from "@/components/city-selector"
import LoginButton from "@/components/login-button"
import { cities } from "@/lib/data"
import { useRouter } from "next/navigation"

export default function ExplorePage() {
  const [selectedCity, setSelectedCity] = useState<string | null>(null)
  const router = useRouter()

  const handleContinue = () => {
    if (selectedCity) {
      // Use encodeURIComponent to properly encode the city name for the URL
      const encodedCity = encodeURIComponent(selectedCity)
      router.push(`/${encodedCity}`)
    }
  }

  return (
    <main className="flex min-h-screen flex-col items-center bg-gradient-to-b from-gray-50 to-gray-100 p-4">
      <div className="w-full max-w-md relative">
        <div className="absolute top-0 right-0 z-10">
          <LoginButton />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full pt-12"
        >
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              SmartSalão
            </h1>
            <p className="text-gray-600 mt-2">Agendamento fácil para salões e barbearias</p>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
            <h2 className="text-xl font-semibold mb-4">Onde você está?</h2>
            <div className="space-y-4">
              <div className="relative">
                <Input
                  type="text"
                  placeholder="Buscar cidade..."
                  className="pl-4 pr-10 py-3 rounded-xl border-gray-200 focus:ring-purple-500 focus:border-purple-500"
                />
                <div className="absolute right-3 top-3 text-gray-400">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <circle cx="11" cy="11" r="8" />
                    <path d="m21 21-4.3-4.3" />
                  </svg>
                </div>
              </div>

              <CitySelector cities={cities} onSelect={(city) => setSelectedCity(city)} selectedCity={selectedCity} />
            </div>
          </div>

          <Button
            disabled={!selectedCity}
            className="w-full py-6 rounded-xl bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-medium transition-all duration-300 ease-in-out shadow-md hover:shadow-lg flex items-center justify-center relative z-10"
            onClick={handleContinue}
            type="button"
          >
            <span>Continuar</span>
            <ChevronRight className="ml-2 h-5 w-5" />
          </Button>
        </motion.div>
      </div>
    </main>
  )
}
