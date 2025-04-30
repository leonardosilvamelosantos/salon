"use client"

import { useState } from "react"
import { Search, Plus, Phone, Mail, Calendar, ChevronDown, ChevronUp, Edit, Trash } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

interface Client {
  id: string
  name: string
  phone: string
  email: string
  lastVisit?: string
  nextAppointment?: string
  notes?: string
  totalVisits: number
  totalSpent: number
}

interface ClientsManagerProps {
  businessType: "barbershop" | "salon"
}

export default function ClientsManager({ businessType }: ClientsManagerProps) {
  const isDark = businessType === "barbershop"
  const [searchTerm, setSearchTerm] = useState("")
  const [showAddClient, setShowAddClient] = useState(false)
  const [expandedClient, setExpandedClient] = useState<string | null>(null)
  const [editingClient, setEditingClient] = useState<Client | null>(null)
  const [newClient, setNewClient] = useState<Partial<Client>>({
    name: "",
    phone: "",
    email: "",
    notes: "",
  })

  // Mock clients data
  const [clients, setClients] = useState<Client[]>([
    {
      id: "1",
      name: "Carlos Silva",
      phone: "(11) 98765-4321",
      email: "carlos.silva@email.com",
      lastVisit: "15/04/2025",
      nextAppointment: "28/04/2025",
      notes: "Prefere corte degradê com tesoura na parte superior.",
      totalVisits: 8,
      totalSpent: 320,
    },
    {
      id: "2",
      name: "Mariana Oliveira",
      phone: "(11) 97654-3210",
      email: "mariana.oliveira@email.com",
      lastVisit: "10/04/2025",
      nextAppointment: "05/05/2025",
      notes: "Alérgica a alguns produtos com amônia. Prefere coloração natural.",
      totalVisits: 12,
      totalSpent: 1450,
    },
    {
      id: "3",
      name: "João Paulo",
      phone: "(11) 99876-5432",
      email: "joao.paulo@email.com",
      lastVisit: "20/04/2025",
      totalVisits: 3,
      totalSpent: 165,
    },
    {
      id: "4",
      name: "Ana Beatriz",
      phone: "(11) 91234-5678",
      email: "ana.beatriz@email.com",
      lastVisit: "05/04/2025",
      notes: "Prefere produtos sem sulfato para o cabelo.",
      totalVisits: 6,
      totalSpent: 780,
    },
  ])

  const filteredClients = clients.filter(
    (client) =>
      client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.phone.includes(searchTerm) ||
      client.email.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const toggleClientExpand = (clientId: string) => {
    if (expandedClient === clientId) {
      setExpandedClient(null)
    } else {
      setExpandedClient(clientId)
    }
  }

  const handleAddClient = () => {
    if (!newClient.name || !newClient.phone) return

    const client: Client = {
      id: `client-${Date.now()}`,
      name: newClient.name,
      phone: newClient.phone,
      email: newClient.email || "",
      notes: newClient.notes,
      totalVisits: 0,
      totalSpent: 0,
    }

    setClients([...clients, client])
    setNewClient({ name: "", phone: "", email: "", notes: "" })
    setShowAddClient(false)
  }

  const handleUpdateClient = () => {
    if (!editingClient) return

    setClients(clients.map((client) => (client.id === editingClient.id ? editingClient : client)))
    setEditingClient(null)
  }

  const handleDeleteClient = (id: string) => {
    setClients(clients.filter((client) => client.id !== id))
  }

  return (
    <div>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div className="relative w-full sm:w-64">
          <Search className={`absolute left-3 top-2.5 h-4 w-4 ${isDark ? "text-gray-400" : "text-gray-500"}`} />
          <Input
            placeholder="Buscar cliente..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className={`pl-9 ${isDark ? "bg-gray-800 border-gray-700 text-white" : ""}`}
          />
        </div>
        <Button
          onClick={() => setShowAddClient(true)}
          className={isDark ? "bg-white text-gray-900 hover:bg-gray-100" : ""}
        >
          <Plus className="h-4 w-4 mr-2" />
          Novo Cliente
        </Button>
      </div>

      {filteredClients.length > 0 ? (
        <div className="space-y-3">
          {filteredClients.map((client) => (
            <Card key={client.id} className={`overflow-hidden ${isDark ? "bg-gray-800 border-gray-700" : ""}`}>
              <div
                className={`p-4 cursor-pointer ${
                  expandedClient === client.id ? (isDark ? "bg-gray-700" : "bg-gray-50") : ""
                }`}
                onClick={() => toggleClientExpand(client.id)}
              >
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className={`font-medium ${isDark ? "text-white" : ""}`}>{client.name}</h3>
                    <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4 mt-1">
                      <div className={`flex items-center text-sm ${isDark ? "text-gray-300" : "text-gray-600"}`}>
                        <Phone className="h-3 w-3 mr-1" />
                        {client.phone}
                      </div>
                      <div className={`flex items-center text-sm ${isDark ? "text-gray-300" : "text-gray-600"}`}>
                        <Mail className="h-3 w-3 mr-1" />
                        {client.email}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center">
                    {client.nextAppointment && (
                      <div
                        className={`hidden sm:flex items-center mr-4 text-sm ${
                          isDark ? "text-gray-300" : "text-gray-600"
                        }`}
                      >
                        <Calendar className="h-3 w-3 mr-1" />
                        Próximo: {client.nextAppointment}
                      </div>
                    )}
                    {expandedClient === client.id ? (
                      <ChevronUp className={`h-5 w-5 ${isDark ? "text-gray-400" : "text-gray-500"}`} />
                    ) : (
                      <ChevronDown className={`h-5 w-5 ${isDark ? "text-gray-400" : "text-gray-500"}`} />
                    )}
                  </div>
                </div>
              </div>

              {expandedClient === client.id && (
                <div className={`p-4 border-t ${isDark ? "border-gray-700" : "border-gray-200"}`}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <h4 className={`text-sm font-medium mb-2 ${isDark ? "text-gray-300" : "text-gray-600"}`}>
                        Informações do Cliente
                      </h4>
                      <div className={`space-y-1 text-sm ${isDark ? "text-gray-300" : "text-gray-600"}`}>
                        <p>
                          <span className="font-medium">Última visita:</span> {client.lastVisit || "Nenhuma"}
                        </p>
                        <p>
                          <span className="font-medium">Próximo agendamento:</span> {client.nextAppointment || "Nenhum"}
                        </p>
                        <p>
                          <span className="font-medium">Total de visitas:</span> {client.totalVisits}
                        </p>
                        <p>
                          <span className="font-medium">Total gasto:</span> R$ {client.totalSpent.toFixed(2)}
                        </p>
                      </div>
                    </div>
                    <div>
                      <h4 className={`text-sm font-medium mb-2 ${isDark ? "text-gray-300" : "text-gray-600"}`}>
                        Observações
                      </h4>
                      <p className={`text-sm ${isDark ? "text-gray-300" : "text-gray-600"}`}>
                        {client.notes || "Nenhuma observação registrada."}
                      </p>
                    </div>
                  </div>

                  <div className="flex justify-end space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setEditingClient(client)}
                      className={isDark ? "border-gray-700 text-gray-300 hover:bg-gray-700" : ""}
                    >
                      <Edit className="h-4 w-4 mr-1" />
                      Editar
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDeleteClient(client.id)}
                      className={`text-red-500 ${
                        isDark
                          ? "border-gray-700 hover:bg-gray-700 hover:text-red-400"
                          : "hover:bg-red-50 hover:text-red-600"
                      }`}
                    >
                      <Trash className="h-4 w-4 mr-1" />
                      Excluir
                    </Button>
                  </div>
                </div>
              )}
            </Card>
          ))}
        </div>
      ) : (
        <div
          className={`text-center py-12 rounded-lg border ${
            isDark ? "border-gray-700 bg-gray-800/50 text-gray-300" : "border-gray-200 text-gray-500"
          }`}
        >
          <Search className="h-12 w-12 mx-auto mb-3 opacity-50" />
          <h3 className={`text-lg font-medium mb-1 ${isDark ? "text-white" : ""}`}>Nenhum cliente encontrado</h3>
          <p className="text-sm">Tente uma busca diferente ou adicione um novo cliente.</p>
        </div>
      )}

      {/* Add Client Dialog */}
      <Dialog open={showAddClient} onOpenChange={setShowAddClient}>
        <DialogContent
          className={isDark ? "bg-gray-800 border-gray-700 text-white" : ""}
          onInteractOutside={(e) => e.preventDefault()}
        >
          <DialogHeader>
            <DialogTitle className={isDark ? "text-white" : ""}>Adicionar Novo Cliente</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="name" className={isDark ? "text-gray-300" : ""}>
                Nome Completo
              </Label>
              <Input
                id="name"
                value={newClient.name}
                onChange={(e) => setNewClient({ ...newClient, name: e.target.value })}
                className={isDark ? "bg-gray-700 border-gray-600 text-white" : ""}
                placeholder="Nome do cliente"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone" className={isDark ? "text-gray-300" : ""}>
                Telefone
              </Label>
              <Input
                id="phone"
                value={newClient.phone}
                onChange={(e) => setNewClient({ ...newClient, phone: e.target.value })}
                className={isDark ? "bg-gray-700 border-gray-600 text-white" : ""}
                placeholder="(00) 00000-0000"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email" className={isDark ? "text-gray-300" : ""}>
                Email
              </Label>
              <Input
                id="email"
                value={newClient.email}
                onChange={(e) => setNewClient({ ...newClient, email: e.target.value })}
                className={isDark ? "bg-gray-700 border-gray-600 text-white" : ""}
                placeholder="email@exemplo.com"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="notes" className={isDark ? "text-gray-300" : ""}>
                Observações
              </Label>
              <Textarea
                id="notes"
                value={newClient.notes}
                onChange={(e) => setNewClient({ ...newClient, notes: e.target.value })}
                className={isDark ? "bg-gray-700 border-gray-600 text-white" : ""}
                placeholder="Preferências, alergias, etc."
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setShowAddClient(false)}
              className={isDark ? "border-gray-700 text-gray-300 hover:bg-gray-700" : ""}
            >
              Cancelar
            </Button>
            <Button onClick={handleAddClient} className={isDark ? "bg-white text-gray-900 hover:bg-gray-100" : ""}>
              Adicionar Cliente
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Client Dialog */}
      <Dialog open={!!editingClient} onOpenChange={(open) => !open && setEditingClient(null)}>
        <DialogContent
          className={isDark ? "bg-gray-800 border-gray-700 text-white" : ""}
          onInteractOutside={(e) => e.preventDefault()}
        >
          <DialogHeader>
            <DialogTitle className={isDark ? "text-white" : ""}>Editar Cliente</DialogTitle>
          </DialogHeader>
          {editingClient && (
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="edit-name" className={isDark ? "text-gray-300" : ""}>
                  Nome Completo
                </Label>
                <Input
                  id="edit-name"
                  value={editingClient.name}
                  onChange={(e) => setEditingClient({ ...editingClient, name: e.target.value })}
                  className={isDark ? "bg-gray-700 border-gray-600 text-white" : ""}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-phone" className={isDark ? "text-gray-300" : ""}>
                  Telefone
                </Label>
                <Input
                  id="edit-phone"
                  value={editingClient.phone}
                  onChange={(e) => setEditingClient({ ...editingClient, phone: e.target.value })}
                  className={isDark ? "bg-gray-700 border-gray-600 text-white" : ""}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-email" className={isDark ? "text-gray-300" : ""}>
                  Email
                </Label>
                <Input
                  id="edit-email"
                  value={editingClient.email}
                  onChange={(e) => setEditingClient({ ...editingClient, email: e.target.value })}
                  className={isDark ? "bg-gray-700 border-gray-600 text-white" : ""}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-notes" className={isDark ? "text-gray-300" : ""}>
                  Observações
                </Label>
                <Textarea
                  id="edit-notes"
                  value={editingClient.notes || ""}
                  onChange={(e) => setEditingClient({ ...editingClient, notes: e.target.value })}
                  className={isDark ? "bg-gray-700 border-gray-600 text-white" : ""}
                />
              </div>
            </div>
          )}
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setEditingClient(null)}
              className={isDark ? "border-gray-700 text-gray-300 hover:bg-gray-700" : ""}
            >
              Cancelar
            </Button>
            <Button onClick={handleUpdateClient} className={isDark ? "bg-white text-gray-900 hover:bg-gray-100" : ""}>
              Salvar Alterações
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
