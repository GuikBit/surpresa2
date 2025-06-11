"use client"

import type React from "react"

import { motion } from "framer-motion"
import { ChevronLeft, ChevronRight, Home } from "lucide-react"
import type { Action } from "../App"

interface NavigacaoProps {
  action: Action
  setAction: (item: Action) => void
  next: boolean
  onComplete: () => void
  currentSection: number
  totalSections: number
  onHome: () => void
}

const Navegacao: React.FC<NavigacaoProps> = ({ action, next, onComplete, currentSection, totalSections, onHome }) => {
  const isFirstSection = currentSection === 0
  const isLastSection = currentSection === totalSections - 1

  // Função para lidar com o clique no botão voltar
  const handleBackClick = () => {
    console.log("Botão voltar clicado")
    if (action && action.onBack) {
      action.onBack()
    }
  }

  return (
    <div className="fixed bottom-6 left-0 right-0 z-50 px-4 md:px-8">
      <div className="flex items-center justify-between max-w-4xl mx-auto">
        {/* Botão Voltar */}
        <motion.div
          initial={{ opacity: 0, x: 0 }}
          animate={{
            opacity: isFirstSection ? 0 : 1
          }}
          transition={{ duration: 0.3 }}
        >
          {/* {!isFirstSection && ( */}
            <motion.button
              className="flex items-center gap-2 bg-transparent border-2 border-[#C21807] text-[#C21807] px-4 py-2 md:px-6 md:py-3 rounded-full font-medium shadow-lg backdrop-blur-sm hover:border-none hover:bg-gradient-to-r hover:from-[#C21807] hover:to-[#FF637E] hover:text-white transition-colors duration-300"
              onClick={handleBackClick}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              disabled={isFirstSection}
            >
              <ChevronLeft size={20} />
              <span className="hidden md:inline">Voltar</span>
            </motion.button>
          {/* )} */}
        </motion.div>

        {/* Indicador de progresso */}
        <div className="flex items-center gap-2">
          {Array.from({ length: totalSections }, (_, index) => (
            <motion.div
              key={index}
              className={`w-5 h-2 rounded-full transition-colors duration-300 ${
                index === currentSection ? "bg-[#C21807]" : index < currentSection ? "bg-[#FF637E]" : "bg-gray-300"
              }`}
              animate={index === currentSection ? { scale: [1, 1.2, 1] } : { scale: 1 }}
              transition={{
                repeat: index === currentSection ? Number.POSITIVE_INFINITY : 0,
                duration: 1.5,
              }}
            />
          ))}
        </div>

        {/* Botão Próximo/Início */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{
            opacity: next ? 1 : 0.3,
            x: next ? 0 : 0,
          }}
          transition={{ duration: 0.3 }}
        >
          {isLastSection ? (
            <motion.button
              className="flex items-center gap-2 bg-gradient-to-r from-[#C21807] to-[#FF637E] text-white px-4 py-2 md:px-6 md:py-3 rounded-full font-medium shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
              onClick={onHome}
              whileHover={next ? { scale: 1.05 } : {}}
              whileTap={next ? { scale: 0.95 } : {}}
              disabled={!next}
            >
              <Home size={20} />
              <span className="hidden md:inline">Início</span>
            </motion.button>
          ) : (
            <motion.button
              className="flex items-center gap-2 bg-gradient-to-r from-[#C21807] to-[#FF637E] text-white px-4 py-2 md:px-6 md:py-3 rounded-full font-medium shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
              onClick={onComplete}
              whileHover={next ? { scale: 1.05 } : {}}
              whileTap={next ? { scale: 0.95 } : {}}
              disabled={!next}
            >
              <span className="hidden md:inline">Continuar</span>
              <ChevronRight size={20} />
            </motion.button>
          )}
        </motion.div>
      </div>
    </div>
  )
}

export default Navegacao
