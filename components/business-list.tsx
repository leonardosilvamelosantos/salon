"use client"

import { motion } from "framer-motion"
import { Star, Clock, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"
import type { Business } from "@/lib/types"
import Link from "next/link"

interface BusinessListProps {
  businesses: Business[]
  businessType: "barbershop" | "salon"
}

export default function BusinessList({ businesses, businessType }: BusinessListProps) {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  }

  return (
    <motion.div variants={container} initial="hidden" animate="show" className="space-y-4">
      <h2 className={`text-lg font-medium mb-4 ${businessType === "barbershop" ? "text-white" : "text-gray-800"}`}>
        {businesses.length} {businessType === "barbershop" ? "barbearias" : "salões"} encontrados
      </h2>

      {businesses.map((business) => (
        <motion.div
          key={business.id}
          variants={item}
          className={`rounded-2xl shadow-md overflow-hidden ${
            businessType === "barbershop" ? "bg-gray-800" : "bg-white"
          }`}
        >
          <div className="relative h-48">
            <img
              src={business.imageUrl}
              alt={business.name}
              className="w-full h-full object-cover rounded-t-2xl"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
              <div className="flex items-center">
                <div className="bg-yellow-500 text-white rounded-lg px-2 py-1 text-xs font-medium flex items-center">
                  <Star className="h-3 w-3 mr-1" />
                  {business.rating}
                </div>
                <div className="ml-2 text-white text-xs">({business.reviewCount} avaliações)</div>
              </div>
            </div>
          </div>

          <div className="p-4">
            <h3 className={`font-semibold text-lg ${businessType === "barbershop" ? "text-white" : "text-gray-800"}`}>
              {business.name}
            </h3>

            <div
              className={`flex items-center mt-2 ${businessType === "barbershop" ? "text-gray-300" : "text-gray-600"}`}
            >
              <MapPin className="h-4 w-4 mr-1" />
              <span className="text-sm">{business.address}</span>
            </div>

            <div
              className={`flex items-center mt-1 ${businessType === "barbershop" ? "text-gray-300" : "text-gray-600"}`}
            >
              <Clock className="h-4 w-4 mr-1" />
              <span className="text-sm">
                {business.openNow ? "Aberto agora" : "Fechado"}
                {business.openHours && ` · ${business.openHours}`}
              </span>
            </div>

            <div className="mt-4 flex justify-between items-center">
              <div className={`text-sm font-medium ${businessType === "barbershop" ? "text-white" : "text-gray-800"}`}>
                A partir de R$ {business.minPrice.toFixed(2)}
              </div>

              <Link href={`/${business.city}/${business.id}`} className="relative z-10">
                <Button
                  className={`rounded-xl shadow-sm transition-all duration-300 relative z-10 ${
                    businessType === "barbershop"
                      ? "bg-white text-gray-900 hover:bg-gray-100"
                      : "bg-gradient-to-r from-purple-600 to-purple-500 text-white hover:from-purple-700 hover:to-purple-600"
                  }`}
                  type="button"
                >
                  Agendar
                </Button>
              </Link>
            </div>
          </div>
        </motion.div>
      ))}
    </motion.div>
  )
}
