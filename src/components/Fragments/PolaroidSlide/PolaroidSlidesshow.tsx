"use client"

import type React from "react"

import { useState, useEffect, useRef, useMemo } from "react"
import { motion } from "framer-motion"
import './polaroid-slideshow.css';
// import foto01 from './../../../assets/foto01.jpg'
import foto02 from './../../../assets/foto02.jpg'
import foto03 from './../../../assets/foto03.jpg'
import foto04 from './../../../assets/foto04.jpg'
import foto06 from './../../../assets/foto06.jpg'
import foto7 from './../../../assets/foto7.jpg'
import foto8 from './../../../assets/foto8.jpg'
import foto9 from './../../../assets/foto9.jpg'
import foto10 from './../../../assets/foto10.jpg'
import foto11 from './../../../assets/foto11.jpg'
import foto12 from './../../../assets/foto12.jpg'
import foto13 from './../../../assets/foto13.jpg'
import foto14 from './../../../assets/foto14.jpg'
import foto15 from './../../../assets/foto15.jpg'
import foto16 from './../../../assets/foto16.jpg'
import foto17 from './../../../assets/foto17.jpg'
import foto18 from './../../../assets/foto18.jpg'
import { Action } from "../../../App"

interface PolaroidSlideshowProps {
  action: Action
  setAction: (item: Action) => void
  setNext: (item: boolean) => void
  autoplaySpeed?: number // Velocidade de troca automática em ms
}

interface Photo {
  src: string
  caption: string
  rotation?: number // Rotação aleatória para efeito polaroid
}

const PolaroidSlideshow: React.FC<PolaroidSlideshowProps> = ({
  setNext,
  autoplaySpeed = 5000, // 5 segundos por padrão
}) => {
  // Vetor de fotos (substitua com suas próprias fotos)
  const photos: Photo[] = useMemo(() => [
    // {
    //   src: foto01,
    //   caption: "",
    //   rotation: getRandomRotation(),
    // },
    {
      src: foto02,
      caption: "",
      rotation: getRandomRotation(),
    },
        {
      src: foto03,
      caption: "",
      rotation: getRandomRotation(),
    },
        {
      src: foto04,
      caption: "",
      rotation: getRandomRotation(),
    },
        {
      src: foto06,
      caption: "",
      rotation: getRandomRotation(),
    },
        {
      src: foto7,
      caption: "",
      rotation: getRandomRotation(),
    },
        {
      src: foto8,
      caption: "",
      rotation: getRandomRotation(),
    },
        {
      src: foto9,
      caption: "",
      rotation: getRandomRotation(),
    },
        {
      src: foto10,
      caption: "",
      rotation: getRandomRotation(),
    },
        {
      src: foto11,
      caption: "",
      rotation: getRandomRotation(),
    },
        {
      src: foto12,
      caption: "",
      rotation: getRandomRotation(),
    },
        {
      src: foto13,
      caption: "",
      rotation: getRandomRotation(),
    },
        {
      src: foto14,
      caption: "",
      rotation: getRandomRotation(),
    },
            {
      src: foto15,
      caption: "",
      rotation: getRandomRotation(),
    },
            {
      src: foto16,
      caption: "",
      rotation: getRandomRotation(),
    },
            {
      src: foto17,
      caption: "",
      rotation: getRandomRotation(),
    },
    {
      src: foto18,
      caption: "",
      rotation: getRandomRotation(),
    },
    
  ], [])

  const [focusedIndex, setFocusedIndex] = useState(0)
  const [isAutoplay] = useState(true)
  const [isPaused, setIsPaused] = useState(false)
  const autoplayTimerRef = useRef<NodeJS.Timeout | null>(null)


  // Função para gerar uma rotação aleatória para o efeito polaroid
  function getRandomRotation(): number {
    return Math.random() * 10 - 5 // Entre -5 e 5 graus
  }

  // Função para calcular a posição das fotos de fundo
  const getBackgroundPosition = (index: number) => {
    const totalPhotos = photos.length
    const focusedPhotoIndex = focusedIndex

    // Calcular a distância relativa ao foto em foco
    let distance = index - focusedPhotoIndex

    // Ajustar para o loop circular
    if (distance > totalPhotos / 2) distance -= totalPhotos
    if (distance < -totalPhotos / 2) distance += totalPhotos

    // Normalizar a distância para um valor entre -1 e 1
    const normalizedDistance = distance / (totalPhotos / 2)

    // Calcular a posição X baseada na distância normalizada
    const x = normalizedDistance * 120 // Espaçamento horizontal

    // Calcular a posição Z (profundidade) baseada na distância absoluta
    const z = -Math.abs(normalizedDistance) * 100

    // Calcular a posição Y (altura) baseada na distância absoluta
    const y = Math.abs(normalizedDistance) * 30

    return { x, y, z }
  }

  // Configurar o autoplay
  useEffect(() => {
    if (isAutoplay && !isPaused) {
      autoplayTimerRef.current = setInterval(() => {
        setFocusedIndex((prevIndex) => (prevIndex + 1) % photos.length)
      }, autoplaySpeed)
    }

    return () => {
      if (autoplayTimerRef.current) {
        clearInterval(autoplayTimerRef.current)
      }
    }
  }, [isAutoplay, isPaused, autoplaySpeed, photos.length])


  useEffect(()=>{
    console.log(photos.length, focusedIndex)
    if(photos.length === focusedIndex + 1){
        setNext(true)
    }
  },[focusedIndex, photos, setNext])

  // Função para avançar manualmente para a próxima foto
  const nextPhoto = () => {
    setFocusedIndex((prevIndex) => (prevIndex + 1) % photos.length)

    // Pausar o autoplay temporariamente quando o usuário interage
    if (isAutoplay) {
      setIsPaused(true)
      if (autoplayTimerRef.current) {
        clearInterval(autoplayTimerRef.current)
      }

      // Retomar o autoplay após um tempo
      setTimeout(() => {
        setIsPaused(false)
      }, autoplaySpeed)
    }
  }

  return (
    <motion.div
      className="section polaroid-slideshow relative"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className=" w-full h-screen flex flex-col items-center justify-center overflow-hidden">
        <div className="polaroid-container relative w-full h-[70vh] perspective-100">
          {/* Renderizar todas as fotos */}
          {photos.map((photo, index) => {
            const isFocused = index === focusedIndex
            const position = getBackgroundPosition(index)

            return (
              <motion.div
                key={index}
                className={`polaroid-frame absolute left-1/2 top-1/2 ${
                  isFocused ? "z-30" : "z-" + (20 - Math.abs(index - focusedIndex))
                }`}
                initial={false}
                animate={{
                  x: isFocused ? "-50%" : `calc(-50% + ${position.x}px)`,
                  y: isFocused ? "-50%" : `calc(-50% + ${position.y}px)`,
                  scale: isFocused ? 1 : 0.6 - Math.abs(index - focusedIndex) * 0.1,
                  rotateY: isFocused ? 0 : position.x * 0.2,
                  rotateX: isFocused ? 0 : position.y * -0.1,
                  rotate: isFocused ? 0 : photo.rotation,
                  filter: isFocused ? "blur(0px)" : `blur(${Math.abs(index - focusedIndex) * 2}px)`,
                  opacity: isFocused ? 1 : 1 - Math.abs(index - focusedIndex) * 0.2,
                }}
                transition={{
                  type: "spring",
                  stiffness: 300,
                  damping: 30,
                  mass: 1,
                }}
                onClick={() => (isFocused ? nextPhoto() : setFocusedIndex(index))}
                whileHover={isFocused ? { scale: 1.02 } : {}}
                whileTap={isFocused ? { scale: 0.98 } : {}}
              >
                <div className="polaroid-inner">
                  <div className="polaroid-image-container">
                    <img src={photo.src || "/placeholder.svg"} alt={photo.caption} className="polaroid-image" />
                  </div>
                  <div className="polaroid-caption">
                    <p>{photo.caption}</p>
                  </div>
                </div>
              </motion.div>
            )
          })}

          {/* Indicadores de navegação */}
          <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 flex space-x-2 z-40">
            {photos.map((_, index) => (
              <motion.button
                key={index}
                className={`w-2 h-2 rounded-full ${index === focusedIndex ? "bg-[#C21807]" : "bg-gray-300"}`}
                onClick={() => setFocusedIndex(index)}
                whileHover={{ scale: 1.5 }}
                animate={index === focusedIndex ? { scale: [1, 1.3, 1] } : {}}
                transition={{ repeat: index === focusedIndex ? Number.POSITIVE_INFINITY : 0, duration: 1.5 }}
              />
            ))}
          </div>

        </div>
      </div>

    </motion.div>
  )
}

export default PolaroidSlideshow
