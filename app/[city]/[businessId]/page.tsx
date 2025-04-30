"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { ArrowLeft, Clock, MapPin, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import ServiceSelector from "@/components/service-selector"
import DateTimeSelector from "@/components/date-time-selector"
import LoginButton from "@/components/login-button"
import { getBusinessById } from "@/lib/data"
import Link from "next/link"

export default function BusinessPage({ params }: { params: { city: string; businessId: string } }) {
  const [business, setBusiness] = useState<any>(null)
  const [selectedService, setSelectedService] = useState<string | null>(null)
  const [selectedDateTime, setSelectedDateTime] = useState<string | null>(null)
  const [step, setStep] = useState(1)
  const [decodedCity, setDecodedCity] = useState<string>("")

  useEffect(() => {
    const businessData = getBusinessById(params.businessId)
    setBusiness(businessData)
    setDecodedCity(decodeURIComponent(params.city))
  }, [params.businessId, params.city])

  if (!business) {
    return <div className="p-4">Carregando...</div>
  }

  const isBarberShop = business.type === "barbershop"
  const bgColor = isBarberShop ? "bg-gray-900 text-white" : "bg-purple-50 text-gray-800"

  return (
    <main className={`min-h-screen ${bgColor} transition-colors duration-500 ease-in-out`}>
      <div className="relative h-56">
        <img
          src={business.imageUrl || `/placeholder.svg?height=224&width=400`}
          alt={business.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-0 left-0 right-0 p-4 flex justify-between z-20">
          <Link href={`/${encodeURIComponent(decodedCity)}`}>
            <Button
              variant="outline"
              size="icon"
              className="rounded-full bg-white/80 backdrop-blur-sm hover:bg-white relative z-10"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>

          <div className="bg-white/80 backdrop-blur-sm rounded-full px-2 py-1 relative z-10">
            <LoginButton />
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
          <div className="flex items-center">
            <div className="bg-yellow-500 text-white rounded-lg px-2 py-1 text-xs font-medium flex items-center">
              <Star className="h-3 w-3 mr-1" />
              {business.rating}
            </div>
            <div className="ml-2 text-white text-xs">({business.reviewCount} avaliações)</div>
          </div>
        </div>
      </div>

      <div className="max-w-md mx-auto p-4">
        <h1 className={`text-2xl font-bold ${isBarberShop ? "text-white" : "text-gray-800"}`}>{business.name}</h1>

        <div className={`flex items-center mt-2 ${isBarberShop ? "text-gray-300" : "text-gray-600"}`}>
          <MapPin className="h-4 w-4 mr-1" />
          <span className="text-sm">{business.address}</span>
        </div>

        <div className={`flex items-center mt-1 ${isBarberShop ? "text-gray-300" : "text-gray-600"}`}>
          <Clock className="h-4 w-4 mr-1" />
          <span className="text-sm">
            {business.openNow ? "Aberto agora" : "Fechado"}
            {business.openHours && ` · ${business.openHours}`}
          </span>
        </div>

        <div className="mt-6">
          <Tabs defaultValue="services" className="w-full">
            <TabsList className={`grid w-full grid-cols-2 ${isBarberShop ? "bg-gray-800" : "bg-white"}`}>
              <TabsTrigger value="services">Serviços</TabsTrigger>
              <TabsTrigger value="info">Informações</TabsTrigger>
            </TabsList>
            <TabsContent value="services" className="mt-4">
              {step === 1 && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                  <ServiceSelector
                    services={business.services}
                    selectedService={selectedService}
                    onSelect={setSelectedService}
                    businessType={business.type}
                  />

                  <Button
                    disabled={!selectedService}
                    className={`w-full mt-6 rounded-xl py-6 transition-all duration-300 relative z-10 ${
                      isBarberShop
                        ? "bg-white text-gray-900 hover:bg-gray-100"
                        : "bg-gradient-to-r from-purple-600 to-purple-500 text-white hover:from-purple-700 hover:to-purple-600"
                    }`}
                    onClick={() => setStep(2)}
                    type="button"
                  >
                    Escolher horário
                  </Button>
                </motion.div>
              )}

              {step === 2 && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                  <div className={`mb-4 p-3 rounded-lg ${isBarberShop ? "bg-gray-800" : "bg-white"}`}>
                    <h3 className={`font-medium ${isBarberShop ? "text-white" : "text-gray-800"}`}>
                      Serviço selecionado
                    </h3>
                    <div className="flex justify-between items-center mt-2">
                      <div>
                        <p className={isBarberShop ? "text-white" : "text-gray-800"}>
                          {business.services.find((s: { id: string }) => s.id === selectedService)?.name}
                        </p>
                        <p className={`text-sm ${isBarberShop ? "text-gray-400" : "text-gray-500"}`}>
                          {business.services.find((s: { id: string }) => s.id === selectedService)?.duration}
                        </p>
                      </div>
                      <p className={`font-medium ${isBarberShop ? "text-white" : "text-gray-800"}`}>
                        R$ {business.services.find((s: { id: string }) => s.id === selectedService)?.price.toFixed(2)}
                      </p>
                    </div>
                    <Button
                      variant="ghost"
                      className={`text-sm mt-2 h-8 px-2 ${
                        isBarberShop
                          ? "text-gray-300 hover:text-white hover:bg-gray-700"
                          : "text-purple-600 hover:text-purple-700 hover:bg-purple-50"
                      }`}
                      onClick={() => setStep(1)}
                    >
                      Alterar
                    </Button>
                  </div>

                  <DateTimeSelector
                    businessId={business.id}
                    serviceId={selectedService!}
                    selectedDateTime={selectedDateTime}
                    onSelect={setSelectedDateTime}
                    businessType={business.type}
                  />

                  <Button
                    disabled={!selectedDateTime}
                    className={`w-full mt-6 rounded-xl py-6 transition-all duration-300 relative z-10 ${
                      isBarberShop
                        ? "bg-white text-gray-900 hover:bg-gray-100"
                        : "bg-gradient-to-r from-purple-600 to-purple-500 text-white hover:from-purple-700 hover:to-purple-600"
                    }`}
                    onClick={() => {
                      // Handle booking confirmation
                      window.location.href = `/appointments/confirmation?business=${business.id}&service=${selectedService}&datetime=${selectedDateTime}`
                    }}
                    type="button"
                  >
                    Confirmar agendamento
                  </Button>
                </motion.div>
              )}
            </TabsContent>
            <TabsContent value="info">
              <div className={`p-4 rounded-lg ${isBarberShop ? "bg-gray-800" : "bg-white"}`}>
                <h3 className={`font-medium mb-2 ${isBarberShop ? "text-white" : "text-gray-800"}`}>Sobre</h3>
                <p className={isBarberShop ? "text-gray-300" : "text-gray-600"}>
                  {business.description || "Informações não disponíveis."}
                </p>

                <h3 className={`font-medium mt-4 mb-2 ${isBarberShop ? "text-white" : "text-gray-800"}`}>
                  Horário de funcionamento
                </h3>
                <div className={isBarberShop ? "text-gray-300" : "text-gray-600"}>
                  {business.workingHours ? (
                    <ul className="space-y-1">
                      {business.workingHours.map((item: any, index: number) => (
                        <li key={index} className="flex justify-between">
                          <span>{item.day}</span>
                          <span>{item.hours}</span>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p>Horários não disponíveis.</p>
                  )}
                </div>

                <h3 className={`font-medium mt-4 mb-2 ${isBarberShop ? "text-white" : "text-gray-800"}`}>Contato</h3>
                <div className={isBarberShop ? "text-gray-300" : "text-gray-600"}>
                  <p>Telefone: {business.phone || "Não disponível"}</p>
                  <p>Email: {business.email || "Não disponível"}</p>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </main>
  )
}
