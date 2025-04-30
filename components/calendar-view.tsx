"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"
import {
  format,
  addMonths,
  subMonths,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  isSameMonth,
  isSameDay,
  parseISO,
} from "date-fns"
import { ptBR } from "date-fns/locale"

interface Appointment {
  id: string
  title: string
  date: string
  dateISO?: string
  time: string
  timeStart?: string
  timeEnd?: string
  businessName: string
  address: string
  price: number
}

interface CalendarViewProps {
  theme: "barbershop" | "salon"
  appointments: Appointment[]
}

export default function CalendarView({ theme, appointments }: CalendarViewProps) {
  const [currentMonth, setCurrentMonth] = useState(new Date())
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)

  const isDark = theme === "barbershop"

  const nextMonth = () => setCurrentMonth(addMonths(currentMonth, 1))
  const prevMonth = () => setCurrentMonth(subMonths(currentMonth, 1))

  // Get all days in the current month
  const monthStart = startOfMonth(currentMonth)
  const monthEnd = endOfMonth(currentMonth)
  const monthDays = eachDayOfInterval({ start: monthStart, end: monthEnd })

  // Get appointments for the selected date
  const getAppointmentsForDate = (date: Date) => {
    return appointments.filter((appointment) => {
      const appointmentDate = appointment.dateISO
        ? parseISO(appointment.dateISO)
        : parseISO(appointment.date.split("/").reverse().join("-"))
      return isSameDay(appointmentDate, date)
    })
  }

  const selectedDateAppointments = selectedDate ? getAppointmentsForDate(selectedDate) : []

  // Check if a date has appointments
  const hasAppointments = (date: Date) => {
    return getAppointmentsForDate(date).length > 0
  }

  // Generate time slots for the selected date
  const generateTimeSlots = () => {
    const slots = []
    for (let hour = 8; hour < 20; hour++) {
      for (const minute of [0, 30]) {
        const timeString = `${hour.toString().padStart(2, "0")}:${minute.toString().padStart(2, "0")}`
        const appointment = selectedDateAppointments.find((a) =>
          a.timeStart ? a.timeStart.startsWith(timeString) : a.time.startsWith(timeString),
        )

        slots.push({
          time: timeString,
          appointment,
        })
      }
    }
    return slots
  }

  const timeSlots = selectedDate ? generateTimeSlots() : []

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h3 className={`text-lg font-medium ${isDark ? "text-white" : ""}`}>Calendário</h3>
        <div className="flex space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={prevMonth}
            className={isDark ? "text-white border-gray-700 hover:bg-gray-800" : ""}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <div className={`text-sm font-medium py-1 px-2 ${isDark ? "text-white" : ""}`}>
            {format(currentMonth, "MMMM yyyy", { locale: ptBR })}
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={nextMonth}
            className={isDark ? "text-white border-gray-700 hover:bg-gray-800" : ""}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <Card className={`p-4 ${isDark ? "bg-gray-800 border-gray-700" : "bg-white"}`}>
        <div className="grid grid-cols-7 gap-1 mb-2">
          {["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"].map((day) => (
            <div
              key={day}
              className={`text-center text-sm font-medium p-2 ${isDark ? "text-gray-300" : "text-gray-600"}`}
            >
              {day}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-7 gap-1">
          {monthDays.map((day, i) => {
            const isToday = isSameDay(day, new Date())
            const isSelected = selectedDate && isSameDay(day, selectedDate)
            const hasEvents = hasAppointments(day)

            return (
              <Button
                key={i}
                variant="ghost"
                className={`
                  h-10 p-0 relative
                  ${!isSameMonth(day, currentMonth) ? "opacity-30" : ""}
                  ${isSelected ? (isDark ? "bg-gray-700" : "bg-purple-100") : ""}
                  ${isToday && !isSelected ? (isDark ? "border border-white" : "border border-purple-500") : ""}
                  ${isDark ? "text-white hover:bg-gray-700" : "hover:bg-purple-50"}
                `}
                onClick={() => setSelectedDate(day)}
              >
                {format(day, "d")}
                {hasEvents && (
                  <span
                    className={`absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full ${
                      isDark ? "bg-purple-400" : "bg-purple-600"
                    }`}
                  />
                )}
              </Button>
            )
          })}
        </div>
      </Card>

      {selectedDate && (
        <div className="mt-4">
          <h4 className={`text-md font-medium mb-2 ${isDark ? "text-white" : ""}`}>
            {format(selectedDate, "dd 'de' MMMM", { locale: ptBR })}
          </h4>

          <Card className={`p-4 ${isDark ? "bg-gray-800 border-gray-700" : "bg-white"}`}>
            {timeSlots.length > 0 ? (
              <div className="grid grid-cols-2 gap-2">
                {timeSlots.map((slot, index) => (
                  <div
                    key={index}
                    className={`
                      p-2 rounded-md border ${slot.appointment ? "cursor-pointer" : ""}
                      ${
                        isDark
                          ? `border-gray-700 ${slot.appointment ? "bg-gray-700" : ""}`
                          : `border-gray-200 ${slot.appointment ? "bg-purple-50" : ""}`
                      }
                    `}
                    onClick={() => {
                      if (slot.appointment) {
                        // Show appointment details
                        alert(`
                          Serviço: ${slot.appointment.title}
                          Local: ${slot.appointment.businessName}
                          Horário: ${slot.appointment.time}
                          Valor: R$ ${slot.appointment.price.toFixed(2)}
                        `)
                      }
                    }}
                  >
                    <div className="flex justify-between items-center">
                      <span className={isDark ? "text-gray-300" : "text-gray-600"}>{slot.time}</span>
                      {slot.appointment && (
                        <span className={`text-sm font-medium ${isDark ? "text-white" : "text-purple-700"}`}>
                          {slot.appointment.title}
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className={`text-center py-6 ${isDark ? "text-gray-400" : "text-gray-500"}`}>
                Selecione uma data para ver os horários disponíveis
              </div>
            )}
          </Card>
        </div>
      )}
    </div>
  )
}
