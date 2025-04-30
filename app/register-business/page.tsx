"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { ArrowLeft, Upload, ImageIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { cities } from "@/lib/data"
import Link from "next/link"

export default function RegisterBusinessPage() {
  const [businessType, setBusinessType] = useState<"barbershop" | "salon">("salon")
  const [services, setServices] = useState<Array<{ name: string; price: string; duration: string }>>([
    { name: "", price: "", duration: "30 min" },
  ])
  const [workingHours, setWorkingHours] = useState<Array<{ day: string; open: boolean; hours: string }>>([
    { day: "Segunda-feira", open: true, hours: "09:00 - 19:00" },
    { day: "Terça-feira", open: true, hours: "09:00 - 19:00" },
    { day: "Quarta-feira", open: true, hours: "09:00 - 19:00" },
    { day: "Quinta-feira", open: true, hours: "09:00 - 19:00" },
    { day: "Sexta-feira", open: true, hours: "09:00 - 19:00" },
    { day: "Sábado", open: true, hours: "09:00 - 17:00" },
    { day: "Domingo", open: false, hours: "Fechado" },
  ])
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [currentStep, setCurrentStep] = useState(1)

  const addService = () => {
    setServices([...services, { name: "", price: "", duration: "30 min" }])
  }

  const removeService = (index: number) => {
    const newServices = [...services]
    newServices.splice(index, 1)
    setServices(newServices)
  }

  const updateService = (index: number, field: string, value: string) => {
    const newServices = [...services]
    newServices[index] = { ...newServices[index], [field]: value }
    setServices(newServices)
  }

  const updateWorkingHour = (index: number, field: string, value: any) => {
    const newWorkingHours = [...workingHours]
    newWorkingHours[index] = { ...newWorkingHours[index], [field]: value }

    // If closed, set hours to "Fechado"
    if (field === "open" && value === false) {
      newWorkingHours[index].hours = "Fechado"
    } else if (field === "open" && value === true && newWorkingHours[index].hours === "Fechado") {
      newWorkingHours[index].hours = "09:00 - 19:00"
    }

    setWorkingHours(newWorkingHours)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false)
      alert("Salão cadastrado com sucesso! Após revisão, seu estabelecimento estará disponível na plataforma.")
      window.location.href = "/"
    }, 1500)
  }

  const nextStep = () => {
    setCurrentStep(currentStep + 1)
    window.scrollTo(0, 0)
  }

  const prevStep = () => {
    setCurrentStep(currentStep - 1)
    window.scrollTo(0, 0)
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 p-4">
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center mb-6">
          <Link href="/">
            <Button variant="ghost" size="icon" className="rounded-full">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <h1 className="text-2xl font-bold ml-2 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
            Cadastrar Estabelecimento
          </h1>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <div className="flex justify-between mb-8">
            <div className={`flex items-center ${currentStep >= 1 ? "text-purple-600 font-medium" : "text-gray-400"}`}>
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center mr-2 ${
                  currentStep >= 1 ? "bg-purple-100" : "bg-gray-100"
                }`}
              >
                1
              </div>
              <span className="hidden sm:inline">Informações Básicas</span>
            </div>
            <div className={`h-0.5 w-10 sm:w-20 mt-4 ${currentStep >= 2 ? "bg-purple-600" : "bg-gray-200"}`} />
            <div className={`flex items-center ${currentStep >= 2 ? "text-purple-600 font-medium" : "text-gray-400"}`}>
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center mr-2 ${
                  currentStep >= 2 ? "bg-purple-100" : "bg-gray-100"
                }`}
              >
                2
              </div>
              <span className="hidden sm:inline">Serviços</span>
            </div>
            <div className={`h-0.5 w-10 sm:w-20 mt-4 ${currentStep >= 3 ? "bg-purple-600" : "bg-gray-200"}`} />
            <div className={`flex items-center ${currentStep >= 3 ? "text-purple-600 font-medium" : "text-gray-400"}`}>
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center mr-2 ${
                  currentStep >= 3 ? "bg-purple-100" : "bg-gray-100"
                }`}
              >
                3
              </div>
              <span className="hidden sm:inline">Horários</span>
            </div>
          </div>

          <form onSubmit={handleSubmit}>
            {currentStep === 1 && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-6">
                <div>
                  <Label className="text-base font-medium">Tipo de Estabelecimento</Label>
                  <RadioGroup
                    value={businessType}
                    onValueChange={(value) => setBusinessType(value as "barbershop" | "salon")}
                    className="flex gap-4 mt-2"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="barbershop" id="barbershop" />
                      <Label htmlFor="barbershop" className="cursor-pointer">
                        Barbearia
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="salon" id="salon" />
                      <Label htmlFor="salon" className="cursor-pointer">
                        Salão de Beleza
                      </Label>
                    </div>
                  </RadioGroup>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="name">Nome do Estabelecimento</Label>
                  <Input id="name" placeholder="Ex: Salão Beleza Total" required />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="city">Cidade</Label>
                    <Select required>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione uma cidade" />
                      </SelectTrigger>
                      <SelectContent>
                        {cities.map((city) => (
                          <SelectItem key={city} value={city}>
                            {city}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="address">Endereço Completo</Label>
                    <Input id="address" placeholder="Rua, número, bairro" required />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="phone">Telefone</Label>
                    <Input id="phone" placeholder="(00) 00000-0000" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" placeholder="contato@seusalao.com" required />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Descrição</Label>
                  <Textarea
                    id="description"
                    placeholder="Descreva seu estabelecimento, especialidades e diferenciais..."
                    className="min-h-[100px]"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label>Foto do Estabelecimento</Label>
                  <Card className="border-dashed border-2 border-gray-300">
                    <CardContent className="flex flex-col items-center justify-center p-6 text-center">
                      <ImageIcon className="h-10 w-10 text-gray-400 mb-2" />
                      <p className="text-sm text-gray-500 mb-2">Arraste uma imagem ou clique para fazer upload</p>
                      <p className="text-xs text-gray-400">PNG, JPG ou JPEG (máx. 5MB)</p>
                      <Button variant="outline" size="sm" className="mt-4">
                        <Upload className="h-4 w-4 mr-2" />
                        Selecionar Arquivo
                      </Button>
                    </CardContent>
                  </Card>
                </div>

                <div className="pt-4 flex justify-end">
                  <Button
                    type="button"
                    onClick={nextStep}
                    className="py-6 px-8 rounded-xl bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white"
                  >
                    Próximo
                  </Button>
                </div>
              </motion.div>
            )}

            {currentStep === 2 && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-6">
                <div>
                  <div className="flex justify-between items-center mb-4">
                    <Label className="text-base font-medium">Serviços Oferecidos</Label>
                    <Button type="button" variant="outline" size="sm" onClick={addService} className="rounded-full">
                      + Adicionar Serviço
                    </Button>
                  </div>

                  <div className="space-y-4">
                    {services.map((service, index) => (
                      <div key={index} className="p-4 border rounded-lg bg-gray-50">
                        <div className="flex justify-between items-center mb-3">
                          <h4 className="font-medium">Serviço {index + 1}</h4>
                          {services.length > 1 && (
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              onClick={() => removeService(index)}
                              className="h-8 text-red-500 hover:text-red-700 hover:bg-red-50"
                            >
                              Remover
                            </Button>
                          )}
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div className="space-y-2 md:col-span-1">
                            <Label htmlFor={`service-name-${index}`}>Nome do Serviço</Label>
                            <Input
                              id={`service-name-${index}`}
                              value={service.name}
                              onChange={(e) => updateService(index, "name", e.target.value)}
                              placeholder="Ex: Corte Feminino"
                              required
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor={`service-price-${index}`}>Preço (R$)</Label>
                            <Input
                              id={`service-price-${index}`}
                              value={service.price}
                              onChange={(e) => updateService(index, "price", e.target.value)}
                              placeholder="Ex: 50.00"
                              required
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor={`service-duration-${index}`}>Duração</Label>
                            <Select
                              value={service.duration}
                              onValueChange={(value) => updateService(index, "duration", value)}
                              required
                            >
                              <SelectTrigger id={`service-duration-${index}`}>
                                <SelectValue placeholder="Selecione" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="15 min">15 minutos</SelectItem>
                                <SelectItem value="30 min">30 minutos</SelectItem>
                                <SelectItem value="45 min">45 minutos</SelectItem>
                                <SelectItem value="1 hora">1 hora</SelectItem>
                                <SelectItem value="1 hora e 30 min">1 hora e 30 minutos</SelectItem>
                                <SelectItem value="2 horas">2 horas</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-4 flex justify-between">
                  <Button type="button" variant="outline" onClick={prevStep} className="py-6 px-8 rounded-xl">
                    Voltar
                  </Button>
                  <Button
                    type="button"
                    onClick={nextStep}
                    className="py-6 px-8 rounded-xl bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white"
                  >
                    Próximo
                  </Button>
                </div>
              </motion.div>
            )}

            {currentStep === 3 && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-6">
                <div>
                  <Label className="text-base font-medium">Horário de Funcionamento</Label>
                  <div className="mt-4 space-y-4">
                    {workingHours.map((day, index) => (
                      <div
                        key={index}
                        className="flex flex-col sm:flex-row sm:items-center justify-between p-3 border rounded-lg"
                      >
                        <div className="flex items-center mb-2 sm:mb-0">
                          <div className="w-32 font-medium">{day.day}</div>
                          <div className="flex items-center">
                            <Switch
                              checked={day.open}
                              onCheckedChange={(checked) => updateWorkingHour(index, "open", checked)}
                              id={`day-${index}`}
                            />
                            <Label htmlFor={`day-${index}`} className="ml-2">
                              {day.open ? "Aberto" : "Fechado"}
                            </Label>
                          </div>
                        </div>

                        {day.open && (
                          <Select
                            value={day.hours}
                            onValueChange={(value) => updateWorkingHour(index, "hours", value)}
                            disabled={!day.open}
                          >
                            <SelectTrigger className="w-full sm:w-48">
                              <SelectValue placeholder="Selecione o horário" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="08:00 - 18:00">08:00 - 18:00</SelectItem>
                              <SelectItem value="09:00 - 19:00">09:00 - 19:00</SelectItem>
                              <SelectItem value="10:00 - 20:00">10:00 - 20:00</SelectItem>
                              <SelectItem value="08:00 - 14:00">08:00 - 14:00</SelectItem>
                              <SelectItem value="09:00 - 17:00">09:00 - 17:00</SelectItem>
                            </SelectContent>
                          </Select>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                <Separator className="my-6" />

                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="flex items-center h-5">
                      <input
                        id="terms"
                        type="checkbox"
                        className="h-4 w-4 rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                        required
                      />
                    </div>
                    <div className="ml-3 text-sm">
                      <Label htmlFor="terms" className="text-gray-700">
                        Concordo com os{" "}
                        <a href="#" className="text-purple-600 hover:underline">
                          Termos de Serviço
                        </a>{" "}
                        e{" "}
                        <a href="#" className="text-purple-600 hover:underline">
                          Política de Privacidade
                        </a>
                      </Label>
                    </div>
                  </div>
                </div>

                <div className="pt-4 flex justify-between">
                  <Button type="button" variant="outline" onClick={prevStep} className="py-6 px-8 rounded-xl">
                    Voltar
                  </Button>
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="py-6 px-8 rounded-xl bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white"
                  >
                    {isSubmitting ? "Cadastrando..." : "Finalizar Cadastro"}
                  </Button>
                </div>
              </motion.div>
            )}
          </form>
        </div>
      </div>
    </main>
  )
}
