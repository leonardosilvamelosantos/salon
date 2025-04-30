"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { ChevronRight, CheckCircle, ArrowRight, Star, Calendar, Clock, Users, Scissors, Sparkles, Palette, Eye, Heart, Brush, Smile, Zap } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import CitySelector from "@/components/city-selector"
import LoginButton from "@/components/login-button"
import { cities } from "@/lib/data"
import { useRouter } from "next/navigation"
import Link from "next/link"

export default function Home() {
  const [selectedCity, setSelectedCity] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState<"barbershop" | "salon">("barbershop")
  const router = useRouter()

  const handleContinue = () => {
    if (selectedCity) {
      // Use encodeURIComponent to properly encode the city name for the URL
      const encodedCity = encodeURIComponent(selectedCity)
      router.push(`/${encodedCity}`)
    }
  }

  const features = [
    {
      icon: Calendar,
      title: "Agendamento Simplificado",
      description: "Agende serviços em segundos, sem ligações ou mensagens.",
    },
    {
      icon: Clock,
      title: "Economize Tempo",
      description: "Sem filas de espera. Escolha o horário que funciona para você.",
    },
    {
      icon: Users,
      title: "Fidelização de Clientes",
      description: "Ferramentas para manter seus clientes voltando sempre.",
    },
  ]

  const testimonials = [
    {
      name: "Carlos Silva",
      role: "Proprietário, Barbearia Vintage",
      text: "Desde que implementamos o SmartSalão, nossas reservas aumentaram 40%. A interface é intuitiva tanto para nós quanto para nossos clientes.",
      rating: 5,
      image: "/placeholder.svg?height=60&width=60&text=CS",
    },
    {
      name: "Ana Beatriz",
      role: "Proprietária, Beleza Natural",
      text: "O sistema de gestão de clientes revolucionou nosso negócio. Conseguimos oferecer um serviço muito mais personalizado.",
      rating: 5,
      image: "/placeholder.svg?height=60&width=60&text=AB",
    },
  ]

  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section with Split Background */}
      <section className="relative h-screen overflow-hidden">
        {/* Split Background */}
        <div className="absolute inset-0 flex">
          <div className="w-1/2 bg-gray-900 relative overflow-hidden">
            <div
              className="absolute inset-0 opacity-60"
              style={{
                backgroundImage: "url('/barber.jpg')",
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            ></div>
            <div className="absolute inset-0 bg-gradient-to-r from-gray-900/90 to-gray-900/30"></div>
          </div>
          <div className="w-1/2 bg-purple-100 relative overflow-hidden">
            <div
              className="absolute inset-0 opacity-60"
              style={{
                backgroundImage: "url('/salao.jpg')",
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            ></div>
            <div className="absolute inset-0 bg-gradient-to-l from-purple-100/90 to-purple-100/30"></div>
          </div>
        </div>

        {/* Content */}
        <div className="relative z-10 container mx-auto px-4 h-full flex flex-col">
          {/* Header */}
          <header className="pt-6 flex justify-between items-center relative z-10">
            <div className="flex items-center">
              <h1 className="text-3xl font-bold bg-gradient-to-r from-white via-purple-300 to-purple-600 bg-clip-text text-transparent">
                SmartSalão
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              <div className="relative z-10">
                <Button
                  variant="ghost"
                  className="md:bg-purple-600 md:text-white md:hover:bg-purple-700 md:hover:text-white"
                  onClick={() => router.push("/login")}
                >
                  <span className="hidden md:inline">Entrar</span>
                  <span className="md:hidden">Entrar</span>
                </Button>
              </div>
            </div>
          </header>

          {/* Hero Content */}
          <div className="flex-1 flex flex-col md:flex-row items-center justify-center">
            <div className="w-full md:w-1/2 text-center md:text-left md:pr-8">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 relative z-10"
              >
                Transforme a gestão do seu{" "}
                <span className="bg-gradient-to-r from-purple-400 to-purple-600 bg-clip-text text-transparent">
                  salão de beleza
                </span>{" "}
                ou{" "}
                <span className="bg-gradient-to-r from-gray-400 to-white bg-clip-text text-transparent">barbearia</span>
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-lg md:text-xl text-gray-300 mb-8 relative z-10"
              >
                Plataforma completa para agendamentos online, gestão de clientes e crescimento do seu negócio.
              </motion.p>
              {/* Fundo com contraste para mobile */}
              <div className="absolute inset-0 bg-black/70 md:hidden"></div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="flex flex-col sm:flex-row justify-center md:justify-start gap-4 relative z-10"
              >
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-purple-600 to-purple-800 hover:from-purple-700 hover:to-purple-900 text-white rounded-full px-8 py-6 text-lg"
                  onClick={() => {
                    const bookingSection = document.getElementById("booking-section")
                    if (bookingSection) {
                      bookingSection.scrollIntoView({ behavior: "smooth" })
                    }
                  }}
                >
                  Agendar serviço
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="bg-white/10 text-white border-white/30 hover:bg-white/20 rounded-full px-8 py-6 text-lg"
                  onClick={() => router.push("/register-business")}
                >
                  Cadastrar meu negócio
                </Button>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="hidden md:block w-1/2 relative"
            >
              <div className="relative w-full h-[500px]">
                <div className="absolute top-0 right-0 w-[300px] h-[400px] bg-white rounded-2xl shadow-2xl overflow-hidden transform rotate-3 z-10">
                  <div className="h-40 bg-gray-800">
                    <img
                      src="/barbearia-moderna.jpg"
                      alt="App Barbearia"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-4">
                    <div className="h-6 w-3/4 bg-gray-800 rounded-full mb-3"></div>
                    <div className="h-4 w-full bg-gray-200 rounded-full mb-2"></div>
                    <div className="h-4 w-5/6 bg-gray-200 rounded-full mb-4"></div>
                    <div className="grid grid-cols-3 gap-2">
                      <div className="h-12 bg-gray-800 rounded-lg"></div>
                      <div className="h-12 bg-gray-800 rounded-lg"></div>
                      <div className="h-12 bg-gray-800 rounded-lg"></div>
                    </div>
                  </div>
                </div>
                <div className="absolute bottom-0 left-0 w-[300px] h-[400px] bg-white rounded-2xl shadow-2xl overflow-hidden transform -rotate-3">
                  <div className="h-40 bg-purple-200">
                    <img
                      src="/salao-moderno.jpg"
                      alt="App Salão"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-4">
                    <div className="h-6 w-3/4 bg-purple-500 rounded-full mb-3"></div>
                    <div className="h-4 w-full bg-gray-200 rounded-full mb-2"></div>
                    <div className="h-4 w-5/6 bg-gray-200 rounded-full mb-4"></div>
                    <div className="grid grid-cols-3 gap-2">
                      <div className="h-12 bg-purple-200 rounded-lg"></div>
                      <div className="h-12 bg-purple-200 rounded-lg"></div>
                      <div className="h-12 bg-purple-200 rounded-lg"></div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Scroll Down Indicator */}
          <div className="hidden md:flex justify-center pb-8">
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse" }}
              className="text-white cursor-pointer drop-shadow-lg"
              onClick={() => {
                const featuresSection = document.getElementById("features-section")
                if (featuresSection) {
                  featuresSection.scrollIntoView({ behavior: "smooth" })
                }
              }}
            >
              <div className="flex flex-col items-center">
                <span className="text-sm mb-2 bg-purple-700/90 px-3 py-1 rounded-full font-medium shadow-lg">
                  Saiba mais
                </span>
                <div className="w-6 h-10 border-2 border-purple-600 rounded-full flex justify-center shadow-lg bg-white/80">
                  <motion.div
                    animate={{ y: [0, 8, 0] }}
                    transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
                    className="w-2 h-2 bg-purple-700 rounded-full mt-2 shadow"
                  ></motion.div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Booking Section - Moved up */}
      <section id="booking-section" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Agende seu serviço agora</h2>
              <p className="text-lg text-gray-600">
                Encontre os melhores profissionais na sua região e agende em segundos.
              </p>
            </div>

            <div className="bg-gray-50 rounded-2xl p-8 shadow-md">
              <div className="flex justify-center mb-6">
                <div className="bg-white rounded-full p-1 inline-flex">
                  <button
                    className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
                      activeTab === "barbershop"
                        ? "bg-gray-900 text-white"
                        : "bg-transparent text-gray-600 hover:bg-gray-100"
                    }`}
                    onClick={() => setActiveTab("barbershop")}
                  >
                    Barbearia
                  </button>
                  <button
                    className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
                      activeTab === "salon"
                        ? "bg-purple-600 text-white"
                        : "bg-transparent text-gray-600 hover:bg-gray-100"
                    }`}
                    onClick={() => setActiveTab("salon")}
                  >
                    Salão de Beleza
                  </button>
                </div>
              </div>

              <h3 className="text-xl font-bold mb-4">Onde você está?</h3>
              <div className="space-y-4">
                <div className="relative">
                  <Input
                    type="text"
                    placeholder="Buscar cidade..."
                    className="pl-4 pr-10 py-3 rounded-xl border-gray-200 focus:ring-purple-500 focus:border-purple-500"
                  />
                  <div className="absolute right-3 top-3 text-gray-400">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <circle cx="11" cy="11" r="8" />
                      <path d="m21 21-4.3-4.3" />
                    </svg>
                  </div>
                </div>

                <CitySelector cities={cities} onSelect={(city) => setSelectedCity(city)} selectedCity={selectedCity} />

                <Button
                  disabled={!selectedCity}
                  className="w-full py-6 rounded-xl bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-medium transition-all duration-300 ease-in-out shadow-md hover:shadow-lg flex items-center justify-center relative z-10"
                  onClick={handleContinue}
                  type="button"
                >
                  <span>Encontrar profissionais</span>
                  <ChevronRight className="ml-2 h-5 w-5" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features-section" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
          >
            <motion.h2
              className="text-3xl md:text-4xl font-bold mb-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
            >
              Por que escolher o SmartSalão?
            </motion.h2>
            <motion.p
              className="text-lg text-gray-600 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              viewport={{ once: true }}
            >
              Nossa plataforma foi desenvolvida para atender às necessidades específicas de salões de beleza e
              barbearias de todos os tamanhos.
            </motion.p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 + index * 0.2 }}
                viewport={{ once: true }}
                className="bg-gray-50 rounded-2xl p-8 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="bg-purple-100 w-14 h-14 rounded-xl flex items-center justify-center mb-6">
                  <feature.icon className="h-7 w-7 text-purple-600" />
                </div>
                <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>

          <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="bg-gray-900 text-white rounded-2xl p-8 overflow-hidden relative"
            >
              <div className="absolute top-0 right-0 w-40 h-40 bg-purple-500/20 rounded-full -translate-y-1/2 translate-x-1/2"></div>
              <div className="absolute bottom-0 left-0 w-60 h-60 bg-purple-500/10 rounded-full translate-y-1/2 -translate-x-1/2"></div>
              <h3 className="text-2xl font-bold mb-4 relative z-10">Para Barbearias</h3>
              <ul className="space-y-3 mb-6 relative z-10">
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-purple-400 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Sistema de agendamento otimizado para cortes masculinos e serviços de barba</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-purple-400 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Gestão de fila de espera para clientes sem agendamento</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-purple-400 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Controle de estoque para produtos masculinos</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-purple-400 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Programa de fidelidade específico para o público masculino</span>
                </li>
              </ul>
              <Button
                className="bg-white text-gray-900 hover:bg-purple-100 border-2 border-purple-600 shadow-lg hover:scale-105 transition-transform duration-200 rounded-full px-8 py-6 text-lg font-bold"
                onClick={() => router.push("/register-business")}
              >
                Cadastrar minha barbearia
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="bg-purple-50 rounded-2xl p-8 overflow-hidden relative"
            >
              <div className="absolute top-0 right-0 w-40 h-40 bg-purple-500/20 rounded-full -translate-y-1/2 translate-x-1/2"></div>
              <div className="absolute bottom-0 left-0 w-60 h-60 bg-purple-500/10 rounded-full translate-y-1/2 -translate-x-1/2"></div>
              <h3 className="text-2xl font-bold mb-4 text-gray-800 relative z-10">Para Salões de Beleza</h3>
              <ul className="space-y-3 mb-6 text-gray-700 relative z-10">
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-purple-600 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Agendamento para múltiplos serviços simultâneos (cabelo, unhas, maquiagem)</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-purple-600 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Controle de produtos utilizados por cliente</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-purple-600 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Histórico detalhado de procedimentos e preferências</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-purple-600 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Sistema de lembretes para retornos e manutenções</span>
                </li>
              </ul>
              <Button
                className="bg-gradient-to-r from-purple-600 to-purple-800 hover:from-purple-700 hover:to-purple-900 text-white rounded-xl relative z-10"
                onClick={() => router.push("/register-business")}
              >
                Cadastrar meu salão
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Professional Types Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Para todos os profissionais de beleza</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              O SmartSalão é perfeito para diversos tipos de estabelecimentos e profissionais da beleza.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="bg-gray-50 rounded-xl p-6 text-center"
            >
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Scissors className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="font-semibold text-gray-800 mb-2">Barbearias</h3>
              <p className="text-sm text-gray-600">Cortes, barba e tratamentos masculinos</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
              className="bg-gray-50 rounded-xl p-6 text-center"
            >
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Sparkles className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="font-semibold text-gray-800 mb-2">Salões de Beleza</h3>
              <p className="text-sm text-gray-600">Cortes, coloração e tratamentos capilares</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="bg-gray-50 rounded-xl p-6 text-center"
            >
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Palette className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="font-semibold text-gray-800 mb-2">Nail Designers</h3>
              <p className="text-sm text-gray-600">Manicure, pedicure e alongamentos</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              viewport={{ once: true }}
              className="bg-gray-50 rounded-xl p-6 text-center"
            >
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Eye className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="font-semibold text-gray-800 mb-2">Lash Designers</h3>
              <p className="text-sm text-gray-600">Alongamento e design de cílios</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              viewport={{ once: true }}
              className="bg-gray-50 rounded-xl p-6 text-center"
            >
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="font-semibold text-gray-800 mb-2">Esteticistas</h3>
              <p className="text-sm text-gray-600">Tratamentos faciais e corporais</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              viewport={{ once: true }}
              className="bg-gray-50 rounded-xl p-6 text-center"
            >
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Smile className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="font-semibold text-gray-800 mb-2">Designers de Sobrancelhas</h3>
              <p className="text-sm text-gray-600">Design, henna e micropigmentação</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              viewport={{ once: true }}
              className="bg-gray-50 rounded-xl p-6 text-center"
            >
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Brush className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="font-semibold text-gray-800 mb-2">Maquiadores</h3>
              <p className="text-sm text-gray-600">Maquiagem social e artística</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.7 }}
              viewport={{ once: true }}
              className="bg-gray-50 rounded-xl p-6 text-center"
            >
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Zap className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="font-semibold text-gray-800 mb-2">Depiladores</h3>
              <p className="text-sm text-gray-600">Depilação a cera e a laser</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">O que nossos clientes dizem</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Centenas de profissionais já transformaram seus negócios com o SmartSalão.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-2xl p-6 shadow-md"
              >
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 rounded-full overflow-hidden mr-4">
                    <img
                      src={testimonial.image || "/placeholder.svg"}
                      alt={testimonial.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="font-bold">{testimonial.name}</h4>
                    <p className="text-sm text-gray-600">{testimonial.role}</p>
                  </div>
                </div>
                <div className="flex mb-3">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <Star key={i} className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                  ))}
                </div>
                <p className="text-gray-700">{testimonial.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-gray-900 to-purple-900 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Pronto para transformar seu negócio?</h2>
            <p className="text-lg text-gray-200 mb-8 max-w-2xl mx-auto">
              Junte-se a milhares de profissionais que já estão usando o SmartSalão para crescer seus negócios e
              encantar seus clientes.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button
                size="lg"
                className="bg-white text-gray-900 hover:bg-purple-100 border-2 border-purple-600 shadow-lg hover:scale-105 transition-transform duration-200 rounded-full px-8 py-6 text-lg font-bold"
                onClick={() => router.push("/register-business")}
              >
                Cadastrar meu negócio
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white/30 hover:bg-white/10 rounded-full px-8 py-6 text-lg"
                onClick={() => {
                  const bookingSection = document.getElementById("booking-section")
                  if (bookingSection) {
                    bookingSection.scrollIntoView({ behavior: "smooth" })
                  }
                }}
              >
                Agendar serviço
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4 bg-gradient-to-r from-white via-purple-300 to-purple-600 bg-clip-text text-transparent">
                SmartSalão
              </h3>
              <p className="text-gray-400">A plataforma completa para gestão de salões e barbearias.</p>
            </div>
            <div>
              <h4 className="font-bold mb-4">Empresa</h4>
              <ul className="space-y-2">
                <li>
                  <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                    Sobre nós
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                    Carreiras
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                    Blog
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Recursos</h4>
              <ul className="space-y-2">
                <li>
                  <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                    Para Barbearias
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                    Para Salões
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                    Preços
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Suporte</h4>
              <ul className="space-y-2">
                <li>
                  <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                    Central de Ajuda
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                    Contato
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                    Política de Privacidade
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-500 text-sm">
            <p>&copy; {new Date().getFullYear()} SmartSalão. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>
    </main>
  )
}
