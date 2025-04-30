"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { CalendarIcon, Clock, MapPin, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card } from "@/components/ui/card"
import AppointmentCalendar from "@/components/appointment-calendar"
import LoginButton from "@/components/login-button"
import { getUserAppointments } from "@/lib/data"

export default function AppointmentsPage() {
  const [theme, setTheme] = useState<"barbershop" | "salon">("barbershop")
  const appointments = getUserAppointments()

  return (
    <main
      className={`min-h-screen ${
        theme === "barbershop" ? "bg-gray-900 text-white" : "bg-purple-50 text-gray-800"
      } transition-colors duration-500 ease-in-out p-4`}
    >
      <div className="max-w-md mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Meus Agendamentos</h1>

          <div className="flex items-center space-x-2">
            <LoginButton />

            <div className="hidden sm:flex space-x-2">
              <Button
                variant="outline"
                className={`${
                  theme === "barbershop"
                    ? "border-gray-700 text-white hover:bg-gray-800"
                    : "border-gray-200 text-gray-800 hover:bg-gray-100"
                }`}
                onClick={() => setTheme("barbershop")}
              >
                Barber
              </Button>
              <Button
                variant="outline"
                className={`${
                  theme === "salon"
                    ? "border-purple-300 text-gray-800 hover:bg-purple-100"
                    : "border-gray-200 text-gray-800 hover:bg-gray-100"
                }`}
                onClick={() => setTheme("salon")}
              >
                Salão
              </Button>
            </div>
          </div>
        </div>

        <Tabs defaultValue="upcoming" className="w-full">
          <TabsList className={`grid w-full grid-cols-2 ${theme === "barbershop" ? "bg-gray-800" : "bg-white"}`}>
            <TabsTrigger value="upcoming">Próximos</TabsTrigger>
            <TabsTrigger value="calendar">Calendário</TabsTrigger>
          </TabsList>
          <TabsContent value="upcoming" className="mt-4">
            <div className="space-y-4">
              {appointments.length > 0 ? (
                appointments.map((appointment) => (
                  <motion.div
                    key={appointment.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Card className={`p-4 ${theme === "barbershop" ? "bg-gray-800 border-gray-700" : "bg-white"}`}>
                      <div className="flex justify-between">
                        <div>
                          <h3 className={`font-medium ${theme === "barbershop" ? "text-white" : "text-gray-800"}`}>
                            {appointment.businessName}
                          </h3>
                          <p className={`text-sm ${theme === "barbershop" ? "text-gray-400" : "text-gray-500"}`}>
                            {appointment.serviceName}
                          </p>
                        </div>
                        <div className={`text-right ${theme === "barbershop" ? "text-white" : "text-gray-800"}`}>
                          <p className="font-medium">R$ {appointment.price.toFixed(2)}</p>
                        </div>
                      </div>

                      <div className="mt-3 space-y-2">
                        <div
                          className={`flex items-center text-sm ${
                            theme === "barbershop" ? "text-gray-400" : "text-gray-500"
                          }`}
                        >
                          <CalendarIcon className="h-4 w-4 mr-2" />
                          <span>{appointment.date}</span>
                        </div>

                        <div
                          className={`flex items-center text-sm ${
                            theme === "barbershop" ? "text-gray-400" : "text-gray-500"
                          }`}
                        >
                          <Clock className="h-4 w-4 mr-2" />
                          <span>{appointment.time}</span>
                        </div>

                        <div
                          className={`flex items-center text-sm ${
                            theme === "barbershop" ? "text-gray-400" : "text-gray-500"
                          }`}
                        >
                          <MapPin className="h-4 w-4 mr-2" />
                          <span>{appointment.address}</span>
                        </div>
                      </div>

                      <div className="mt-4 flex justify-between">
                        <Button
                          variant="outline"
                          className={`text-sm ${
                            theme === "barbershop"
                              ? "border-gray-700 text-gray-300 hover:bg-gray-700"
                              : "border-gray-200 text-gray-600 hover:bg-gray-50"
                          }`}
                        >
                          Cancelar
                        </Button>

                        <Button
                          className={`text-sm ${
                            theme === "barbershop"
                              ? "bg-white text-gray-900 hover:bg-gray-100"
                              : "bg-purple-600 text-white hover:bg-purple-700"
                          }`}
                        >
                          <span>Ver detalhes</span>
                          <ChevronRight className="h-4 w-4 ml-1" />
                        </Button>
                      </div>
                    </Card>
                  </motion.div>
                ))
              ) : (
                <div className={`text-center py-12 ${theme === "barbershop" ? "text-gray-400" : "text-gray-500"}`}>
                  <CalendarIcon className="h-12 w-12 mx-auto mb-3 opacity-50" />
                  <h3 className="text-lg font-medium mb-1">Nenhum agendamento</h3>
                  <p className="text-sm">Você não possui agendamentos futuros.</p>
                  <Button
                    className={`mt-4 ${
                      theme === "barbershop"
                        ? "bg-white text-gray-900 hover:bg-gray-100"
                        : "bg-purple-600 text-white hover:bg-purple-700"
                    }`}
                    onClick={() => (window.location.href = "/")}
                  >
                    Agendar agora
                  </Button>
                </div>
              )}
            </div>
          </TabsContent>
          <TabsContent value="calendar" className="mt-4">
            <Card className={theme === "barbershop" ? "bg-gray-800 border-gray-700" : "bg-white"}>
              <div className="p-4">
                <AppointmentCalendar theme={theme} appointments={appointments} />
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </main>
  )
}
