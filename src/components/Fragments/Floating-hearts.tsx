"use client"

import { useEffect, useRef } from "react"

interface FloatingHeartsProps {
  density?: number // Controla a quantidade de corações (1-100)
  speed?: number // Controla a velocidade (0.5-2)
  size?: number // Tamanho máximo dos corações (10-50)
  opacity?: number // Opacidade máxima (0.1-1)
  colorVariety?: "red" | "pink" | "mixed" // Variação de cores
  className?: string // Classes adicionais para o container
}

const FloatingHearts = ({
  density = 10,
  speed = 1,
  size = 20,
  opacity = 0.7,
  colorVariety = "mixed",
  className = "",
}: FloatingHeartsProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationRef = useRef<number>(null)

  // Normalizar valores para evitar problemas de performance
  const normalizedDensity = Math.min(100, Math.max(1, density))
  const normalizedSpeed = Math.min(2, Math.max(0.5, speed))
  const normalizedSize = Math.min(50, Math.max(10, size))
  const normalizedOpacity = Math.min(1, Math.max(0.1, opacity))

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Ajustar o canvas para o tamanho da janela
    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    
    resizeCanvas()
    window.addEventListener("resize", resizeCanvas)

    // Criar imagem de coração para melhor performance
    const heartImage = new Image()
    heartImage.src =
      "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%23ff6b81' width='24' height='24'%3E%3Cpath d='M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z'/%3E%3C/svg%3E"
    heartImage.crossOrigin = "anonymous"

    // Definir paletas de cores baseadas na preferência
    const colorPalettes = {
      red: [
        "rgba(255, 0, 0, opacity)",
        "rgba(220, 20, 60, opacity)",
        "rgba(178, 34, 34, opacity)",
        "rgba(255, 69, 0, opacity)",
        "rgba(139, 0, 0, opacity)",
      ],
      pink: [
        "rgba(255, 105, 180, opacity)",
        "rgba(255, 182, 193, opacity)",
        "rgba(255, 20, 147, opacity)",
        "rgba(219, 112, 147, opacity)",
        "rgba(255, 192, 203, opacity)",
      ],
      mixed: [
        "rgba(255, 0, 0, opacity)",
        "rgba(255, 105, 180, opacity)",
        "rgba(219, 112, 147, opacity)",
        "rgba(255, 20, 147, opacity)",
        "rgba(255, 182, 193, opacity)",
      ],
    }

    const selectedPalette = colorPalettes[colorVariety]

    class Heart {
      x: number | undefined
      y: number | undefined
      size: number | undefined
      speed: number | undefined
      color: string | undefined
      rotation: number | undefined
      rotationSpeed: number | undefined
      wobble: {
          amplitude: number
          frequency: number
          offset: number
      } | undefined

      constructor() {
        this.reset()
        // Iniciar em posição aleatória na tela para distribuição inicial
        if (canvas) {
          this.y = Math.random() * canvas.height
        } else {
          this.y = 0
        }
      }

      reset() {
        if(canvas){
            this.x = Math.random() * canvas.width
            this.y = canvas.height + Math.random() * 100
            this.size = Math.random() * normalizedSize + 10
            this.speed = (Math.random() * 2 + 0.5) * normalizedSpeed
            
            // Selecionar cor da paleta e aplicar opacidade
            const baseColor = selectedPalette[Math.floor(Math.random() * selectedPalette.length)]
            const actualOpacity = (Math.random() * 0.5 + 0.5) * normalizedOpacity
            this.color = baseColor.replace("opacity", actualOpacity.toString())
            
            this.rotation = Math.random() * 360
            this.rotationSpeed = (Math.random() - 0.5) * 2
            this.wobble = {
            amplitude: Math.random() * 2,
            frequency: Math.random() * 0.02 + 0.01,
            offset: Math.random() * 100,
            }
        }
        
      }

      draw(ctx: CanvasRenderingContext2D, heartImage: HTMLImageElement) {
        ctx.save()
        ctx.translate(this.x ?? 0, this.y ?? 0)
        ctx.rotate(((this.rotation ?? 0) * Math.PI) / 180)
        
        // Usar a imagem do coração como base
        const size = this.size ?? 20
        ctx.drawImage(heartImage, -size / 2, -size / 2, size, size)
        
        // Aplicar cor personalizada
        ctx.globalCompositeOperation = "source-atop"
        ctx.fillStyle = this.color ?? "rgba(255,0,0,0.7)"
        ctx.fillRect(-size / 2, -size / 2, size, size)
        ctx.globalCompositeOperation = "source-over"
        
        ctx.restore()
      }

      update(frame: number) {
        if (this.y !== undefined && this.speed !== undefined) {
          this.y -= this.speed
        }
        if (this.rotation !== undefined && this.rotationSpeed !== undefined) {
          this.rotation += this.rotationSpeed
        }

        // Adicionar movimento de oscilação
        if (
          this.x !== undefined &&
          this.wobble !== undefined &&
          typeof this.wobble.offset === "number" &&
          typeof this.wobble.frequency === "number" &&
          typeof this.wobble.amplitude === "number"
        ) {
          this.x += Math.sin((frame + this.wobble.offset) * this.wobble.frequency) * this.wobble.amplitude
        }

        // Reiniciar quando sair da tela
        if (this.y !== undefined && this.size !== undefined && this.y < -this.size) {
          this.reset()
        }
      }
    }

    // Esperar a imagem carregar antes de criar os corações
    heartImage.onload = () => {
      // Calcular número de corações baseado na densidade e tamanho da tela
      const screenArea = window.innerWidth * window.innerHeight
      const baseCount = Math.floor(normalizedDensity * (screenArea / 1000000) * 30)
      const maxHearts = Math.min(200, Math.max(10, baseCount)) // Limitar entre 10 e 200
      
      const hearts: Heart[] = []
      let frame = 0

      // Criar corações
      for (let i = 0; i < maxHearts; i++) {
        hearts.push(new Heart())
      }

      // Função de animação
      const animate = () => {
        frame++
        ctx.clearRect(0, 0, canvas.width, canvas.height)

        hearts.forEach((heart) => {
          heart.update(frame)
          heart.draw(ctx, heartImage)
        })

        animationRef.current = requestAnimationFrame(animate)
      }

      animate()
    }

    // Limpar ao desmontar
    return () => {
      window.removeEventListener("resize", resizeCanvas)
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [normalizedDensity, normalizedSpeed, normalizedSize, normalizedOpacity, colorVariety])

  return (
    <canvas
      ref={canvasRef}
      className={`fixed inset-0 pointer-events-none z-0 ${className}`}
      aria-hidden="true"
    />
  )
}

export default FloatingHearts
