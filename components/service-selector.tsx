"use client"

import { motion } from "framer-motion"
import { Clock } from "lucide-react"
import type { Service } from "@/lib/types"

interface ServiceSelectorProps {
  services: Service[]
  selectedService: string | null
  onSelect: (serviceId: string) => void
  businessType: "barbershop" | "salon"
}

export default function ServiceSelector({ services, selectedService, onSelect, businessType }: ServiceSelectorProps) {
  const isBarberShop = businessType === "barbershop"

  return (
    <div className="space-y-3">
      <h2 className={`font-medium ${isBarberShop ? "text-white" : "text-gray-800"}`}>Escolha um serviço</h2>

      {services.map((service) => (
        <motion.button
          key={service.id}
          whileTap={{ scale: 0.98 }}
          onClick={() => onSelect(service.id)}
          className={`w-full text-left p-4 rounded-xl transition-all duration-200 relative z-10 ${
            selectedService === service.id
              ? isBarberShop
                ? "bg-gray-700 border border-white"
                : "bg-purple-100 border border-purple-300"
              : isBarberShop
                ? "bg-gray-800 hover:bg-gray-700"
                : "bg-white hover:bg-gray-50 border border-gray-200"
          }`}
          type="button"
        >
          <div className="flex justify-between items-start">
            <div>
              <h3 className={`font-medium ${isBarberShop ? "text-white" : "text-gray-800"}`}>{service.name}</h3>
              <div className={`flex items-center mt-1 text-sm ${isBarberShop ? "text-gray-400" : "text-gray-500"}`}>
                <Clock className="h-3 w-3 mr-1" />
                <span>{service.duration}</span>
              </div>
            </div>
            <div className={`font-medium ${isBarberShop ? "text-white" : "text-gray-800"}`}>
              R$ {service.price.toFixed(2)}
            </div>
          </div>
        </motion.button>
      ))}
    </div>
  )
}
