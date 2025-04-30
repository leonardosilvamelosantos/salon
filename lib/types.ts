export interface Service {
  id: string
  name: string
  price: number
  duration: string
}

export interface Business {
  id: string
  type: "barbershop" | "salon"
  name: string
  address: string
  city: string
  rating: number
  reviewCount: number
  openNow: boolean
  openHours?: string
  minPrice: number
  imageUrl?: string
  services: Service[]
  description?: string
  phone?: string
  email?: string
  workingHours?: { day: string; hours: string }[]
  ownerName?: string
}
