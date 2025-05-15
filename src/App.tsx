import { useState } from 'react'
import './App.css'
import { AnimatePresence } from "framer-motion"
import EnhancedMusicPlayer from './components/EnhanceMusicPlayer'
import PolaroidSlideshow from './components/Fragments/PolaroidSlide/PolaroidSlidesshow'
import Navegacao from "../src/components/Navegacao"
import HomeAnimated from './components/Fragments/AnimatedBook/HomeAnimated'
import HeartRateAnimation from './components/Fragments/HeartLineAnimation'
import QuizHome from './components/Fragments/QuizSection/QuizHome'
import HomeFinalSection from './components/Fragments/FinalSection/HomeFinalSection'
import FloatingHearts from './components/Fragments/Floating-hearts'

export interface Action {
  isBack: boolean;
  isComplete: boolean;
  isNext: boolean;

  onComplete: () => void;
  onBack: () => void;
}

function App() {
  const [currentSection, setCurrentSection] = useState(0);

  const [next, setNext] = useState(false);

  const nextSection = () => {
    if (currentSection < 3) {
      setCurrentSection(currentSection + 1)
    }
  }
  
  const prevSection = () => {
    if (currentSection > 0) {
      setCurrentSection(currentSection - 1)
    }
  }

  const homeSection = () =>{
    setCurrentSection(0)
  }
  
  const [action, setAction] = useState<Action>({
    isBack: false,
    isComplete: false,
    isNext: false,
    onComplete: () => nextSection(),
    onBack: () => prevSection()
  });

  return (
    <div className="relative bg-gradient-to-b from-pink-100 to-red-100">

      <EnhancedMusicPlayer initialVolume={30} autoplay={true} />

      <HeartRateAnimation className="absolute left-0 md:-top-30 top-7 w-full h-auto md:scale-30" />

      <FloatingHearts density={5} colorVariety="mixed" />

      <AnimatePresence mode="wait">

        {currentSection === 0 && <PolaroidSlideshow key="photos" action={action} setAction={setAction}  autoplaySpeed={6000} setNext={setNext} /> }

        {currentSection === 1 && <HomeAnimated setNext={setNext} onComplete={nextSection} />}

        {currentSection === 2 && <QuizHome setNext={setNext} onComplete={nextSection}  />}

        {currentSection === 3 && <HomeFinalSection key="final" homeSection={homeSection} setNext={setNext} />}

      </AnimatePresence>      

      <Navegacao action={action} setAction={setAction} next={next} onComplete={nextSection}/>

      {/* <ValentineHeartAnimation className="absolute -bottom-15 right-35 -rotate-20 scale-40 md:scale-100 md:right-30 md:top-1/3 md:rotate-30 hidden md:block" />
      <ValentineHeartAnimation className="absolute left-30 top-1/3 -rotate-30 hidden md:block"/> */}

    </div>
  )
}

export default App
