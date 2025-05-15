"use client"

import FinalSection from "./FinalSection"

export default function HomeFinalSection({homeSection, setNext}) {


  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-4 pt-30 md:pt-20 pb-50 ">
      {/* {currentSection === "final" && ( */}
        <FinalSection
          onBack={homeSection}
          setNext={setNext}
          partnerName="querido" // Personalize com o nome do seu parceiro(a)
        />
      {/* )} */}

      {/* {currentSection === "welcome" && (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-pink-100 to-red-100 p-4">
          <div className="max-w-md w-full bg-white/80 backdrop-blur-sm rounded-xl shadow-lg p-8 text-center">
            <h1 className="text-3xl font-bold text-pink-700 mb-4">Quiz do Dia dos Namorados</h1>
            <p className="mb-6 text-gray-700">Volte para a página inicial do nosso site especial!</p>
            <button
              onClick={() => setCurrentSection("final")}
              className="px-6 py-3 bg-gradient-to-r from-pink-500 to-red-500 text-white rounded-full font-medium hover:from-pink-600 hover:to-red-600 transition-all shadow-md"
            >
              Ver Mensagem Especial
            </button>
          </div>
        </div>
      )} */}
    </main>
  )
}
