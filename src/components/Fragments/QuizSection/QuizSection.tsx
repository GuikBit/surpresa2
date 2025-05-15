"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Heart, Clock, Award, ArrowLeft, RefreshCw } from "lucide-react"
import confetti from "canvas-confetti"
import { Card } from "../../ui/Card"
import { Progress } from "../../ui/Progress"
import { Button } from "../../ui/Button"

const QuizSection = ({ onComplete, onBack }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [score, setScore] = useState(0)
  const [showResult, setShowResult] = useState(false)
  const [selectedAnswer, setSelectedAnswer] = useState(null)
  const [timeLeft, setTimeLeft] = useState(20)
  const [timerActive, setTimerActive] = useState(true)

  // Perguntas mais interessantes e românticas
  const questions = [
    {
      question: "Qual foi o momento em que você percebeu que estava apaixonado(a)?",
      options: [
        "Quando nos beijamos pela primeira vez",
        "Quando você me fez rir em um momento difícil",
        "Quando apresentei você para minha família",
        "Quando viajamos juntos pela primeira vez",
      ],
      correctAnswer: 1,
      image: "/placeholder.svg?height=200&width=300",
    },
    {
      question: "Se pudéssemos ter um encontro dos sonhos, onde seria?",
      options: [
        "Paris, a cidade do amor",
        "Uma praia deserta ao pôr do sol",
        "Um chalé na montanha com neve",
        "Um jantar à luz de velas em casa",
      ],
      correctAnswer: 3,
      image: "/placeholder.svg?height=200&width=300",
    },
    {
      question: "Qual música mais te lembra de nós?",
      options: [
        "Uma música que dançamos juntos",
        "Aquela que tocava em nosso primeiro encontro",
        "A música que dedicamos um ao outro",
        "Uma que sempre cantamos juntos no carro",
      ],
      correctAnswer: 2,
      image: "/placeholder.svg?height=200&width=300",
    },
    {
      question: "O que você mais ama em mim?",
      options: [
        "Seu sorriso e olhar",
        "Sua inteligência e criatividade",
        "Seu carinho e atenção comigo",
        "Seu senso de humor",
      ],
      correctAnswer: 2,
      image: "/placeholder.svg?height=200&width=300",
    },
    {
      question: "Qual seria nosso final de semana perfeito juntos?",
      options: [
        "Maratonar séries e pedir comida",
        "Fazer uma viagem surpresa",
        "Passar o dia no parque e jantar fora",
        "Cozinhar juntos e jogar jogos de tabuleiro",
      ],
      correctAnswer: 3,
      image: "/placeholder.svg?height=200&width=300",
    },
    {
      question: "Qual é o nosso maior sonho como casal?",
      options: [
        "Viajar pelo mundo juntos",
        "Construir uma família",
        "Ter nossa própria casa",
        "Envelhecer juntos com saúde e amor",
      ],
      correctAnswer: 0,
      image: "/placeholder.svg?height=200&width=300",
    },
  ]

  useEffect(() => {
    let timer
    if (timerActive && !showResult && timeLeft > 0) {
      timer = setTimeout(() => {
        setTimeLeft(timeLeft - 1)
      }, 1000)
    } else if (timeLeft === 0 && !showResult) {
      handleTimeUp()
    }

    return () => clearTimeout(timer)
  }, [timeLeft, timerActive, showResult])

  const handleTimeUp = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
      setSelectedAnswer(null)
      setTimeLeft(20)
    } else {
      setShowResult(true)
    }
  }

  const handleAnswer = (index) => {
    setSelectedAnswer(index)
    setTimerActive(false)

    if (index === questions[currentQuestion].correctAnswer) {
      setScore(score + 1)
      // Pequena explosão de confetti para respostas corretas
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
      })
    }

    setTimeout(() => {
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1)
        setSelectedAnswer(null)
        setTimeLeft(20)
        setTimerActive(true)
      } else {
        setShowResult(true)
      }
    }, 1500)
  }

  const resetQuiz = () => {
    setCurrentQuestion(0)
    setScore(0)
    setShowResult(false)
    setSelectedAnswer(null)
    setTimeLeft(20)
    setTimerActive(true)
  }

  const getResultMessage = () => {
    const percentage = (score / questions.length) * 100

    if (percentage === 100) {
      return {
        title: "Amor Perfeito! ❤️",
        message: "Vocês são almas gêmeas! Seu amor é tão sincronizado que parecem ler a mente um do outro!",
        emoji: "💞",
      }
    } else if (percentage >= 80) {
      return {
        title: "Amor Profundo! 💖",
        message: "Vocês se conhecem muito bem! Seu relacionamento é forte e cheio de compreensão mútua!",
        emoji: "💑",
      }
    } else if (percentage >= 60) {
      return {
        title: "Amor Crescente! 💕",
        message: "Vocês estão no caminho certo! Continuem descobrindo mais um sobre o outro a cada dia!",
        emoji: "🥰",
      }
    } else if (percentage >= 40) {
      return {
        title: "Amor em Desenvolvimento! 💓",
        message: "Ainda há muito a descobrir um sobre o outro! Que tal um encontro especial para conversar mais?",
        emoji: "😊",
      }
    } else {
      return {
        title: "Início de Jornada! 💘",
        message:
          "Vocês estão apenas começando a se conhecer! Aproveitem cada momento para descobrir mais um sobre o outro!",
        emoji: "🌱",
      }
    }
  }

  const resultInfo = getResultMessage()

  return (
    <motion.div
      className="w-full max-w-3xl mx-auto z-10"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <Card className="p-6 bg-neutral-300 shadow-lg">
        <div className="text-center mb-6">
          <h2 className="text-3xl font-bold text-red-700 flex items-center justify-center gap-2">
            <Heart className="text-red-500 fill-red-500" />
            Quiz do Amor
            <Heart className="text-red-500 fill-red-500" />
          </h2>
          <p className="text-red-600 mt-2">Descubra o quanto vocês se conhecem!</p>
        </div>

        <AnimatePresence mode="wait">
          {!showResult ? (
            <motion.div
              key="question"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-red-700">
                  Pergunta {currentQuestion + 1} de {questions.length}
                </span>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-red-700" />
                  <span className={`text-sm font-medium ${timeLeft <= 5 ? "text-red-600" : "text-red-700"}`}>
                    {timeLeft}s
                  </span>
                </div>
              </div>

              <Progress
                value={(currentQuestion / questions.length) * 100}
                className="h-2 bg-red-100"
                indicatorClassName="bg-gradient-to-r from-red-500 to-red-500"
              />

              <div className="text-center mb-4">
                {/* {questions[currentQuestion].image && (
                  <img
                    src={questions[currentQuestion].image || "/placeholder.svg"}
                    alt="Imagem da pergunta"
                    className="mx-auto rounded-lg shadow-md mb-4 max-h-[200px]"
                  />
                )} */}
                <h3 className="text-xl font-semibold text-gray-800 mb-6">{questions[currentQuestion].question}</h3>
              </div>

              <div className="grid gap-3">
                {questions[currentQuestion].options.map((option, index) => (
                  <motion.div key={index} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                    <Button
                      variant="outline"
                      className={`w-full p-4 text-left justify-start h-auto border-2 ${
                        selectedAnswer === index
                          ? index === questions[currentQuestion].correctAnswer
                            ? "border-green-500 bg-green-50 text-green-700"
                            : "border-red-500 bg-red-50 text-red-700"
                          : "border-red-200 hover:border-red-400 text-neutral-800 hover:bg-red-50"
                      }`}
                      onClick={() => selectedAnswer === null && handleAnswer(index)}
                      disabled={selectedAnswer !== null}
                    >
                      <span className="flex items-start">
                        <span className="flex items-center justify-center w-6 h-6 rounded-full bg-red-100 text-red-700 mr-3 shrink-0">
                          {String.fromCharCode(65 + index)}
                        </span>
                        {option}
                      </span>
                    </Button>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="result"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="text-center space-y-6"
            >
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.2, type: "spring" }}
              >
                <div className="text-6xl mb-2">{resultInfo.emoji}</div>
                <h3 className="text-2xl font-bold text-red-700">{resultInfo.title}</h3>
              </motion.div>

              <div className="bg-white rounded-lg p-6 shadow-inner">
                <div className="flex items-center justify-center gap-2 mb-4">
                  <Award className="h-6 w-6 text-red-600" />
                  <span className="text-xl font-semibold text-red-700">
                    {score} de {questions.length} pontos
                  </span>
                </div>

                <p className="text-gray-700 mb-4">{resultInfo.message}</p>

                <div className="w-full bg-gray-100 rounded-full h-4 mb-2">
                  <div
                    className="h-4 rounded-full bg-gradient-to-r from-red-400 to-red-500"
                    style={{ width: `${(score / questions.length) * 100}%` }}
                  ></div>
                </div>
                <p className="text-sm text-gray-500">
                  {Math.round((score / questions.length) * 100)}% de compatibilidade
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 justify-center pt-4">
                <Button
                  onClick={resetQuiz}
                  variant="outline"
                  className="border-red-300 text-red-700 hover:bg-red-50"
                >
                  <RefreshCw className="mr-2 h-4 w-4" />
                  Jogar Novamente
                </Button>

                <Button
                  onClick={onComplete}
                  className="bg-gradient-to-r from-red-500 to-red-500 text-white hover:from-red-600 hover:to-red-600"
                >
                  Continuar
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {!showResult && (
          <div className="mt-6">
            <Button variant="ghost" onClick={onBack} className="text-red-700 hover:text-red-800 hover:bg-red-50">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Voltar
            </Button>
          </div>
        )}
      </Card>
    </motion.div>
  )
}

export default QuizSection
