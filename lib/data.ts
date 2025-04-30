import type { Business } from "./types"

// Mock data for cities
export const cities = ["São Paulo", "Rio de Janeiro", "Belo Horizonte", "Brasília", "Salvador", "Curitiba"]

// Mock data for businesses
const businesses: Business[] = [
  // São Paulo
  {
    id: "barber-1",
    type: "barbershop",
    name: "Barbearia Vintage",
    address: "Rua Augusta, 1200 - Consolação",
    city: "São Paulo",
    rating: 4.8,
    reviewCount: 124,
    openNow: true,
    openHours: "09:00 - 20:00",
    minPrice: 35.0,
    imageUrl: "/barbearia-moderna.jpg",
    services: [
      { id: "service-1", name: "Corte Masculino", price: 35.0, duration: "30 min" },
      { id: "service-2", name: "Barba", price: 25.0, duration: "30 min" },
      { id: "service-3", name: "Corte + Barba", price: 55.0, duration: "1 hora" },
      { id: "service-4", name: "Degradê", price: 40.0, duration: "45 min" },
    ],
    description: "Barbearia tradicional com ambiente vintage e cerveja grátis para clientes.",
    phone: "(11) 99999-8888",
    email: "contato@barbeariavintage.com.br",
    workingHours: [
      { day: "Segunda-feira", hours: "09:00 - 20:00" },
      { day: "Terça-feira", hours: "09:00 - 20:00" },
      { day: "Quarta-feira", hours: "09:00 - 20:00" },
      { day: "Quinta-feira", hours: "09:00 - 20:00" },
      { day: "Sexta-feira", hours: "09:00 - 20:00" },
      { day: "Sábado", hours: "09:00 - 18:00" },
      { day: "Domingo", hours: "Fechado" },
    ],
    ownerName: "Carlos Oliveira",
  },
  {
    id: "barber-2",
    type: "barbershop",
    name: "Barber Shop Premium",
    address: "Av. Paulista, 1000 - Bela Vista",
    city: "São Paulo",
    rating: 4.6,
    reviewCount: 98,
    openNow: true,
    openHours: "10:00 - 19:00",
    minPrice: 45.0,
    imageUrl: "/barber.jpg",
    services: [
      { id: "service-5", name: "Corte Executivo", price: 45.0, duration: "30 min" },
      { id: "service-6", name: "Barba Completa", price: 35.0, duration: "30 min" },
      { id: "service-7", name: "Pacote Premium", price: 75.0, duration: "1 hora e 30 min" },
    ],
    description: "Barbearia premium com atendimento exclusivo e produtos importados.",
    phone: "(11) 98888-7777",
    email: "contato@barbershoppremium.com.br",
  },
  {
    id: "salon-1",
    type: "salon",
    name: "Beleza Natural",
    address: "Rua Oscar Freire, 500 - Jardins",
    city: "São Paulo",
    rating: 4.9,
    reviewCount: 156,
    openNow: true,
    openHours: "09:00 - 19:00",
    minPrice: 70.0,
    imageUrl: "/salao-moderno.jpg",
    services: [
      { id: "service-8", name: "Corte Feminino", price: 70.0, duration: "45 min" },
      { id: "service-9", name: "Coloração", price: 120.0, duration: "2 horas" },
      { id: "service-10", name: "Hidratação", price: 90.0, duration: "1 hora" },
      { id: "service-11", name: "Escova", price: 60.0, duration: "45 min" },
    ],
    description: "Salão especializado em tratamentos naturais para todos os tipos de cabelo.",
    phone: "(11) 97777-6666",
    email: "contato@belezanatural.com.br",
  },
  {
    id: "salon-2",
    type: "salon",
    name: "Studio Hair",
    address: "Av. Rebouças, 1500 - Pinheiros",
    city: "São Paulo",
    rating: 4.7,
    reviewCount: 112,
    openNow: false,
    openHours: "10:00 - 20:00",
    minPrice: 80.0,
    imageUrl: "/salao.jpg",
    services: [
      { id: "service-12", name: "Corte Moderno", price: 80.0, duration: "45 min" },
      { id: "service-13", name: "Mechas", price: 180.0, duration: "2 horas e 30 min" },
      { id: "service-14", name: "Penteado", price: 120.0, duration: "1 hora" },
    ],
    description: "Salão moderno com profissionais especializados em tendências internacionais.",
    phone: "(11) 96666-5555",
    email: "contato@studiohair.com.br",
  },

  // Rio de Janeiro
  {
    id: "barber-3",
    type: "barbershop",
    name: "Barbearia Carioca",
    address: "Av. Atlântica, 500 - Copacabana",
    city: "Rio de Janeiro",
    rating: 4.7,
    reviewCount: 89,
    openNow: true,
    openHours: "09:00 - 19:00",
    minPrice: 40.0,
    imageUrl: "/barbearia-moderna.jpg",
    services: [
      { id: "service-15", name: "Corte Tradicional", price: 40.0, duration: "30 min" },
      { id: "service-16", name: "Barba Completa", price: 30.0, duration: "30 min" },
      { id: "service-17", name: "Combo Carioca", price: 65.0, duration: "1 hora" },
    ],
    description: "Barbearia com vista para o mar e ambiente descontraído.",
    phone: "(21) 99999-8888",
    email: "contato@barbeariacarioca.com.br",
  },
  {
    id: "salon-3",
    type: "salon",
    name: "Espaço Beleza Rio",
    address: "Rua Visconde de Pirajá, 351 - Ipanema",
    city: "Rio de Janeiro",
    rating: 4.8,
    reviewCount: 132,
    openNow: true,
    openHours: "10:00 - 20:00",
    minPrice: 75.0,
    imageUrl: "/salao-moderno.jpg",
    services: [
      { id: "service-18", name: "Corte Feminino", price: 75.0, duration: "45 min" },
      { id: "service-19", name: "Coloração", price: 130.0, duration: "2 horas" },
      { id: "service-20", name: "Tratamento Capilar", price: 95.0, duration: "1 hora" },
    ],
    description: "Salão sofisticado em Ipanema com profissionais renomados.",
    phone: "(21) 98888-7777",
    email: "contato@espacobelezario.com.br",
  },

  // Belo Horizonte
  {
    id: "barber-4",
    type: "barbershop",
    name: "Barba & Cia",
    address: "Av. do Contorno, 6061 - Savassi",
    city: "Belo Horizonte",
    rating: 4.5,
    reviewCount: 78,
    openNow: true,
    openHours: "09:00 - 19:00",
    minPrice: 35.0,
    imageUrl: "/barber.jpg",
    services: [
      { id: "service-21", name: "Corte Clássico", price: 35.0, duration: "30 min" },
      { id: "service-22", name: "Barba Modelada", price: 25.0, duration: "30 min" },
      { id: "service-23", name: "Pacote Completo", price: 55.0, duration: "1 hora" },
    ],
    description: "Barbearia tradicional mineira com atendimento personalizado.",
    phone: "(31) 99999-8888",
    email: "contato@barbacia.com.br",
  },
  {
    id: "salon-4",
    type: "salon",
    name: "Beleza Mineira",
    address: "Rua Fernandes Tourinho, 735 - Savassi",
    city: "Belo Horizonte",
    rating: 4.6,
    reviewCount: 92,
    openNow: true,
    openHours: "09:00 - 20:00",
    minPrice: 65.0,
    imageUrl: "/salao.jpg",
    services: [
      { id: "service-24", name: "Corte Feminino", price: 65.0, duration: "45 min" },
      { id: "service-25", name: "Escova", price: 55.0, duration: "45 min" },
      { id: "service-26", name: "Manicure", price: 40.0, duration: "45 min" },
    ],
    description: "Salão completo com serviços de cabelo, unhas e estética.",
    phone: "(31) 98888-7777",
    email: "contato@belezamineira.com.br",
  },

  // Brasília
  {
    id: "barber-5",
    type: "barbershop",
    name: "Capital Barber",
    address: "CLN 201 Bloco A - Asa Norte",
    city: "Brasília",
    rating: 4.7,
    reviewCount: 84,
    openNow: true,
    openHours: "09:00 - 19:00",
    minPrice: 45.0,
    imageUrl: "/barbearia-moderna.jpg",
    services: [
      { id: "service-27", name: "Corte Executivo", price: 45.0, duration: "30 min" },
      { id: "service-28", name: "Barba", price: 35.0, duration: "30 min" },
      { id: "service-29", name: "Combo Capital", price: 70.0, duration: "1 hora" },
    ],
    description: "Barbearia moderna para o homem contemporâneo.",
    phone: "(61) 99999-8888",
    email: "contato@capitalbarber.com.br",
  },
  {
    id: "salon-5",
    type: "salon",
    name: "Espaço Beleza Brasília",
    address: "SCLS 308 Bloco B - Asa Sul",
    city: "Brasília",
    rating: 4.9,
    reviewCount: 115,
    openNow: true,
    openHours: "09:00 - 20:00",
    minPrice: 80.0,
    imageUrl: "/salao-moderno.jpg",
    services: [
      { id: "service-30", name: "Corte Feminino", price: 80.0, duration: "45 min" },
      { id: "service-31", name: "Coloração", price: 150.0, duration: "2 horas" },
      { id: "service-32", name: "Penteado", price: 120.0, duration: "1 hora" },
    ],
    description: "Salão premium com atendimento exclusivo e produtos importados.",
    phone: "(61) 98888-7777",
    email: "contato@espacobelezabrasilia.com.br",
  },

  // Salvador
  {
    id: "barber-6",
    type: "barbershop",
    name: "Barbearia Baiana",
    address: "Av. Oceânica, 1500 - Barra",
    city: "Salvador",
    rating: 4.6,
    reviewCount: 76,
    openNow: true,
    openHours: "09:00 - 19:00",
    minPrice: 30.0,
    imageUrl: "/barber.jpg",
    services: [
      { id: "service-33", name: "Corte Tradicional", price: 30.0, duration: "30 min" },
      { id: "service-34", name: "Barba", price: 25.0, duration: "30 min" },
      { id: "service-35", name: "Combo Baiano", price: 50.0, duration: "1 hora" },
    ],
    description: "Barbearia com clima descontraído e música ao vivo nos fins de semana.",
    phone: "(71) 99999-8888",
    email: "contato@barbeariabaiana.com.br",
  },
  {
    id: "salon-6",
    type: "salon",
    name: "Beleza da Bahia",
    address: "Rua Chile, 20 - Centro Histórico",
    city: "Salvador",
    rating: 4.7,
    reviewCount: 88,
    openNow: true,
    openHours: "09:00 - 19:00",
    minPrice: 60.0,
    imageUrl: "/salao.jpg",
    services: [
      { id: "service-36", name: "Corte Feminino", price: 60.0, duration: "45 min" },
      { id: "service-37", name: "Tranças", price: 120.0, duration: "2 horas" },
      { id: "service-38", name: "Tratamento Capilar", price: 90.0, duration: "1 hora" },
    ],
    description: "Salão especializado em cabelos cacheados e crespos.",
    phone: "(71) 98888-7777",
    email: "contato@belezadabahia.com.br",
  },

  // Curitiba
  {
    id: "barber-7",
    type: "barbershop",
    name: "Barba & Bigode",
    address: "Rua Mateus Leme, 2000 - Centro Cívico",
    city: "Curitiba",
    rating: 4.8,
    reviewCount: 95,
    openNow: true,
    openHours: "09:00 - 19:00",
    minPrice: 40.0,
    imageUrl: "/barbearia-moderna.jpg",
    services: [
      { id: "service-39", name: "Corte Masculino", price: 40.0, duration: "30 min" },
      { id: "service-40", name: "Barba Completa", price: 30.0, duration: "30 min" },
      { id: "service-41", name: "Combo Completo", price: 65.0, duration: "1 hora" },
    ],
    description: "Barbearia moderna com ambiente aconchegante e cerveja artesanal.",
    phone: "(41) 99999-8888",
    email: "contato@barbabigode.com.br",
  },
  {
    id: "salon-7",
    type: "salon",
    name: "Espaço Beleza Curitiba",
    address: "Av. Visconde de Guarapuava, 3300 - Centro",
    city: "Curitiba",
    rating: 4.7,
    reviewCount: 102,
    openNow: true,
    openHours: "09:00 - 20:00",
    minPrice: 70.0,
    imageUrl: "/salao-moderno.jpg",
    services: [
      { id: "service-42", name: "Corte Feminino", price: 70.0, duration: "45 min" },
      { id: "service-43", name: "Coloração", price: 140.0, duration: "2 horas" },
      { id: "service-44", name: "Hidratação", price: 85.0, duration: "1 hora" },
    ],
    description: "Salão completo com profissionais especializados em técnicas modernas.",
    phone: "(41) 98888-7777",
    email: "contato@espacobelezacuritiba.com.br",
  },
]

// Mock data for user appointments
const userAppointments = [
  {
    id: "appointment-1",
    businessId: "barber-1",
    businessName: "Barbearia Vintage",
    serviceName: "Corte + Barba",
    price: 55.0,
    date: "28/04/2025",
    dateISO: "2025-04-28",
    time: "14:00 - 15:00",
    timeStart: "14:00:00",
    timeEnd: "15:00:00",
    address: "Rua Augusta, 1200 - Consolação, São Paulo",
  },
  {
    id: "appointment-2",
    businessId: "salon-1",
    businessName: "Beleza Natural",
    serviceName: "Corte Feminino",
    price: 70.0,
    date: "05/05/2025",
    dateISO: "2025-05-05",
    time: "10:30 - 11:15",
    timeStart: "10:30:00",
    timeEnd: "11:15:00",
    address: "Rua Oscar Freire, 500 - Jardins, São Paulo",
  },
]

// Helper functions to get data
export function getBusinessesByCity(city: string, type: "barbershop" | "salon" | null = null): Business[] {
  return businesses.filter((business) => business.city === city && (type === null || business.type === type))
}

export function getBusinessById(id: string): Business | undefined {
  return businesses.find((business) => business.id === id)
}

export function getBusinessForOwner(): Business | undefined {
  return businesses[0] // For demo purposes, return the first business
}

export function getUserAppointments(): any[] {
  return userAppointments
}

export function getAvailableTimeSlots(businessId: string, serviceId: string, date: Date): string[] {
  // This would normally fetch from an API
  // For demo purposes, return mock data
  const dayOfWeek = date.getDay()

  // Weekend has fewer slots
  if (dayOfWeek === 0) {
    return [] // Sunday closed
  } else if (dayOfWeek === 6) {
    return ["10:00", "11:00", "12:00"] // Saturday limited hours
  }

  // Weekdays
  return ["09:00", "10:00", "11:00", "14:00", "15:00", "16:00", "17:00", "18:00"]
}

// Mock authentication function
export async function authenticateUser(email: string, password: string): Promise<{ success: boolean; isAdmin: boolean }> {
  // Simulate API delay
  return new Promise((resolve) => {
    setTimeout(() => {
      if (email === "admin@teste" && password === "teste123") {
        resolve({ success: true, isAdmin: true })
      } else {
        resolve({ success: false, isAdmin: false })
      }
    }, 500)
  })
}
