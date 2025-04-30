"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import BusinessTypeSelector from "@/components/business-type-selector"
import BusinessList from "@/components/business-list"
import LoginButton from "@/components/login-button"
import { getBusinessesByCity } from "@/lib/data"
import Link from "next/link"

export default function CityPage({ params }: { params: { city: string } }) {
  const [businessType, setBusinessType] = useState<"barbershop" | "salon" | null>(null)
  const [decodedCity, setDecodedCity] = useState<string>("")

  useEffect(() => {
    // Decode the city name from the URL
    setDecodedCity(decodeURIComponent(params.city))
  }, [params.city])

  const businesses = getBusinessesByCity(decodedCity, businessType)

  return (
    <main
      className={`min-h-screen ${
        businessType === "barbershop"
          ? "bg-gray-900 text-white"
          : businessType === "salon"
            ? "bg-purple-50 text-gray-800"
            : "bg-gradient-to-b from-gray-50 to-gray-100"
      } transition-colors duration-500 ease-in-out p-4`}
    >
      <div className="max-w-md mx-auto">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            <Link href="/">
              <Button
                variant="ghost"
                size="icon"
                className={`rounded-full relative z-10 ${
                  businessType === "barbershop" ? "text-white hover:bg-gray-800" : "text-gray-800 hover:bg-gray-200"
                }`}
                type="button"
              >
                <ArrowLeft className="h-5 w-5" />
              </Button>
            </Link>
            <h1 className={`text-xl font-semibold ml-2 ${
              businessType === "barbershop" ? "text-white" : "text-gray-800"
            }`}>{decodedCity}</h1>
          </div>

          <div className="relative z-10">
            <LoginButton businessType={businessType} />
          </div>
        </div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <BusinessTypeSelector selectedType={businessType} onSelect={setBusinessType} />

          {businessType && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
              <BusinessList businesses={businesses} businessType={businessType} />
            </motion.div>
          )}
        </motion.div>
      </div>
    </main>
  )
}
