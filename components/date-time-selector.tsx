"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { format, addDays } from "date-fns"
import { ptBR } from "date-fns/locale"
import { Calendar } from "lucide-react"
import { getAvailableTimeSlots } from "@/lib/data"

interface DateTimeSelectorProps {
  businessId: string
  serviceId: string
  selectedDateTime: string | null
  onSelect: (dateTime: string) => void
  businessType: "barbershop" | "salon"
}

export default function DateTimeSelector({
  businessId,
  serviceId,
  selectedDateTime,
  onSelect,
  businessType,
}: DateTimeSelectorProps) {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date())
  const isBarberShop = businessType === "barbershop"

  // Generate next 7 days
  const nextDays = Array.from({ length: 7 }, (_, i) => addDays(new Date(), i))

  // Get available time slots for the selected date
  const timeSlots = getAvailableTimeSlots(businessId, serviceId, selectedDate)

  return (
    <div>
      <h2 className={`font-medium mb-3 ${isBarberShop ? "text-white" : "text-gray-800"}`}>Escolha uma data</h2>

      <div className="flex space-x-2 overflow-x-auto pb-2 mb-4">
        {nextDays.map((date, index) => {
          const isSelected = selectedDate.getDate() === date.getDate() && selectedDate.getMonth() === date.getMonth()

          return (
            <motion.button
              key={index}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelectedDate(date)}
              className={`flex flex-col items-center p-3 rounded-xl min-w-[70px] transition-all duration-200 relative z-10 ${
                isSelected
                  ? isBarberShop
                    ? "bg-white text-gray-900"
                    : "bg-purple-600 text-white"
                  : isBarberShop
                    ? "bg-gray-800 hover:bg-gray-700"
                    : "bg-white hover:bg-purple-50 border border-gray-200"
              }`}
              type="button"
            >
              <span
                className={`text-xs font-medium ${isSelected ? "" : isBarberShop ? "text-gray-400" : "text-gray-500"}`}
              >
                {format(date, "EEE", { locale: ptBR })}
              </span>
              <span className="text-lg font-semibold mt-1">{format(date, "dd")}</span>
              <span className={`text-xs ${isSelected ? "" : isBarberShop ? "text-gray-400" : "text-gray-500"}`}>
                {format(date, "MMM", { locale: ptBR })}
              </span>
            </motion.button>
          )
        })}
      </div>

      <h2 className={`font-medium mb-3 ${isBarberShop ? "text-white" : "text-gray-800"}`}>Horários disponíveis</h2>

      <div className="grid grid-cols-3 gap-2">
        {timeSlots.length > 0 ? (
          timeSlots.map((slot, index) => {
            const isSelected = selectedDateTime === `${format(selectedDate, "yyyy-MM-dd")}T${slot}`

            return (
              <motion.button
                key={index}
                whileTap={{ scale: 0.95 }}
                onClick={() => onSelect(`${format(selectedDate, "yyyy-MM-dd")}T${slot}`)}
                className={`py-3 rounded-xl transition-all duration-200 relative z-10 ${
                  isSelected
                    ? isBarberShop
                      ? "bg-white text-gray-900"
                      : "bg-purple-600 text-white"
                    : isBarberShop
                      ? "bg-gray-800 hover:bg-gray-700 text-white"
                      : "bg-white hover:bg-purple-50 border border-gray-200"
                }`}
                type="button"
              >
                {slot}
              </motion.button>
            )
          })
        ) : (
          <div className={`col-span-3 text-center py-8 ${isBarberShop ? "text-gray-400" : "text-gray-500"}`}>
            <Calendar className="h-10 w-10 mx-auto mb-2 opacity-50" />
            <p>Nenhum horário disponível nesta data.</p>
            <p className="text-sm mt-1">Por favor, selecione outra data.</p>
          </div>
        )}
      </div>
    </div>
  )
}
