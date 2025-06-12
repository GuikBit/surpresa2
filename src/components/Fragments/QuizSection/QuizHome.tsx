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
    <main className="min-h-screen flex flex-col items-center justify-center p-10">
      {currentSection === "welcome" && (
        <div className="max-w-xl bg-white text-center p-10 px-20 rounded-lg shadow-lg z-10 ">
          <h1 className="text-3xl font-bold text-pink-700 mb-4">Quiz do Dia dos Namorados</h1>
          <p className="mb-6 text-gray-700">Descubra o quanto vocês se conhecem neste quiz especial!</p>

          <div className="flex fle-row justify-center">
            <img src="https://img.freepik.com/vetores-premium/dia-dos-namorados-ilustracao-em-vetor-de-dia-dos-namorados-personagens-fofinhos-romantico-casal-de-noivos_795469-134.jpg" width={300} alt="" className="my-10" />
          
          </div>
          <button
            onClick={handleStartQuiz}
            className="px-6 py-3 bg-gradient-to-r from-[#C21807] to-[#FF637E] text-white rounded-full font-medium hover:scale-105 transition-all shadow-md"
          >
            Começar Quiz
          </button>
        </div>
      )}

      {currentSection === "quiz" && <QuizSection onComplete={onComplete} onBack={handleBackToWelcome} />}

      
    </main>
  )
}
