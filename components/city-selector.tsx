"use client"

import { motion } from "framer-motion"
import { MapPin } from "lucide-react"

interface CitySelectorProps {
  cities: string[]
  selectedCity: string | null
  onSelect: (city: string) => void
}

export default function CitySelector({ cities, selectedCity, onSelect }: CitySelectorProps) {
  return (
    <div className="grid grid-cols-2 gap-3">
      {cities.map((city) => (
        <motion.button
          key={city}
          whileTap={{ scale: 0.95 }}
          onClick={() => onSelect(city)}
          className={`flex items-center p-3 rounded-xl border transition-all duration-200 relative z-10 ${
            selectedCity === city
              ? "border-purple-500 bg-purple-50 text-purple-700 font-medium"
              : "border-gray-200 hover:border-gray-300 text-gray-700"
          }`}
          type="button"
        >
          <MapPin className="h-4 w-4 mr-2" />
          <span className="text-sm font-medium">{city}</span>
        </motion.button>
      ))}
    </div>
  )
}
