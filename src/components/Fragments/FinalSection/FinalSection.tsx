"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"


const FinalSection = ({ onBack, partnerName = "amor", setNext }) => {
  // const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const [showMessage, setShowMessage] = useState(false)
  const [currentMessage, setCurrentMessage] = useState(0)

  const messages = [
    "Você é o amor da minha vida. Obrigado por todos os momentos maravilhosos que compartilhamos juntos.",
    "Cada dia ao seu lado é uma nova aventura cheia de amor e felicidade.",
    "Seu sorriso ilumina meus dias e seu amor aquece meu coração.",
    "Que nosso amor continue crescendo e se fortalecendo a cada dia que passa.",
  ]

  // Alternar mensagens
  useEffect(() => {
    if (showMessage) {
      const interval = setInterval(() => {
        setCurrentMessage((prev) => (prev + 1) % messages.length)
      }, 5000)
      return () => clearInterval(interval)
    }
  }, [showMessage, messages.length])

  // Mostrar mensagem após delay
  useEffect(() => {
    setNext(false)
    const timer = setTimeout(() => {
      setShowMessage(true)
    }, 2000)
    return () => clearTimeout(timer)
  }, [])


  return (
    <motion.div
      className="relative min-h-screen w-full overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >

      {/* Conteúdo principal */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen">
        <motion.div
          className="w-full max-w-4xl mx-auto bg-white rounded-3xl overflow-hidden p-6 md:p-10"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {/* Título */}
          <motion.h1
            className="text-4xl md:text-6xl font-bold text-center text-pink-700 mb-8 relative"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <span className="relative inline-block">
              Feliz Dia dos Namorados
              <motion.span
                className="absolute -top-6 -right-6 text-6xl"
                animate={{
                  scale: [1, 1.2, 1],
                  rotate: [0, 10, 0],
                }}
                transition={{
                  duration: 2,
                  repeat: Number.POSITIVE_INFINITY,
                  repeatType: "reverse",
                }}
              >
                ❤️
              </motion.span>
            </span>
          </motion.h1>

          {/* Grid de fotos */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <motion.div
              className="relative h-60 rounded-xl overflow-hidden shadow-lg transform rotate-[-3deg]"
              whileHover={{ scale: 1.05, rotate: 0 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <img src="/placeholder.svg?height=300&width=300" alt="Foto do casal" className="object-cover" />
            </motion.div>

            <motion.div
              className="relative h-60 rounded-xl overflow-hidden shadow-lg transform translate-y-4"
              whileHover={{ scale: 1.05, translateY: 0 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <img src="/placeholder.svg?height=300&width=300" alt="Foto do casal" className="object-cover" />
            </motion.div>

            <motion.div
              className="relative h-60 rounded-xl overflow-hidden shadow-lg transform rotate-[3deg]"
              whileHover={{ scale: 1.05, rotate: 0 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <img src="/placeholder.svg?height=300&width=300" alt="Foto do casal" className="object-cover" />
            </motion.div>
          </motion.div>

          {/* Mensagem */}
          <motion.div
            className="relative bg-white rounded-2xl p-6 shadow-inner mb-8 min-h-[120px] flex items-center justify-center"
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 1.2 }}
          >
            <AnimatePresence mode="wait">
              {showMessage && (
                <motion.p
                  key={currentMessage}
                  className="text-lg md:text-xl text-center text-pink-800 font-medium my-5"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5 }}
                >
                  <span className="text-2xl font-bold text-red-500">Meu {partnerName}, </span>
                  <br className="md:hidden" />
                  {messages[currentMessage]}
                </motion.p>
              )}
            </AnimatePresence>

            {/* Indicadores de mensagem */}
            <div className="absolute bottom-2 left-0 right-0 flex justify-center gap-1 mt-5">
              {messages.map((_, index) => (
                <motion.div
                  key={index}
                  className={`h-1.5 rounded-full ${currentMessage === index ? "w-6 bg-pink-500" : "w-2 bg-pink-300"}`}
                  animate={{
                    width: currentMessage === index ? 24 : 8,
                    backgroundColor: currentMessage === index ? "#ec4899" : "#f9a8d4",
                  }}
                  transition={{ duration: 0.3 }}
                />
              ))}
            </div>
          </motion.div>

          {/* Botões */}
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <motion.button
              className="px-6 py-3 bg-white text-pink-700 rounded-full font-medium shadow-md hover:shadow-lg border-2 border-pink-200"
              onClick={onBack}
              whileHover={{ scale: 1.05, backgroundColor: "#fdf2f8" }}
              whileTap={{ scale: 0.95 }}
            >
              Voltar ao Início
            </motion.button>

            <motion.a
              href="#"
              className="px-6 py-3 bg-gradient-to-r from-pink-500 to-red-500 text-white rounded-full font-medium shadow-md hover:shadow-lg text-center"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Nosso Presente Especial
            </motion.a>
          </div>
        </motion.div>
      </div>

      {/* Formas decorativas */}
      <motion.div
        className="absolute top-[10%] left-[5%] w-64 h-64 rounded-full bg-gradient-to-r from-pink-300/20 to-red-300/20 blur-3xl"
        animate={{
          scale: [1, 1.2, 1],
          x: [0, 30, 0],
          y: [0, -30, 0],
        }}
        transition={{
          duration: 15,
          repeat: Number.POSITIVE_INFINITY,
          repeatType: "reverse",
        }}
      />

      <motion.div
        className="absolute bottom-[10%] right-[5%] w-80 h-80 rounded-full bg-gradient-to-r from-red-300/20 to-purple-300/20 blur-3xl"
        animate={{
          scale: [1, 1.3, 1],
          x: [0, -40, 0],
          y: [0, 40, 0],
        }}
        transition={{
          duration: 18,
          repeat: Number.POSITIVE_INFINITY,
          repeatType: "reverse",
        }}
      />

      {/* Partículas brilhantes */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        {Array.from({ length: 20 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 rounded-full bg-white"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              scale: [0, 1, 0],
              opacity: [0, 0.8, 0],
            }}
            transition={{
              duration: Math.random() * 3 + 2,
              repeat: Number.POSITIVE_INFINITY,
              delay: Math.random() * 5,
            }}
          />
        ))}
      </div>
    </motion.div>
  )
}

export default FinalSection
