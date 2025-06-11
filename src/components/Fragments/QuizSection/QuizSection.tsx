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
    question: "Qual foi o primeiro filme que assistimos juntos?",
    options: [
      "O amor esquecido",
      "Depois do universo",
      "Por lugares incríveis",
      "Frangoelho",
    ],
    correctAnswer: 4,
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    question: "Em que dia começamos a namorar?",
    options: [
      "Dia 03 de setembro de 2022",
      "Dia 08 de outubro de 2022",
      "Dia 28 de agosto de 2022",
      "Dia 05 de setembro de 2022",
    ],
    correctAnswer: 2,
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    question: "Quem demorou mais para dar o primeiro beijo?",
    options: [
      "Ele",
      "Ela",
      "Os dois, era complicado",
      "Não demorou, foi no momento certo",
    ],
    correctAnswer: 4,
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    question: "Qual música mais te lembra de nós?",
    options: [
      "De 0 a 10, Melin",
      "Fica, Anavitória",
      "Outra vida, Armandinho",
      "Todas as músicas me lembram você. Escolher apenas uma seria limitar o quanto você inspira cada verso, cada melodia. Seria como tentar resumir o amor por você em uma única nota.",
    ],
    correctAnswer: 4,
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    question: "Qual é a minha cor favorita?(Dele)",
    options: [
      "Amarelo",
      "Vermelho",
      "Azul",
      "Verde",
    ],
    correctAnswer: 2,
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    question: "Qual é a minha comida favorita?",
    options: [
      "Arroz, feijão, batata morrena, carne de palena e batata frita",
      "A morena",
      "Arroz, feijão, lasanha, salada e batata frita",
      "Todas as opções acima",
    ],
    correctAnswer: 4,
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    question: "Quem manda mais memes durante o dia?",
    options: [
      "Ele",
      "Ela",
      "Os dois",
      "Não enviamos memes",
    ],
    correctAnswer: 2,
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    question: "Quem ronca mais?",
    options: [
      "Ela",
      "Ela",
      "Ela",
      "Todas as opções acima",
    ],
    correctAnswer: 4,
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    question: "O que eu, Guilherme, mais amo em você?",
    options: [
      "Os seus olhos",
      "O seu sorriso, com as suas covinhas lindas",
      "A forma como você lida com a vida — seu discernimento, seu jeito único de me amar, o carinho que me dá todos os dias. É tudo isso junto, não dava pra separar, né?",
      "Seus peitos lindos (sendo sincero também 😂)",
    ],
    correctAnswer: 3,
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    question: "Qual é o nosso sonho juntos?",
    options: [
      "Construir o nosso lar, a nossa família",
      "Viajar o mundo, conhecer muitos outros lugares",
      "Envelhecer ao seu lado, compartilhando cada fase da vida",
      "Todas as opções acima, eu quero viver tudo com você!",
    ],
    correctAnswer: 4,
    image: "/placeholder.svg?height=200&width=300",
  },
];


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

  const handleAnswer = (index: any) => {
    setSelectedAnswer(index)
    setTimerActive(false)

    if (index + 1 === questions[currentQuestion].correctAnswer) {
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
  if (score <= 4) {
    return {
      title: "Hmm... precisamos conversar 😂",
      message: "Talvez tenha sido só um chute atrás do outro… Mas tudo bem, temos tempo pra aprender mais um sobre o outro! 💬",
      emoji: "🤔",
    };
  } else if (score <= 5) {
    return {
      title: "Estamos quase lá, hein!",
      message: "Você já sabe bastante coisa, mas ainda tem umas coisinhas que dá pra melhorar 😅 Vamos continuar nos descobrindo!",
      emoji: "😉",
    };
  } else if (score <= 8) {
    return {
      title: "Uau, você me conhece muito bem!",
      message: "Você acertou quase tudo! Isso só prova o quanto a gente se conecta. ❤️",
      emoji: "😍",
    };
  } else {
    return {
      title: "Perfeito! Você é a minha alma gêmea 💘",
      message: "Nosso amor é único e completo, não existe pessoa melhor no mundo para dividir a vida! 💞",
      emoji: "💘",
    };
  }
};

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
          {/* <p className="text-red-600 mt-2">Descubra o quanto vocês se conhecem!</p> */}
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
                          ? index + 1 === questions[currentQuestion].correctAnswer
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
