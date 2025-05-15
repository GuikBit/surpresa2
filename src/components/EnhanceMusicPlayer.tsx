"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Volume, Volume1, Volume2, VolumeOff } from 'lucide-react';

// Definindo a interface global para o YouTube API
declare global {
  interface Window {
    YT: any
    onYouTubeIframeAPIReady: () => void
  }
}

// Lista de músicas românticas do YouTube
const PLAYLIST = [
  {
    videoId: "450p7goxZqg", // Ed Sheeran - Perfect
    title: "Ed Sheeran - Perfect",
    artist: "Ed Sheeran",
  },
  {
    videoId: "rtOvBOTyX00", // John Legend - All of Me
    title: "All of Me",
    artist: "John Legend",
  },
  {
    videoId: "0yW7w8F2TVA", // Bruno Mars - Just The Way You Are
    title: "Just The Way You Are",
    artist: "Bruno Mars",
  },
  {
    videoId: "lp-EO5I60KA", // Ed Sheeran - Thinking Out Loud
    title: "Thinking Out Loud",
    artist: "Ed Sheeran",
  },
]

interface EnhancedMusicPlayerProps {
  initialVolume?: number
  autoplay?: boolean
}

const EnhancedMusicPlayer: React.FC<EnhancedMusicPlayerProps> = ({ initialVolume = 30, autoplay = true }) => {
  const playerRef = useRef<any>(null)
  const [volume, setVolume] = useState(initialVolume)
  const [isPlaying, setIsPlaying] = useState(autoplay)
  const [isControlsOpen, setIsControlsOpen] = useState(false)
  const [currentTrack, setCurrentTrack] = useState(0)
  const [trackInfo, setTrackInfo] = useState(PLAYLIST[0])
  const [isMuted, setIsMuted] = useState(false)
  const [previousVolume, setPreviousVolume] = useState(initialVolume)

  // Carregar a API do YouTube
  useEffect(() => {
    if (!document.getElementById("youtube-api-script")) {
      const tag = document.createElement("script")
      tag.src = "https://www.youtube.com/iframe_api"
      tag.id = "youtube-api-script"
      const firstScriptTag = document.getElementsByTagName("script")[0]
      firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag)
    }

    // Callback da API
    window.onYouTubeIframeAPIReady = initializePlayer

    return () => {
        delete (window as any).onYouTubeIframeAPIReady;
    }
  }, [])

  // Inicializar o player quando a API estiver pronta
  const initializePlayer = () => {
    if (window.YT && window.YT.Player) {
      playerRef.current = new window.YT.Player("yt-player", {
        height: "0",
        width: "0",
        videoId: PLAYLIST[currentTrack].videoId,
        playerVars: {
          autoplay: autoplay ? 1 : 0,
          controls: 0,
          disablekb: 1,
          fs: 0,
          iv_load_policy: 3,
          modestbranding: 1,
          rel: 0,
        },
        events: {
          onReady: onPlayerReady,
          onStateChange: onPlayerStateChange,
        },
      })
    }
  }

  // Quando o player estiver pronto
  const onPlayerReady = (event: any) => {
    event.target.setVolume(volume)
    if (autoplay) {
      event.target.playVideo()
    }
  }

  // Quando o estado do player mudar
  const onPlayerStateChange = (event: any) => {
    if (event.data === window.YT.PlayerState.ENDED) {
      playNextTrack()
    }
  }

  // Controle de volume
  const handleVolumeChange = (newVolume: number) => {
    setVolume(newVolume)
    if (playerRef.current && playerRef.current.setVolume) {
      playerRef.current.setVolume(newVolume)
      if (newVolume === 0) {
        setIsMuted(true)
      } else {
        setIsMuted(false)
      }
    }
  }

  // Alternar reprodução
  const togglePlay = () => {
    if (playerRef.current) {
      if (isPlaying) {
        playerRef.current.pauseVideo()
      } else {
        playerRef.current.playVideo()
      }
      setIsPlaying(!isPlaying)
    }
  }

  // Alternar mudo
  const toggleMute = () => {
    if (playerRef.current) {
      if (isMuted) {
        playerRef.current.setVolume(previousVolume)
        setVolume(previousVolume)
        setIsMuted(false)
      } else {
        setPreviousVolume(volume)
        playerRef.current.setVolume(0)
        setVolume(0)
        setIsMuted(true)
      }
    }
  }

  // Próxima faixa
  const playNextTrack = () => {
    const nextTrack = (currentTrack + 1) % PLAYLIST.length
    setCurrentTrack(nextTrack)
    setTrackInfo(PLAYLIST[nextTrack])
    if (playerRef.current && playerRef.current.loadVideoById) {
      playerRef.current.loadVideoById(PLAYLIST[nextTrack].videoId)
    }
  }

  // Faixa anterior
  const playPrevTrack = () => {
    const prevTrack = (currentTrack - 1 + PLAYLIST.length) % PLAYLIST.length
    setCurrentTrack(prevTrack)
    setTrackInfo(PLAYLIST[prevTrack])
    if (playerRef.current && playerRef.current.loadVideoById) {
      playerRef.current.loadVideoById(PLAYLIST[prevTrack].videoId)
    }
  }

  // Variantes de animação para o painel de controle
  const controlPanelVariants = {
    hidden: { opacity: 0, y: 100, scale: 0.8 },
    visible: { opacity: 1, y: 0, scale: 1, transition: { type: "spring", stiffness: 300, damping: 24 } },
    exit: { opacity: 0, y: 100, scale: 0.8, transition: { duration: 0.2 } },
  }

  // Variantes de animação para o botão flutuante
  const floatingButtonVariants = {
    rest: { scale: 1 },
    hover: { scale: 1.1, rotate: 5, transition: { duration: 0.3, type: "spring", stiffness: 400 } },
    tap: { scale: 0.9, rotate: 0 },
  }

  // Variantes de animação para o ícone de volume
  const volumeIconVariants = {
    animate: {
      scale: [1, 1.2, 1],
      transition: { repeat: isMuted ? 0 : Number.POSITIVE_INFINITY, repeatDelay: 2, duration: 0.5 },
    },
  }

  // Determinar qual ícone de volume mostrar
  const getVolumeIcon = () => {
    if (isMuted || volume === 0) {
      return (
        <VolumeOff size={20}  />
      )
    } else if (volume < 25) {
      return (
        <Volume size={20}  />
      )
    }else if (volume >= 25 && volume < 50) {
        return (
          <Volume1 size={20}  />
        )
      } else {
      return (
        <Volume2 size={20}  />
      )
    }
  }

  return (
    <>
      {/* Player invisível */}
      <div id="yt-player" />

      {/* Botão flutuante */}
      <motion.div
        className="fixed bottom-20 right-6 z-50"
        initial="rest"
        whileHover="hover"
        whileTap="tap"
        variants={floatingButtonVariants}
      >
        <motion.button
          className="bg-gradient-to-r from-[#C21807] to-[#FF637E]  rounded-full p-3 shadow-lg flex items-center justify-center"
          onClick={() => setIsControlsOpen(!isControlsOpen)}
          aria-label="Controle de música"
        >
          <motion.div variants={volumeIconVariants} animate="animate" >
            {getVolumeIcon()}
          </motion.div>
        </motion.button>
      </motion.div>

      {/* Painel de controle deslizante */}
      <AnimatePresence>
        {isControlsOpen && (
          <motion.div
            className="fixed bottom-35 right-6 bg-white rounded-xl shadow-2xl p-4 z-40 w-64"
            variants={controlPanelVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            {/* Informações da faixa */}
            <div className="mb-4 text-center">
              <h3 className="text-sm font-bold text-red-600 truncate">{trackInfo.title}</h3>
              <p className="text-xs text-black">{trackInfo.artist}</p>
            </div>

            {/* Controles de reprodução */}
            <div className="flex justify-between space-x-4 mb-4 px-4 ">
              <motion.button
                className="text-neutral-800 hover:text-red-500"
                onClick={playPrevTrack}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                aria-label="Faixa anterior"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </motion.button>

              <motion.button
                className="text-neutral-800 hover:text-red-500"
                onClick={togglePlay}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                aria-label={isPlaying ? "Pausar" : "Reproduzir"}
              >
                {isPlaying ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-8 w-8"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-8 w-8"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                )}
              </motion.button>

              <motion.button
                className="text-neutral-800 hover:text-red-500"
                onClick={playNextTrack}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                aria-label="Próxima faixa"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </motion.button>
            </div>

            {/* Controle de volume */}
            <div className="flex items-center space-x-2 px-4">
              <motion.button
                onClick={toggleMute}
                className="text-neutral-800 hover:text-red-500"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                aria-label={isMuted ? "Ativar som" : "Silenciar"}
              >
                {getVolumeIcon()}
              </motion.button>

              <div className="relative w-full h-2 bg-[#FFE2E2] rounded-full overflow-hidden">
                <motion.div
                  className="absolute top-0 left-0 h-full bg-gradient-to-r from-red-600 to-rose-400 rounded-full"
                  style={{ width: `${volume}%` }}
                  initial={{ width: 0 }}
                  animate={{ width: `${volume}%` }}
                  transition={{ duration: 0.2 }}
                />
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={volume}
                  onChange={(e) => handleVolumeChange(Number.parseInt(e.target.value))}
                  className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
                  aria-label="Controle de volume"
                />
              </div>
            </div>

            {/* Indicador de volume */}
            <div className="mt-2 text-xs text-center text-gray-500">Volume: {volume}%</div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default EnhancedMusicPlayer
