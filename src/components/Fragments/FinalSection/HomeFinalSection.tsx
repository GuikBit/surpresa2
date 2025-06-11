"use client"

import FinalSection from "./FinalSection"

export default function HomeFinalSection({homeSection, setNext}) {


  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-4 pt-30 md:pt-20 pb-50 ">
      
        <FinalSection
          onBack={homeSection}
          setNext={setNext}
        />
      
    </main>
  )
}
