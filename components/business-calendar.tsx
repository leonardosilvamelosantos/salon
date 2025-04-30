"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, AlertCircle, Plus, ChevronDown, Pencil, X } from "lucide-react"
import {
  format,
  addMonths,
  subMonths,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  isSameMonth,
  isSameDay,
  addDays,
  isWeekend,
} from "date-fns"
import { ptBR } from "date-fns/locale"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface BusinessCalendarProps {
  businessType: "barbershop" | "salon"
}

interface NewAppointment {
  time: Date
  customerName: string
  phone?: string
  service?: string
}

export default function BusinessCalendar({ businessType }: BusinessCalendarProps) {
  const [currentMonth, setCurrentMonth] = useState(new Date())
  const [selectedDate, setSelectedDate] = useState<Date>(new Date())
  const [isNewAppointmentModalOpen, setIsNewAppointmentModalOpen] = useState(false)
  const [newAppointment, setNewAppointment] = useState<NewAppointment>({
    time: new Date(),
    customerName: "",
    phone: "",
    service: "",
  })
  const [appointments, setAppointments] = useState([
    {
      id: "1",
      title: "Carlos Silva - Corte Degradê",
      start: new Date(new Date().setHours(10, 0, 0)),
      end: new Date(new Date().setHours(10, 30, 0)),
      extendedProps: {
        customer: "Carlos Silva",
        service: "Corte Degradê",
        phone: "(11) 98765-4321",
      },
    },
    {
      id: "2",
      title: "Marcos Oliveira - Barba",
      start: new Date(new Date().setHours(11, 0, 0)),
      end: new Date(new Date().setHours(11, 30, 0)),
      extendedProps: {
        customer: "Marcos Oliveira",
        service: "Barba",
        phone: "(11) 91234-5678",
      },
    },
    {
      id: "3",
      title: "João Paulo - Corte + Barba",
      start: new Date(new Date().setHours(14, 0, 0)),
      end: new Date(new Date().setHours(15, 0, 0)),
      extendedProps: {
        customer: "João Paulo",
        service: "Corte + Barba",
        phone: "(11) 99876-5432",
      },
    },
    // Add more appointments for different days
    {
      id: "4",
      title: "Ana Beatriz - Coloração",
      start: addDays(new Date(), 2),
      end: addDays(new Date(), 2),
      extendedProps: {
        customer: "Ana Beatriz",
        service: "Coloração",
        phone: "(11) 91234-5678",
      },
    },
    {
      id: "5",
      title: "Mariana Silva - Corte Feminino",
      start: addDays(new Date(), 3),
      end: addDays(new Date(), 3),
      extendedProps: {
        customer: "Mariana Silva",
        service: "Corte Feminino",
        phone: "(11) 92345-6789",
      },
    },
    {
      id: "6",
      title: "Pedro Santos - Degradê",
      start: addDays(new Date(), 5),
      end: addDays(new Date(), 5),
      extendedProps: {
        customer: "Pedro Santos",
        service: "Degradê",
        phone: "(11) 93456-7890",
      },
    },
  ])

  const [editingAppointment, setEditingAppointment] = useState<{
    id: string
    customerName: string
    phone: string
    service: string
  } | null>(null)

  const isDark = businessType === "barbershop"

  const nextMonth = () => setCurrentMonth(addMonths(currentMonth, 1))
  const prevMonth = () => setCurrentMonth(subMonths(currentMonth, 1))

  // Get all days in the current month
  const monthStart = startOfMonth(currentMonth)
  const monthEnd = endOfMonth(currentMonth)
  
  // Get the first day of the week (Monday = 1)
  const firstDayOfWeek = 1
  const startDay = new Date(monthStart)
  startDay.setDate(1 - (startDay.getDay() || 7) + firstDayOfWeek)
  
  const endDay = new Date(monthEnd)
  endDay.setDate(endDay.getDate() + (7 - (endDay.getDay() || 7) + firstDayOfWeek - 1))
  
  const monthDays = eachDayOfInterval({ start: startDay, end: endDay })

  // Get appointments for the selected date
  const getAppointmentsForDate = (date: Date) => {
    return appointments.filter((appointment) => isSameDay(appointment.start, date))
  }

  const selectedDateAppointments = getAppointmentsForDate(selectedDate)

  // Check if a date has appointments
  const hasAppointments = (date: Date) => {
    return getAppointmentsForDate(date).length > 0
  }

  // Get appointment count for a date
  const getAppointmentCount = (date: Date) => {
    return getAppointmentsForDate(date).length
  }

  // Generate time slots for the selected date
  const generateTimeSlots = () => {
    const slots = []
    for (let hour = 8; hour < 20; hour++) {
      for (const minute of [0, 30]) {
        const time = new Date(selectedDate)
        time.setHours(hour, minute, 0)

        const appointment = appointments.find(
          (a) => a.start.getHours() === hour && a.start.getMinutes() === minute && isSameDay(a.start, selectedDate),
        )

        slots.push({
          time,
          appointment,
        })
      }
    }
    return slots
  }

  const timeSlots = generateTimeSlots()

  const handleCreateAppointment = () => {
    if (!newAppointment.customerName) return

    const newAppointmentData = {
      id: Date.now().toString(),
      title: `${newAppointment.customerName}${newAppointment.service ? ` - ${newAppointment.service}` : ""}`,
      start: newAppointment.time,
      end: new Date(newAppointment.time.getTime() + 30 * 60000), // 30 minutos
      extendedProps: {
        customer: newAppointment.customerName,
        service: newAppointment.service || "Serviço não especificado",
        phone: newAppointment.phone || "Não informado",
      },
    }

    setAppointments([...appointments, newAppointmentData])
    setIsNewAppointmentModalOpen(false)
    setNewAppointment({
      time: new Date(),
      customerName: "",
      phone: "",
      service: "",
    })
  }

  const handleOpenNewAppointmentModal = (time: Date) => {
    setNewAppointment({
      ...newAppointment,
      time,
    })
    setIsNewAppointmentModalOpen(true)
  }

  const handleEditAppointment = (appointment: any) => {
    setEditingAppointment({
      id: appointment.id,
      customerName: appointment.extendedProps.customer,
      phone: appointment.extendedProps.phone,
      service: appointment.extendedProps.service,
    })
    setIsNewAppointmentModalOpen(true)
  }

  const handleCancelAppointment = (appointmentId: string) => {
    setAppointments(appointments.filter((a) => a.id !== appointmentId))
  }

  const handleUpdateAppointment = () => {
    if (!editingAppointment?.customerName) return

    setAppointments(
      appointments.map((appointment) => {
        if (appointment.id === editingAppointment.id) {
          return {
            ...appointment,
            title: `${editingAppointment.customerName}${
              editingAppointment.service ? ` - ${editingAppointment.service}` : ""
            }`,
            extendedProps: {
              customer: editingAppointment.customerName,
              service: editingAppointment.service || "Serviço não especificado",
              phone: editingAppointment.phone || "Não informado",
            },
          }
        }
        return appointment
      })
    )

    setEditingAppointment(null)
    setIsNewAppointmentModalOpen(false)
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h3 className={`text-lg font-medium ${isDark ? "text-white" : ""}`}>Agenda</h3>
        <div className="flex space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={prevMonth}
            className={isDark ? "text-gray-900 border-gray-700 hover:bg-gray-800" : ""}
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
            className={isDark ? "text-gray-900 border-gray-700 hover:bg-gray-800" : ""}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <Card className={`p-4 ${isDark ? "bg-gray-800 border-gray-700" : "bg-white"}`}>
        <div className="grid grid-cols-7 gap-1 mb-2">
          {["Seg", "Ter", "Qua", "Qui", "Sex", "Sáb", "Dom"].map((day) => (
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
            const isSelected = isSameDay(day, selectedDate)
            const appointmentCount = getAppointmentCount(day)
            const hasEvents = appointmentCount > 0
            const isWeekendDay = isWeekend(day)
            const isCurrentMonth = isSameMonth(day, currentMonth)

            return (
              <Button
                key={i}
                variant="ghost"
                className={`
                  h-12 p-0 relative
                  ${!isCurrentMonth ? "opacity-40" : ""}
                  ${isSelected ? (isDark ? "bg-gray-700" : "bg-purple-100") : ""}
                  ${isToday && !isSelected ? (isDark ? "border-2 border-white" : "border-2 border-purple-500") : ""}
                  ${isDark ? "text-white hover:bg-gray-700" : "hover:bg-purple-50"}
                  ${isWeekendDay && !isSelected ? (isDark ? "bg-gray-900/50" : "bg-gray-50") : ""}
                  transition-colors duration-200
                `}
                onClick={() => setSelectedDate(day)}
              >
                <div className="flex flex-col items-center w-full">
                  <span className={`text-sm ${isToday ? "font-bold" : ""}`}>{format(day, "d")}</span>
                  {hasEvents && (
                    <div
                      className={`mt-1 text-xs font-medium px-1.5 py-0.5 rounded-full ${
                        isDark ? "bg-purple-700 text-white" : "bg-purple-100 text-purple-800"
                      }`}
                    >
                      {appointmentCount}
                    </div>
                  )}
                </div>
              </Button>
            )
          })}
        </div>
      </Card>

      <div className="mt-4">
        <h4 className={`text-md font-medium mb-2 ${isDark ? "text-white" : ""}`}>
          {format(selectedDate, "dd 'de' MMMM", { locale: ptBR })}
        </h4>

        <Card className={`p-4 ${isDark ? "bg-gray-800 border-gray-700" : "bg-white"}`}>
          <div className="grid grid-cols-2 gap-2">
            {timeSlots.map((slot, index) => (
              <div
                key={index}
                className={`
                  p-3 rounded-md border transition-all duration-200
                  ${slot.appointment ? "cursor-pointer hover:shadow-md" : "opacity-70"}
                  ${
                    isDark
                      ? `border-gray-700 ${slot.appointment ? "bg-gray-700 hover:bg-gray-600" : "bg-gray-800/50"}`
                      : `border-gray-200 ${slot.appointment ? "bg-purple-50 hover:bg-purple-100" : "bg-gray-50"}`
                  }
                `}
                onClick={() => {
                  if (!slot.appointment) {
                    handleOpenNewAppointmentModal(slot.time)
                  }
                }}
              >
                <div className="flex justify-between items-center">
                  <span className={`text-sm font-medium ${isDark ? "text-gray-300" : "text-gray-700"}`}>
                    {format(slot.time, "HH:mm")}
                  </span>
                  {slot.appointment ? (
                    <div className="flex items-center gap-2">
                      <span className={`text-sm font-medium ${isDark ? "text-white" : "text-purple-700"}`}>
                        {slot.appointment.extendedProps.customer}
                      </span>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant="ghost"
                            size="sm"
                            className={`p-0 h-6 w-6 ${isDark ? "text-gray-400 hover:text-white" : "text-gray-500 hover:text-gray-700"}`}
                          >
                            <ChevronDown className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className={isDark ? "bg-gray-800 border-gray-700" : ""} align="end">
                          <DropdownMenuItem
                            className={isDark ? "text-gray-300 hover:bg-gray-700" : ""}
                            onClick={(e) => {
                              e.stopPropagation()
                              handleEditAppointment(slot.appointment)
                            }}
                          >
                            <Pencil className="mr-2 h-4 w-4" />
                            Editar
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            className={isDark ? "text-red-400 hover:bg-gray-700" : "text-red-600"}
                            onClick={(e) => {
                              e.stopPropagation()
                              if (slot.appointment) {
                                handleCancelAppointment(slot.appointment.id)
                              }
                            }}
                          >
                            <X className="mr-2 h-4 w-4" />
                            Desmarcar
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      <span className={`text-xs ${isDark ? "text-gray-400" : "text-gray-500"}`}>Disponível</span>
                      <Button
                        variant="ghost"
                        size="sm"
                        className={`p-0 h-6 w-6 ${isDark ? "text-gray-400 hover:text-white" : "text-gray-500 hover:text-gray-700"}`}
                        onClick={(e) => {
                          e.stopPropagation()
                          handleOpenNewAppointmentModal(slot.time)
                        }}
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {selectedDateAppointments.length > 0 && (
        <div className="mt-4">
          <h4 className={`text-md font-medium mb-2 ${isDark ? "text-white" : ""}`}>Agendamentos do dia</h4>

          <div className="space-y-3">
            {selectedDateAppointments.map((appointment) => (
              <div key={appointment.id} className={`p-3 rounded-lg ${isDark ? "bg-gray-700" : "bg-purple-50"}`}>
                <div className="flex justify-between">
                  <div>
                    <p className={`font-medium ${isDark ? "text-white" : ""}`}>{appointment.title}</p>
                    <p className={`text-sm ${isDark ? "text-gray-300" : "text-gray-600"}`}>
                      {format(appointment.start, "HH:mm")} - {format(appointment.end, "HH:mm")}
                    </p>
                  </div>
                  <button
                    className={`text-sm px-3 py-1 rounded-md ${
                      isDark ? "bg-gray-600 hover:bg-gray-500" : "bg-purple-100 hover:bg-purple-200"
                    }`}
                    onClick={() => {
                      alert(`
                        Cliente: ${appointment.extendedProps.customer}
                        Serviço: ${appointment.title.split(" - ")[1]}
                        Telefone: ${appointment.extendedProps.phone}
                        Horário: ${format(appointment.start, "HH:mm")} - ${format(appointment.end, "HH:mm")}
                      `)
                    }}
                  >
                    Detalhes
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {selectedDateAppointments.length === 0 && (
        <div className={`mt-4 p-4 rounded-lg border ${isDark ? "border-gray-700" : "border-gray-200"}`}>
          <div className="flex items-center">
            <AlertCircle className={`h-5 w-5 mr-2 ${isDark ? "text-gray-400" : "text-gray-500"}`} />
            <p className={isDark ? "text-gray-300" : "text-gray-600"}>
              Nenhum agendamento para {format(selectedDate, "dd/MM/yyyy")}
            </p>
          </div>
        </div>
      )}

      <Dialog open={isNewAppointmentModalOpen} onOpenChange={setIsNewAppointmentModalOpen}>
        <DialogContent className={isDark ? "bg-gray-800 border-gray-700" : ""}>
          <DialogHeader>
            <DialogTitle className={isDark ? "text-white" : ""}>
              Novo Agendamento - {format(newAppointment.time, "HH:mm")}
            </DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="customerName" className={isDark ? "text-gray-300" : ""}>
                Nome do Cliente *
              </Label>
              <Input
                id="customerName"
                value={newAppointment.customerName}
                onChange={(e) => setNewAppointment({ ...newAppointment, customerName: e.target.value })}
                className={isDark ? "bg-gray-700 border-gray-600 text-white" : ""}
                placeholder="Nome do cliente"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="phone" className={isDark ? "text-gray-300" : ""}>
                Telefone (opcional)
              </Label>
              <Input
                id="phone"
                value={newAppointment.phone}
                onChange={(e) => setNewAppointment({ ...newAppointment, phone: e.target.value })}
                className={isDark ? "bg-gray-700 border-gray-600 text-white" : ""}
                placeholder="(00) 00000-0000"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="service" className={isDark ? "text-gray-300" : ""}>
                Serviço (opcional)
              </Label>
              <Input
                id="service"
                value={newAppointment.service}
                onChange={(e) => setNewAppointment({ ...newAppointment, service: e.target.value })}
                className={isDark ? "bg-gray-700 border-gray-600 text-white" : ""}
                placeholder="Tipo de serviço"
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsNewAppointmentModalOpen(false)}
              className={isDark ? "text-white border-gray-700 hover:bg-gray-700" : ""}
            >
              Cancelar
            </Button>
            <Button
              onClick={handleCreateAppointment}
              className={isDark ? "bg-purple-600 hover:bg-purple-700" : "bg-purple-600 hover:bg-purple-700"}
            >
              Confirmar Agendamento
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
