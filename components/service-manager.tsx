"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Plus, Edit2, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import type { Service } from "@/lib/types"

interface ServiceManagerProps {
  services: Service[]
  businessType: "barbershop" | "salon"
}

export default function ServiceManager({ services: initialServices, businessType }: ServiceManagerProps) {
  const [services, setServices] = useState<Service[]>(initialServices)
  const [editingService, setEditingService] = useState<Service | null>(null)
  const [newService, setNewService] = useState<Partial<Service>>({
    name: "",
    price: 0,
    duration: "30 min",
  })
  const [isAdding, setIsAdding] = useState(false)

  const isBarberShop = businessType === "barbershop"

  const handleAddService = () => {
    if (!newService.name || !newService.price) return

    const service: Service = {
      id: `service-${Date.now()}`,
      name: newService.name,
      price: Number(newService.price),
      duration: newService.duration || "30 min",
    }

    setServices([...services, service])
    setNewService({ name: "", price: 0, duration: "30 min" })
    setIsAdding(false)
  }

  const handleUpdateService = () => {
    if (!editingService) return

    setServices(services.map((service) => (service.id === editingService.id ? editingService : service)))

    setEditingService(null)
  }

  const handleDeleteService = (id: string) => {
    setServices(services.filter((service) => service.id !== id))
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h3 className={`font-medium ${isBarberShop ? "text-white" : "text-gray-800"}`}>Serviços ({services.length})</h3>

        <Button
          onClick={() => setIsAdding(true)}
          className={`rounded-full ${
            isBarberShop ? "bg-white text-gray-900 hover:bg-gray-100" : "bg-purple-600 text-white hover:bg-purple-700"
          }`}
          size="sm"
        >
          <Plus className="h-4 w-4 mr-1" />
          Adicionar
        </Button>
      </div>

      {isAdding && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className={`p-4 rounded-lg mb-4 ${isBarberShop ? "bg-gray-700" : "bg-purple-50 border border-purple-100"}`}
        >
          <h4 className={`font-medium mb-3 ${isBarberShop ? "text-white" : "text-gray-800"}`}>Novo Serviço</h4>

          <div className="space-y-3">
            <div>
              <label className={`text-sm font-medium block mb-1 ${isBarberShop ? "text-gray-300" : "text-gray-700"}`}>
                Nome do Serviço
              </label>
              <Input
                value={newService.name}
                onChange={(e) => setNewService({ ...newService, name: e.target.value })}
                className={isBarberShop ? "bg-gray-800 border-gray-600 text-white" : ""}
              />
            </div>

            <div>
              <label className={`text-sm font-medium block mb-1 ${isBarberShop ? "text-gray-300" : "text-gray-700"}`}>
                Preço (R$)
              </label>
              <Input
                type="number"
                value={newService.price || ""}
                onChange={(e) => setNewService({ ...newService, price: Number.parseFloat(e.target.value) })}
                className={isBarberShop ? "bg-gray-800 border-gray-600 text-white" : ""}
              />
            </div>

            <div>
              <label className={`text-sm font-medium block mb-1 ${isBarberShop ? "text-gray-300" : "text-gray-700"}`}>
                Duração
              </label>
              <select
                value={newService.duration}
                onChange={(e) => setNewService({ ...newService, duration: e.target.value })}
                className={`w-full rounded-md border ${
                  isBarberShop ? "bg-gray-800 border-gray-600 text-white" : "border-gray-300"
                } py-2 px-3`}
              >
                <option value="15 min">15 minutos</option>
                <option value="30 min">30 minutos</option>
                <option value="45 min">45 minutos</option>
                <option value="1 hora">1 hora</option>
                <option value="1 hora e 30 min">1 hora e 30 minutos</option>
                <option value="2 horas">2 horas</option>
              </select>
            </div>

            <div className="flex justify-end space-x-2 pt-2">
              <Button
                variant="outline"
                onClick={() => setIsAdding(false)}
                className={isBarberShop ? "border-gray-600 text-gray-300 hover:bg-gray-700" : ""}
              >
                Cancelar
              </Button>
              <Button
                onClick={handleAddService}
                className={
                  isBarberShop
                    ? "bg-white text-gray-900 hover:bg-gray-100"
                    : "bg-purple-600 text-white hover:bg-purple-700"
                }
              >
                Adicionar Serviço
              </Button>
            </div>
          </div>
        </motion.div>
      )}

      {editingService && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className={`p-4 rounded-lg mb-4 ${isBarberShop ? "bg-gray-700" : "bg-purple-50 border border-purple-100"}`}
        >
          <h4 className={`font-medium mb-3 ${isBarberShop ? "text-white" : "text-gray-800"}`}>Editar Serviço</h4>

          <div className="space-y-3">
            <div>
              <label className={`text-sm font-medium block mb-1 ${isBarberShop ? "text-gray-300" : "text-gray-700"}`}>
                Nome do Serviço
              </label>
              <Input
                value={editingService.name}
                onChange={(e) => setEditingService({ ...editingService, name: e.target.value })}
                className={isBarberShop ? "bg-gray-800 border-gray-600 text-white" : ""}
              />
            </div>

            <div>
              <label className={`text-sm font-medium block mb-1 ${isBarberShop ? "text-gray-300" : "text-gray-700"}`}>
                Preço (R$)
              </label>
              <Input
                type="number"
                value={editingService.price}
                onChange={(e) => setEditingService({ ...editingService, price: Number.parseFloat(e.target.value) })}
                className={isBarberShop ? "bg-gray-800 border-gray-600 text-white" : ""}
              />
            </div>

            <div>
              <label className={`text-sm font-medium block mb-1 ${isBarberShop ? "text-gray-300" : "text-gray-700"}`}>
                Duração
              </label>
              <select
                value={editingService.duration}
                onChange={(e) => setEditingService({ ...editingService, duration: e.target.value })}
                className={`w-full rounded-md border ${
                  isBarberShop ? "bg-gray-800 border-gray-600 text-white" : "border-gray-300"
                } py-2 px-3`}
              >
                <option value="15 min">15 minutos</option>
                <option value="30 min">30 minutos</option>
                <option value="45 min">45 minutos</option>
                <option value="1 hora">1 hora</option>
                <option value="1 hora e 30 min">1 hora e 30 minutos</option>
                <option value="2 horas">2 horas</option>
              </select>
            </div>

            <div className="flex justify-end space-x-2 pt-2">
              <Button
                variant="outline"
                onClick={() => setEditingService(null)}
                className={isBarberShop ? "border-gray-600 text-gray-300 hover:bg-gray-700" : ""}
              >
                Cancelar
              </Button>
              <Button
                onClick={handleUpdateService}
                className={
                  isBarberShop
                    ? "bg-white text-gray-900 hover:bg-gray-100"
                    : "bg-purple-600 text-white hover:bg-purple-700"
                }
              >
                Salvar Alterações
              </Button>
            </div>
          </div>
        </motion.div>
      )}

      <div className="space-y-2">
        {services.length > 0 ? (
          services.map((service) => (
            <div
              key={service.id}
              className={`p-3 rounded-lg flex justify-between items-center ${
                isBarberShop ? "bg-gray-700" : "bg-white border border-gray-200"
              }`}
            >
              <div>
                <h4 className={`font-medium ${isBarberShop ? "text-white" : "text-gray-800"}`}>{service.name}</h4>
                <div className={`text-sm ${isBarberShop ? "text-gray-400" : "text-gray-500"}`}>
                  {service.duration} · R$ {service.price.toFixed(2)}
                </div>
              </div>

              <div className="flex space-x-1">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setEditingService(service)}
                  className={`rounded-full ${
                    isBarberShop ? "text-gray-300 hover:bg-gray-600" : "text-gray-500 hover:bg-gray-100"
                  }`}
                >
                  <Edit2 className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleDeleteService(service.id)}
                  className={`rounded-full ${
                    isBarberShop ? "text-gray-300 hover:bg-gray-600" : "text-gray-500 hover:bg-gray-100"
                  }`}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))
        ) : (
          <div className={`text-center py-8 ${isBarberShop ? "text-gray-400" : "text-gray-500"}`}>
            <p>Nenhum serviço cadastrado.</p>
            <p className="text-sm mt-1">Clique em "Adicionar" para criar um novo serviço.</p>
          </div>
        )}
      </div>
    </div>
  )
}
