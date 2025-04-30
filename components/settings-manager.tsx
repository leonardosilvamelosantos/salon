"use client"

import { useState } from "react"
import { Save, Info } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { toast } from "@/components/ui/use-toast"
import { ToastAction } from "@/components/ui/toast"

interface SettingsManagerProps {
  businessType: "barbershop" | "salon"
}

interface WorkingHour {
  day: string
  open: boolean
  openTime: string
  closeTime: string
  breakStart?: string
  breakEnd?: string
  hasBreak: boolean
}

export default function SettingsManager({ businessType }: SettingsManagerProps) {
  const isDark = businessType === "barbershop"

  const [businessInfo, setBusinessInfo] = useState({
    name: businessType === "barbershop" ? "Barbearia Vintage" : "Beleza Natural",
    address: businessType === "barbershop" ? "Rua Augusta, 1200 - Consolação" : "Rua Oscar Freire, 500 - Jardins",
    city: "São Paulo",
    phone: businessType === "barbershop" ? "(11) 99999-8888" : "(11) 97777-6666",
    email: businessType === "barbershop" ? "contato@barbeariavintage.com.br" : "contato@belezanatural.com.br",
    description:
      businessType === "barbershop"
        ? "Barbearia tradicional com ambiente vintage e cerveja grátis para clientes."
        : "Salão especializado em tratamentos naturais para todos os tipos de cabelo.",
    ownerName: businessType === "barbershop" ? "Carlos Oliveira" : "Ana Beatriz",
  })

  const [workingHours, setWorkingHours] = useState<WorkingHour[]>([
    {
      day: "Segunda-feira",
      open: true,
      openTime: "09:00",
      closeTime: "19:00",
      hasBreak: true,
      breakStart: "12:00",
      breakEnd: "13:00",
    },
    {
      day: "Terça-feira",
      open: true,
      openTime: "09:00",
      closeTime: "19:00",
      hasBreak: true,
      breakStart: "12:00",
      breakEnd: "13:00",
    },
    {
      day: "Quarta-feira",
      open: true,
      openTime: "09:00",
      closeTime: "19:00",
      hasBreak: true,
      breakStart: "12:00",
      breakEnd: "13:00",
    },
    {
      day: "Quinta-feira",
      open: true,
      openTime: "09:00",
      closeTime: "19:00",
      hasBreak: true,
      breakStart: "12:00",
      breakEnd: "13:00",
    },
    {
      day: "Sexta-feira",
      open: true,
      openTime: "09:00",
      closeTime: "19:00",
      hasBreak: true,
      breakStart: "12:00",
      breakEnd: "13:00",
    },
    { day: "Sábado", open: true, openTime: "09:00", closeTime: "17:00", hasBreak: false },
    { day: "Domingo", open: false, openTime: "09:00", closeTime: "17:00", hasBreak: false },
  ])

  const handleBusinessInfoChange = (field: string, value: string) => {
    setBusinessInfo({
      ...businessInfo,
      [field]: value,
    })
  }

  const updateWorkingHour = (index: number, field: string, value: any) => {
    const newWorkingHours = [...workingHours]
    newWorkingHours[index] = { ...newWorkingHours[index], [field]: value }
    setWorkingHours(newWorkingHours)
  }

  const handleSaveSettings = () => {
    // Here you would typically save to a database
    toast({
      title: "Configurações salvas",
      description: "Suas alterações foram salvas com sucesso.",
      action: <ToastAction altText="Ok">Ok</ToastAction>,
    })
  }

  return (
    <Tabs defaultValue="business-info" className="w-full">
      <TabsList className={`grid w-full grid-cols-2 ${isDark ? "bg-gray-800" : "bg-white"}`}>
        <TabsTrigger value="business-info">Estabelecimento</TabsTrigger>
        <TabsTrigger value="working-hours">Horário</TabsTrigger>
      </TabsList>

      <TabsContent value="business-info" className="mt-4">
        <Card className={isDark ? "bg-gray-800 border-gray-700" : ""}>
          <CardHeader>
            <CardTitle className={isDark ? "text-white" : ""}>Informações do Estabelecimento</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="business-name" className={isDark ? "text-gray-300" : ""}>
                  Nome do Estabelecimento
                </Label>
                <Input
                  id="business-name"
                  value={businessInfo.name}
                  onChange={(e) => handleBusinessInfoChange("name", e.target.value)}
                  className={isDark ? "bg-gray-700 border-gray-600 text-white" : ""}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="owner-name" className={isDark ? "text-gray-300" : ""}>
                  Nome do Proprietário
                </Label>
                <Input
                  id="owner-name"
                  value={businessInfo.ownerName}
                  onChange={(e) => handleBusinessInfoChange("ownerName", e.target.value)}
                  className={isDark ? "bg-gray-700 border-gray-600 text-white" : ""}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="address" className={isDark ? "text-gray-300" : ""}>
                Endereço
              </Label>
              <Input
                id="address"
                value={businessInfo.address}
                onChange={(e) => handleBusinessInfoChange("address", e.target.value)}
                className={isDark ? "bg-gray-700 border-gray-600 text-white" : ""}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="city" className={isDark ? "text-gray-300" : ""}>
                  Cidade
                </Label>
                <Input
                  id="city"
                  value={businessInfo.city}
                  onChange={(e) => handleBusinessInfoChange("city", e.target.value)}
                  className={isDark ? "bg-gray-700 border-gray-600 text-white" : ""}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone" className={isDark ? "text-gray-300" : ""}>
                  Telefone
                </Label>
                <Input
                  id="phone"
                  value={businessInfo.phone}
                  onChange={(e) => handleBusinessInfoChange("phone", e.target.value)}
                  className={isDark ? "bg-gray-700 border-gray-600 text-white" : ""}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className={isDark ? "text-gray-300" : ""}>
                Email
              </Label>
              <Input
                id="email"
                value={businessInfo.email}
                onChange={(e) => handleBusinessInfoChange("email", e.target.value)}
                className={isDark ? "bg-gray-700 border-gray-600 text-white" : ""}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description" className={isDark ? "text-gray-300" : ""}>
                Descrição
              </Label>
              <Textarea
                id="description"
                value={businessInfo.description}
                onChange={(e) => handleBusinessInfoChange("description", e.target.value)}
                className={`min-h-[100px] ${isDark ? "bg-gray-700 border-gray-600 text-white" : ""}`}
              />
            </div>

            <div className="flex justify-end pt-4">
              <Button onClick={handleSaveSettings} className={isDark ? "bg-white text-gray-900 hover:bg-gray-100" : ""}>
                <Save className="h-4 w-4 mr-2" />
                Salvar Alterações
              </Button>
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="working-hours" className="mt-4">
        <Card className={isDark ? "bg-gray-800 border-gray-700" : ""}>
          <CardHeader>
            <CardTitle className={isDark ? "text-white" : ""}>Horário de Funcionamento</CardTitle>
          </CardHeader>
          <CardContent>
            <div
              className={`mb-4 flex items-start p-3 rounded-lg ${
                isDark
                  ? "bg-gray-700 border border-gray-600 text-gray-100"
                  : "bg-blue-50 border border-blue-100 text-blue-800"
              }`}
            >
              <Info className="h-5 w-5 mr-2 flex-shrink-0 mt-0.5" />
              <div className="text-sm">
                <p className="font-medium">Configuração de horários</p>
                <p>
                  Defina os horários de funcionamento para cada dia da semana. Você pode marcar dias como fechados ou
                  adicionar intervalos.
                </p>
              </div>
            </div>

            <div className="space-y-4">
              {workingHours.map((day, index) => (
                <div key={index} className={`p-4 rounded-lg border ${isDark ? "border-gray-700" : "border-gray-200"}`}>
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="flex items-center">
                      <div className={`w-32 font-medium ${isDark ? "text-white" : ""}`}>{day.day}</div>
                      <div className="flex items-center">
                        <Switch
                          checked={day.open}
                          onCheckedChange={(checked) => updateWorkingHour(index, "open", checked)}
                          id={`day-${index}`}
                        />
                        <Label htmlFor={`day-${index}`} className={`ml-2 ${isDark ? "text-white" : ""}`}>
                          {day.open ? "Aberto" : "Fechado"}
                        </Label>
                      </div>
                    </div>
                  </div>

                  {day.open && (
                    <div className="mt-4 space-y-4">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label className={`text-sm ${isDark ? "text-gray-300" : "text-gray-600"}`}>
                            Horário de Abertura
                          </Label>
                          <Select
                            value={day.openTime}
                            onValueChange={(value) => updateWorkingHour(index, "openTime", value)}
                          >
                            <SelectTrigger className={isDark ? "bg-gray-700 border-gray-600 text-white" : ""}>
                              <SelectValue placeholder="Selecione" />
                            </SelectTrigger>
                            <SelectContent>
                              {Array.from({ length: 13 }, (_, i) => i + 7).map((hour) => (
                                <SelectItem key={hour} value={`${hour.toString().padStart(2, "0")}:00`}>
                                  {`${hour.toString().padStart(2, "0")}:00`}
                                </SelectItem>
                              ))}
                              {Array.from({ length: 13 }, (_, i) => i + 7).map((hour) => (
                                <SelectItem key={`${hour}-30`} value={`${hour.toString().padStart(2, "0")}:30`}>
                                  {`${hour.toString().padStart(2, "0")}:30`}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label className={`text-sm ${isDark ? "text-gray-300" : "text-gray-600"}`}>
                            Horário de Fechamento
                          </Label>
                          <Select
                            value={day.closeTime}
                            onValueChange={(value) => updateWorkingHour(index, "closeTime", value)}
                          >
                            <SelectTrigger className={isDark ? "bg-gray-700 border-gray-600 text-white" : ""}>
                              <SelectValue placeholder="Selecione" />
                            </SelectTrigger>
                            <SelectContent>
                              {Array.from({ length: 14 }, (_, i) => i + 12).map((hour) => (
                                <SelectItem key={hour} value={`${hour.toString().padStart(2, "0")}:00`}>
                                  {`${hour.toString().padStart(2, "0")}:00`}
                                </SelectItem>
                              ))}
                              {Array.from({ length: 14 }, (_, i) => i + 12).map((hour) => (
                                <SelectItem key={`${hour}-30`} value={`${hour.toString().padStart(2, "0")}:30`}>
                                  {`${hour.toString().padStart(2, "0")}:30`}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      <div className="flex items-center">
                        <Switch
                          checked={day.hasBreak}
                          onCheckedChange={(checked) => updateWorkingHour(index, "hasBreak", checked)}
                          id={`break-${index}`}
                        />
                        <Label htmlFor={`break-${index}`} className={`ml-2 ${isDark ? "text-white" : ""}`}>
                          Intervalo de almoço
                        </Label>
                      </div>

                      {day.hasBreak && (
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pl-8 pt-2">
                          <div className="space-y-2">
                            <Label className={`text-sm ${isDark ? "text-gray-300" : "text-gray-600"}`}>
                              Início do Intervalo
                            </Label>
                            <Select
                              value={day.breakStart}
                              onValueChange={(value) => updateWorkingHour(index, "breakStart", value)}
                            >
                              <SelectTrigger className={isDark ? "bg-gray-700 border-gray-600 text-white" : ""}>
                                <SelectValue placeholder="Selecione" />
                              </SelectTrigger>
                              <SelectContent>
                                {Array.from({ length: 8 }, (_, i) => i + 11).map((hour) => (
                                  <SelectItem key={hour} value={`${hour.toString().padStart(2, "0")}:00`}>
                                    {`${hour.toString().padStart(2, "0")}:00`}
                                  </SelectItem>
                                ))}
                                {Array.from({ length: 8 }, (_, i) => i + 11).map((hour) => (
                                  <SelectItem key={`${hour}-30`} value={`${hour.toString().padStart(2, "0")}:30`}>
                                    {`${hour.toString().padStart(2, "0")}:30`}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="space-y-2">
                            <Label className={`text-sm ${isDark ? "text-gray-300" : "text-gray-600"}`}>
                              Fim do Intervalo
                            </Label>
                            <Select
                              value={day.breakEnd}
                              onValueChange={(value) => updateWorkingHour(index, "breakEnd", value)}
                            >
                              <SelectTrigger className={isDark ? "bg-gray-700 border-gray-600 text-white" : ""}>
                                <SelectValue placeholder="Selecione" />
                              </SelectTrigger>
                              <SelectContent>
                                {Array.from({ length: 8 }, (_, i) => i + 12).map((hour) => (
                                  <SelectItem key={hour} value={`${hour.toString().padStart(2, "0")}:00`}>
                                    {`${hour.toString().padStart(2, "0")}:00`}
                                  </SelectItem>
                                ))}
                                {Array.from({ length: 8 }, (_, i) => i + 12).map((hour) => (
                                  <SelectItem key={`${hour}-30`} value={`${hour.toString().padStart(2, "0")}:30`}>
                                    {`${hour.toString().padStart(2, "0")}:30`}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="flex justify-end pt-6">
              <Button onClick={handleSaveSettings} className={isDark ? "bg-white text-gray-900 hover:bg-gray-100" : ""}>
                <Save className="h-4 w-4 mr-2" />
                Salvar Horários
              </Button>
            </div>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  )
}
