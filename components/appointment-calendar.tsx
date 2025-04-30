"use client"
import CalendarView from "@/components/calendar-view"

interface AppointmentCalendarProps {
  theme: "barbershop" | "salon"
  appointments: any[]
}

export default function AppointmentCalendar({ theme, appointments }: AppointmentCalendarProps) {
  return (
    <div>
      <CalendarView theme={theme} appointments={appointments} />
    </div>
  )
}
