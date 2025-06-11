"use client"

import { useEffect, useState } from "react"
import QuizSection from "./QuizSection"

export default function QuizHome({ setNext, onComplete }: {setNext:(item: boolean)=>void, onComplete: () => void }) {
  const [currentSection, setCurrentSection] = useState("welcome")

  const handleStartQuiz = () => {
    setCurrentSection("quiz")
  }

  useEffect(()=>{
    setNext(true)
  },[setNext])

  // const handleQuizComplete = () => {
  //   setCurrentSection("final")
  // }

  const handleBackToWelcome = () => {
    setCurrentSection("welcome")
  }

  // const proximo = () =>{
  //   setNext(true)
  // }

  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-4">
      {currentSection === "welcome" && (
        <div className="max-w-md bg-white mx-auto text-center p-6 rounded-lg shadow-lg z-10 ">
          <h1 className="text-3xl font-bold text-pink-700 mb-4">Quiz do Dia dos Namorados</h1>
          <p className="mb-6 text-gray-700">Descubra o quanto vocês se conhecem neste quiz especial!</p>
          <button
            onClick={handleStartQuiz}
            className="px-6 py-3 bg-gradient-to-r from-[#C21807] to-[#FF637E] text-white rounded-full font-medium hover:scale-105 transition-all shadow-md"
          >
            Começar Quiz
          </button>
        </div>
      )}

      {currentSection === "quiz" && <QuizSection onComplete={onComplete} onBack={handleBackToWelcome} />}

      {currentSection === "final" && (
        <div className="max-w-md mx-auto text-center p-6 bg-neutral-300 rounded-lg shadow-lg">
          <h1 className="text-3xl font-bold text-pink-700 mb-4">Feliz Dia dos Namorados!</h1>
          <p className="mb-6 text-gray-700">
            Obrigado por participar do nosso quiz especial. Que o amor de vocês continue crescendo a cada dia!
          </p>
          <button
            onClick={handleBackToWelcome}
            className="px-6 py-3 bg-gradient-to-r from-pink-500 to-red-500 text-white rounded-full font-medium hover:from-pink-600 hover:to-red-600 transition-all shadow-md"
          >
            Voltar ao Início
          </button>
        </div>
      )}
    </main>
  )
}
