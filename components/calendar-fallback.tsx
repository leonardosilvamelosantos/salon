"use client"

import { Card } from "@/components/ui/card"

interface CalendarFallbackProps {
  businessType?: "barbershop" | "salon"
  theme?: "barbershop" | "salon"
}

export default function CalendarFallback({ businessType, theme }: CalendarFallbackProps) {
  const isDark = businessType === "barbershop" || theme === "barbershop"

  return (
    <Card className={`p-6 ${isDark ? "bg-gray-800 text-white" : "bg-white"}`}>
      <div className="text-center">
        <h3 className="text-lg font-medium mb-2">Agenda</h3>
        <p className={isDark ? "text-gray-300" : "text-gray-600"}>
          Visualize seus agendamentos e horários disponíveis.
        </p>

        <div className="mt-6 grid grid-cols-7 gap-1">
          {/* Calendar header - days of week */}
          {["Seg", "Ter", "Qua", "Qui", "Sex", "Sáb", "Dom"].map((day) => (
            <div key={day} className={`text-sm font-medium p-2 ${isDark ? "text-gray-300" : "text-gray-600"}`}>
              {day}
            </div>
          ))}

          {/* Calendar days - simplified representation */}
          {Array.from({ length: 35 }).map((_, i) => {
            const day = i - 3 // Start with some negative days to simulate previous month
            const isCurrentMonth = day > 0 && day <= 30
            const isToday = day === 15 // Just for demonstration
            const hasEvents = [3, 10, 17, 24].includes(day)

            return (
              <div
                key={i}
                className={`
                  h-10 flex items-center justify-center rounded-md text-sm
                  ${!isCurrentMonth ? "opacity-30" : ""}
                  ${isToday ? (isDark ? "bg-gray-700" : "bg-purple-100") : ""}
                  ${hasEvents ? (isDark ? "font-bold text-purple-300" : "font-bold text-purple-600") : ""}
                `}
              >
                {isCurrentMonth ? day : ""}
                {hasEvents && <span className="w-1 h-1 bg-current rounded-full absolute bottom-1"></span>}
              </div>
            )
          })}
        </div>

        <p className="mt-6 text-sm">Carregando calendário completo...</p>
      </div>
    </Card>
  )
}
