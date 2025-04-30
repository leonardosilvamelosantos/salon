"use client"

import { motion } from "framer-motion"
import { Scissors, ScissorsIcon as Cut } from "lucide-react"

interface BusinessTypeSelectorProps {
  selectedType: "barbershop" | "salon" | null
  onSelect: (type: "barbershop" | "salon") => void
}

export default function BusinessTypeSelector({ selectedType, onSelect }: BusinessTypeSelectorProps) {
  return (
    <div className="mb-8">
      <h2 className={`text-lg font-medium mb-4 ${selectedType === "barbershop" ? "text-white" : "text-gray-800"}`}>
        O que você está procurando?
      </h2>

      <div className="grid grid-cols-2 gap-4">
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={() => onSelect("barbershop")}
          className={`flex flex-col items-center justify-center p-6 rounded-2xl shadow-md transition-all duration-300 relative z-10 ${
            selectedType === "barbershop"
              ? "bg-gradient-to-br from-gray-800 to-gray-700 border-2 border-white text-white"
              : "bg-white text-gray-800 hover:shadow-lg"
          }`}
          type="button"
        >
          <Scissors className={`h-8 w-8 mb-2 ${selectedType === "barbershop" ? "text-white" : "text-gray-700"}`} />
          <span className="font-medium">Barbearia</span>
        </motion.button>

        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={() => onSelect("salon")}
          className={`flex flex-col items-center justify-center p-6 rounded-2xl shadow-md transition-all duration-300 relative z-10 ${
            selectedType === "salon"
              ? "bg-gradient-to-br from-purple-500 to-purple-400 text-white border-2 border-purple-200"
              : "bg-white text-gray-800 hover:shadow-lg"
          }`}
          type="button"
        >
          <Cut className={`h-8 w-8 mb-2 ${selectedType === "salon" ? "text-white" : "text-gray-700"}`} />
          <span className="font-medium">Cabeleireira</span>
        </motion.button>
      </div>
    </div>
  )
}
