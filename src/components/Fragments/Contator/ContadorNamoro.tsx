"use client"

import { useState, useEffect } from "react"
import {
  Heart,
  Calendar,
  Clock,
  Sun,
  MessageCircle,
  Film,
  Coffee,
  Star,
  Moon,
  Sparkles,
  Gift,
  Camera,
  Music,
  Home,
  Flame,
} from "lucide-react"
import { CountUp } from "../../ui/CountUp"
import { motion } from "framer-motion"

interface TimeData {
  years: number
  months: number
  days: number
  hours: number
  minutes: number
  seconds: number
}

interface LoveCounterProps {
  startDate?: string
  partnerName?: string
}

export default function LoveCounter({ startDate = "2022-10-08" }: LoveCounterProps) {
  const [timeData, setTimeData] = useState<TimeData>({
    years: 0,
    months: 0,
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  })

  const calculateTimeDifference = () => {
    const start = new Date(startDate)
    const now = new Date()

    let years = now.getFullYear() - start.getFullYear()
    let months = now.getMonth() - start.getMonth()

    if (months < 0) {
      years--
      months += 12
    }

    if (now.getDate() < start.getDate()) {
      months--
      if (months < 0) {
        years--
        months += 12
      }
    }

    const lastMonthDate = new Date(now.getFullYear(), now.getMonth(), start.getDate())
    if (lastMonthDate > now) {
      lastMonthDate.setMonth(lastMonthDate.getMonth() - 1)
    }

    const daysDiff = Math.floor((now.getTime() - lastMonthDate.getTime()) / (1000 * 60 * 60 * 24))
    const hours = now.getHours()
    const minutes = now.getMinutes()
    const seconds = now.getSeconds()

    return {
      years,
      months,
      days: daysDiff,
      hours,
      minutes,
      seconds,
    }
  }

  useEffect(() => {
    setTimeData(calculateTimeDifference())
    const interval = setInterval(() => {
      setTimeData(calculateTimeDifference())
    }, 1000)
    return () => clearInterval(interval)
  }, [startDate])

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    })
  }

  const timeUnits = [
    { value: timeData.years, label: "Anos", gradient: "from-pink-500 via-red-500 to-yellow-500" },
    { value: timeData.months, label: "Meses", gradient: "from-purple-500 via-pink-500 to-red-500" },
    { value: timeData.days, label: "Dias", gradient: "from-blue-500 via-purple-500 to-pink-500" },
    { value: timeData.hours, label: "Horas", gradient: "from-green-500 via-blue-500 to-purple-500" },
    { value: timeData.minutes, label: "Minutos", gradient: "from-yellow-500 via-green-500 to-blue-500" },
    { value: timeData.seconds, label: "Segundos", gradient: "from-red-500 via-yellow-500 to-green-500" },
  ]

  const now = new Date()
  const start = new Date(startDate)
  const diffInMs = now.getTime() - start.getTime()
  const totalDias = Math.floor(diffInMs / (1000 * 60 * 60 * 24))
  const totalHoras = Math.floor(diffInMs / (1000 * 60 * 60))
  const totalMinutos = Math.floor(diffInMs / (1000 * 60))
  const totalSemanas = Math.floor(totalDias / 7)
  const totalMeses = Math.floor(totalDias / 30.44)

  const statistics = [
    {
      icon: Calendar,
      value: totalDias,
      label: "Dias Totais",
      gradient: "from-pink-100 to-red-100",
      textGradient: "from-pink-600 to-red-600",
      iconColor: "text-red-500",
    },
    {
      icon: Clock,
      value: totalHoras,
      label: "Horas Totais",
      gradient: "from-purple-100 to-pink-100",
      textGradient: "from-purple-600 to-pink-600",
      iconColor: "text-purple-500",
    },
    {
      icon: Sun,
      value: Math.floor(totalDias / 91.25),
      label: "Estações Juntos",
      gradient: "from-yellow-100 to-orange-100",
      textGradient: "from-yellow-600 to-orange-600",
      iconColor: "text-yellow-500",
    },
    {
      icon: Heart,
      value: totalMinutos * 80,
      label: "Batimentos Cardíacos",
      gradient: "from-red-100 to-pink-100",
      textGradient: "from-red-600 to-pink-600",
      iconColor: "text-red-500",
    },
    {
      icon: Sparkles,
      value: totalDias * 3,
      label: "Beijos Estimados",
      gradient: "from-pink-100 to-rose-100",
      textGradient: "from-pink-600 to-rose-600",
      iconColor: "text-pink-500",
    },
    {
      icon: MessageCircle,
      value: totalDias * 3,
      label: '"Eu te amo"s',
      gradient: "from-purple-100 to-indigo-100",
      textGradient: "from-purple-600 to-indigo-600",
      iconColor: "text-purple-500",
    },
    {
      icon: Film,
      value: totalSemanas * 2,
      label: "Filmes/Séries",
      gradient: "from-blue-100 to-cyan-100",
      textGradient: "from-blue-600 to-cyan-600",
      iconColor: "text-blue-500",
    },
    {
      icon: Coffee,
      value: totalSemanas * 4,
      label: "Cafés Juntos",
      gradient: "from-amber-100 to-yellow-100",
      textGradient: "from-amber-600 to-yellow-600",
      iconColor: "text-amber-600",
    },
    {
      icon: Moon,
      value: totalSemanas * 3,
      label: "Noites Dormindo Juntos",
      gradient: "from-indigo-100 to-purple-100",
      textGradient: "from-indigo-600 to-purple-600",
      iconColor: "text-indigo-500",
    },
    {
      icon: Gift,
      value: Math.floor(totalMeses / 2),
      label: "Presentes Trocados",
      gradient: "from-emerald-100 to-green-100",
      textGradient: "from-emerald-600 to-green-600",
      iconColor: "text-emerald-500",
    },
    {
      icon: Camera,
      value: totalDias * 1.3,
      label: "Fotos Juntos",
      gradient: "from-slate-100 to-gray-100",
      textGradient: "from-slate-600 to-gray-600",
      iconColor: "text-slate-500",
    },
    {
      icon: Music,
      value: totalHoras * 2,
      label: "Horas Músicas Ouvidas",
      gradient: "from-violet-100 to-purple-100",
      textGradient: "from-violet-600 to-purple-600",
      iconColor: "text-violet-500",
    },
    {
      icon: Flame,
      value: Math.floor(totalSemanas * 1.2),
      label: "Transas",
      gradient: "from-orange-100 to-red-100",
      textGradient: "from-orange-500 to-orange-600",
      iconColor: "text-orange-600",
    },
    {
      icon: Home,
      value: totalSemanas * 1.5,
      label: "Jantares em Casa",
      gradient: "from-fuchsia-100 to-red-100",
      textGradient: "from-fuchsia-600 to-red-600",
      iconColor: "text-fuchsia-500",
    },
    {
      icon: Star,
      value: "∞",
      label: "Momentos Especiais",
      gradient: "from-yellow-100 to-amber-100",
      textGradient: "from-yellow-600 to-amber-600",
      iconColor: "text-yellow-500",
    },
  ]

  return (
    <motion.div
      className="section polaroid-slideshow relative min-h-screen"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      {/* Floating Hearts Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-pink-300/15"
            initial={{
              x: Math.random() * (typeof window !== "undefined" ? window.innerWidth : 1200),
              y: (typeof window !== "undefined" ? window.innerHeight : 800) + 100,
              rotate: 0,
            }}
            animate={{
              y: -100,
              rotate: 360,
              x: Math.random() * (typeof window !== "undefined" ? window.innerWidth : 1200),
            }}
            transition={{
              duration: Math.random() * 15 + 15,
              repeat: Number.POSITIVE_INFINITY,
              ease: "linear",
              delay: Math.random() * 10,
            }}
          >
            <Heart className="w-4 h-4" />
          </motion.div>
        ))}
      </div>

      <div className="w-full min-h-screen flex flex-col items-center justify-center relative ">
        <motion.div
          className=" mx-auto p-8 md:py-12  "
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          {/* Header */}
          <motion.div
            className="text-center mb-12"
            initial={{ y: -30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.6 }}
          >
            <div className="flex items-center justify-center gap-3 mb-6">
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
              >
                <Heart className="w-12 h-12 text-red-500 drop-shadow-lg" />
              </motion.div>
              {/* <h1 className="text-4xl md:text-6xl font-black bg-gradient-to-r from-pink-600 via-red-500 to-purple-600 bg-clip-text text-transparent drop-shadow-sm">
                Nosso Amor em Números
              </h1> */}
              <motion.p
                className="text-gray-800 text-xl md:text-2xl font-bold mx-20"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8, duration: 0.6 }}
              >
                Desde{" "}
                <span className="bg-gradient-to-r from-red-500 to-pink-500 bg-clip-text text-transparent">
                  {formatDate(startDate)}
                </span>
              </motion.p>
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, delay: 1 }}
              >
                <Heart className="w-12 h-12 text-red-500 drop-shadow-lg" />
              </motion.div>
            </div>
            {/* <motion.p
              className="text-gray-800 text-xl md:text-2xl font-bold"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.6 }}
            >
              Desde{" "}
              <span className="bg-gradient-to-r from-red-500 to-pink-500 bg-clip-text text-transparent">
                {formatDate(startDate)}
              </span>
            </motion.p> */}


          </motion.div>

          {/* Contador Principal */}
          <motion.div
            className="flex flex-wrap justify-center items-center gap-3 md:gap-6 mb-16"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0 }}
          >
            {timeUnits.map((unit, index) => (
              <motion.div
                key={unit.label}
                className="flex flex-col items-center group"
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.05, y: -5 }}
              >
                <div className="text-3xl md:text-4xl font-black bg-gradient-to-r from-red-500 via-pink-600 to-red-400 bg-clip-text text-transparent mb-2 drop-shadow-sm group-hover:drop-shadow-md transition-all duration-300">
                  <CountUp
                    from={unit.label === "Segundos" ? unit.value : 0}
                    to={unit.value}
                    duration={unit.label === "Segundos" ? 0.5 : 3}
                  />
                </div>
                <div className="text-sm md:text-base font-bold text-gray-700 uppercase tracking-wider bg-white/50 px-3 py-1 rounded-full">
                  {unit.label}
                </div>
                
              </motion.div>
              
            ))}
          </motion.div>

           <motion.div
            className="flex flex-wrap justify-center items-center gap-3 md:gap-6 mb-16"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0 }}
          >
            <motion.p
              className="text-gray-800 text-xl md:text-xl font-semibold mx-20"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.6 }}
            >
              Estatisticas do nosso relacionamento
            </motion.p>

          </motion.div>

          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            {statistics.map((stat, index) => (
              <motion.div
                key={stat.label}
                className={`bg-gradient-to-br ${stat.gradient} rounded-2xl p-6 shadow-lg border border-white/50 hover:shadow-xl transition-all duration-300 group`}
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 1 + index * 0.1, duration: 0.4 }}
                whileHover={{ scale: 1.02, y: -2 }}
              >
                <div className="flex flex-col items-center text-center space-y-3">
                  <motion.div
                    className={`${stat.iconColor} group-hover:scale-110 transition-transform duration-300`}
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                  >
                    <stat.icon className="w-8 h-8" />
                  </motion.div>
                  <div
                    className={`text-3xl font-black bg-gradient-to-r ${stat.textGradient} bg-clip-text text-transparent`}
                  >
                    {typeof stat.value === "number" ? <CountUp from={0} to={stat.value} duration={index*0.5} /> : stat.value}
                  </div>
                  <div className="text-xs font-bold text-gray-700 uppercase tracking-wide leading-tight">
                    {stat.label}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  )
}
