"use client"

import { useState, useEffect } from "react"
import { CalendarIcon, Clock, Users, Settings, LogOut, ChevronLeft, ChevronRight, LayoutDashboard } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import BusinessCalendar from "@/components/business-calendar"
import ServiceManager from "@/components/service-manager"
import ClientsManager from "@/components/clients-manager"
import SettingsManager from "@/components/settings-manager"
import { getBusinessForOwner } from "@/lib/data"
import { useAuth } from "@/lib/auth"
import { useRouter } from "next/navigation"

export default function DashboardPage() {
  const [businessType, setBusinessType] = useState<"barbershop" | "salon">("barbershop")
  const [activeTab, setActiveTab] = useState("calendar")
  const business = getBusinessForOwner()
  const { isAuthenticated, isAdmin, logout } = useAuth()
  const router = useRouter()
  const isDark = businessType === "barbershop" // Define isDark based on businessType

  useEffect(() => {
    // Redirect if not authenticated or not admin
    if (!isAuthenticated || !isAdmin) {
      router.push("/")
    }
  }, [isAuthenticated, isAdmin, router])

  // If not authenticated, show nothing while redirecting
  if (!isAuthenticated || !isAdmin) {
    return null
  }

  return (
    <div
      className={`min-h-screen ${
        businessType === "barbershop" ? "bg-gray-900 text-white" : "bg-purple-50 text-gray-800"
      } transition-colors duration-500 ease-in-out`}
    >
      <div className="flex">
        {/* Sidebar */}
        <div
          className={`w-64 h-screen fixed left-0 top-0 p-4 ${
            businessType === "barbershop" ? "bg-gray-800" : "bg-white"
          } hidden md:block`}
        >
          <div className="mb-8">
            <h1
              className={`text-xl font-bold ${
                businessType === "barbershop"
                  ? "bg-gradient-to-r from-gray-100 to-gray-300 bg-clip-text text-transparent"
                  : "bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent"
              }`}
            >
              SmartSalão Pro
            </h1>
            <p className={businessType === "barbershop" ? "text-gray-400" : "text-gray-500"}>Painel de Controle</p>
          </div>

          <nav className="space-y-1">
            <Button
              variant="ghost"
              className={`w-full justify-start ${
                activeTab === "calendar"
                  ? businessType === "barbershop"
                    ? "bg-gray-700 text-white hover:bg-gray-600"
                    : "bg-gray-100 text-gray-800"
                  : businessType === "barbershop"
                    ? "text-white hover:bg-gray-700 hover:text-white"
                    : "text-gray-600 hover:bg-gray-100 hover:text-gray-800"
              }`}
              onClick={() => setActiveTab("calendar")}
              type="button"
            >
              <CalendarIcon className="h-5 w-5 mr-3" />
              Agenda
            </Button>
            <Button
              variant="ghost"
              className={`w-full justify-start ${
                activeTab === "clients"
                  ? businessType === "barbershop"
                    ? "bg-gray-700 text-white hover:bg-gray-600"
                    : "bg-gray-100 text-gray-800"
                  : businessType === "barbershop"
                    ? "text-white hover:bg-gray-700 hover:text-white"
                    : "text-gray-600 hover:bg-gray-100 hover:text-gray-800"
              }`}
              onClick={() => setActiveTab("clients")}
              type="button"
            >
              <Users className="h-5 w-5 mr-3" />
              Clientes
            </Button>
            <Button
              variant="ghost"
              className={`w-full justify-start ${
                activeTab === "settings"
                  ? businessType === "barbershop"
                    ? "bg-gray-700 text-white hover:bg-gray-600"
                    : "bg-gray-100 text-gray-800"
                  : businessType === "barbershop"
                    ? "text-white hover:bg-gray-700 hover:text-white"
                    : "text-gray-600 hover:bg-gray-100 hover:text-gray-800"
              }`}
              onClick={() => setActiveTab("settings")}
              type="button"
            >
              <Settings className="h-5 w-5 mr-3" />
              Configurações
            </Button>
          </nav>

          <div className="absolute bottom-4 left-4 right-4">
            <Button
              variant="ghost"
              className={`w-full justify-start ${
                businessType === "barbershop"
                  ? "text-gray-600 hover:bg-gray-700 hover:text-gray-800"
                  : "text-gray-600 hover:bg-gray-100 hover:text-gray-800"
              }`}
              onClick={logout}
              type="button"
            >
              <LogOut className="h-5 w-5 mr-3" />
              Sair
            </Button>
          </div>
        </div>

        {/* Mobile bottom navigation */}
        <div
          className={`fixed bottom-0 left-0 right-0 z-10 ${
            businessType === "barbershop" ? "bg-gray-800" : "bg-white"
          } border-t ${businessType === "barbershop" ? "border-gray-700" : "border-gray-200"} md:hidden`}
        >
          <div className="flex justify-around">
            <Button
              variant="ghost"
              className={`flex-1 flex flex-col items-center py-3 rounded-none ${
                activeTab === "calendar" ? (isDark ? "bg-gray-700" : "bg-gray-100") : ""
              }`}
              onClick={() => setActiveTab("calendar")}
              type="button"
            >
              <CalendarIcon className="h-5 w-5" />
              <span className="text-xs mt-1">Agenda</span>
            </Button>
            <Button
              variant="ghost"
              className={`flex-1 flex flex-col items-center py-3 rounded-none ${
                activeTab === "clients" ? (isDark ? "bg-gray-700" : "bg-gray-100") : ""
              }`}
              onClick={() => setActiveTab("clients")}
              type="button"
            >
              <Users className="h-5 w-5" />
              <span className="text-xs mt-1">Clientes</span>
            </Button>
            <Button
              variant="ghost"
              className={`flex-1 flex flex-col items-center py-3 rounded-none ${
                activeTab === "settings" ? (isDark ? "bg-gray-700" : "bg-gray-100") : ""
              }`}
              onClick={() => setActiveTab("settings")}
              type="button"
            >
              <Settings className="h-5 w-5" />
              <span className="text-xs mt-1">Config</span>
            </Button>
          </div>
        </div>

        {/* Main content */}
        <div className="w-full md:ml-64 p-4 pb-20 md:pb-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h1 className={`text-2xl font-bold ${businessType === "barbershop" ? "text-white" : "text-gray-800"}`}>
                  {activeTab === "calendar" && "Agenda"}
                  {activeTab === "clients" && "Clientes"}
                  {activeTab === "settings" && "Configurações"}
                  {activeTab === "services" && "Serviços"}
                </h1>
                <p className={businessType === "barbershop" ? "text-gray-400" : "text-gray-500"}>
                  Bem-vindo de volta, {business?.ownerName || "Usuário"}
                </p>
              </div>

              <div className="flex space-x-2">
                <Button
                  variant="outline"
                  className={`${
                    businessType === "barbershop"
                      ? "bg-blue-900 text-white hover:bg-blue-800"
                      : "border-gray-200 text-gray-800 hover:bg-gray-100"
                  }`}
                  onClick={() => setBusinessType("barbershop")}
                  type="button"
                >
                  Barbearia
                </Button>
                <Button
                  variant="outline"
                  className={`${
                    businessType === "salon"
                      ? "bg-purple-50 text-gray-800 hover:bg-purple-100"
                      : "border-gray-200 text-gray-800 hover:bg-gray-100"
                  }`}
                  onClick={() => setBusinessType("salon")}
                  type="button"
                >
                  Salão
                </Button>
              </div>
            </div>

            {activeTab === "calendar" && (
              <>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  <Card className={businessType === "barbershop" ? "bg-gray-800 border-gray-700" : "border-gray-200"}>
                    <CardHeader className="pb-2">
                      <CardTitle
                        className={`text-lg ${businessType === "barbershop" ? "text-white" : "text-gray-800"}`}
                      >
                        Agendamentos Hoje
                      </CardTitle>
                      <CardDescription className={businessType === "barbershop" ? "text-gray-300" : "text-gray-600"}>
                        Total de clientes para hoje
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center">
                        <Users
                          className={`h-8 w-8 mr-3 ${businessType === "barbershop" ? "text-gray-300" : "text-gray-500"}`}
                        />
                        <span
                          className={`text-3xl font-bold ${businessType === "barbershop" ? "text-white" : "text-gray-800"}`}
                        >
                          12
                        </span>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className={businessType === "barbershop" ? "bg-gray-800 border-gray-700" : "border-gray-200"}>
                    <CardHeader className="pb-2">
                      <CardTitle
                        className={`text-lg ${businessType === "barbershop" ? "text-white" : "text-gray-800"}`}
                      >
                        Próximo Cliente
                      </CardTitle>
                      <CardDescription className={businessType === "barbershop" ? "text-gray-300" : "text-gray-600"}>
                        Em 15 minutos
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div
                        className={`flex items-center ${businessType === "barbershop" ? "text-white" : "text-gray-800"}`}
                      >
                        <Clock
                          className={`h-5 w-5 mr-2 ${businessType === "barbershop" ? "text-gray-300" : "text-gray-500"}`}
                        />
                        <span>Carlos Silva - Corte Degradê</span>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className={businessType === "barbershop" ? "bg-gray-800 border-gray-700" : "border-gray-200"}>
                    <CardHeader className="pb-2">
                      <CardTitle
                        className={`text-lg ${businessType === "barbershop" ? "text-white" : "text-gray-800"}`}
                      >
                        Faturamento Hoje
                      </CardTitle>
                      <CardDescription className={businessType === "barbershop" ? "text-gray-300" : "text-gray-600"}>
                        Total estimado
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div
                        className={`text-3xl font-bold ${businessType === "barbershop" ? "text-white" : "text-gray-800"}`}
                      >
                        R$ 450,00
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <Card className={businessType === "barbershop" ? "bg-gray-800 border-gray-700" : ""}>
                  <CardHeader>
                    <CardTitle className={businessType === "barbershop" ? "text-white" : ""}>Agenda</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <BusinessCalendar businessType={businessType} />
                  </CardContent>
                </Card>
              </>
            )}

            {activeTab === "clients" && (
              <Card className={businessType === "barbershop" ? "bg-gray-800 border-gray-700" : ""}>
                <CardHeader>
                  <CardTitle className={businessType === "barbershop" ? "text-white" : ""}>
                    Gerenciar Clientes
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ClientsManager businessType={businessType} />
                </CardContent>
              </Card>
            )}

            {activeTab === "settings" && (
              <Card className={businessType === "barbershop" ? "bg-gray-800 border-gray-700" : ""}>
                <CardHeader>
                  <CardTitle className={businessType === "barbershop" ? "text-white" : ""}>Configurações</CardTitle>
                </CardHeader>
                <CardContent>
                  <SettingsManager businessType={businessType} />
                </CardContent>
              </Card>
            )}

            {activeTab === "services" && (
              <Card className={businessType === "barbershop" ? "bg-gray-800 border-gray-700" : ""}>
                <CardHeader>
                  <CardTitle className={businessType === "barbershop" ? "text-white" : ""}>
                    Gerenciar Serviços
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ServiceManager services={business?.services || []} businessType={businessType} />
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
