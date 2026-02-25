import { useState, useEffect } from 'react'
import DNA from '../assets/dna.jpg';
import Robot from '../assets/robot.jpg';
import Solar from '../assets/solar.jpg';
import Space from '../assets/space.jpg';
import Nano from '../assets/nano.webp';
import Mind from '../assets/mind.webp';
import Spark from '../assets/spark.png';
import Industry from '../assets/industry.png';
import Film from '../assets/film.jpg';
import Phone from '../assets/phone.webp';


const yearData = {
  "19th C.": {
    slides: [
      {
        title: '1831 – Spark of Wonder',
        description: 'Michael Faraday’s electric demonstrations revealed invisible forces through sparks and glowing wires. Electricity felt magical, unseen yet powerful, captivating audiences and laying the foundation for the electrical age.',
        image: Spark
      },
      {
        title: '1851 – Palace of Progress',
        description: 'The Great Exhibition inside the Crystal Palace dazzled visitors with steam engines, telegraphs, and industrial marvels. It was a breathtaking showcase of human ingenuity, turning technology into spectacle and proof of unstoppable progress.',
        image: Industry
      },
      {
        title: '1876 – Voice Across the Void',
        description: 'Alexander Graham Bell’s telephone astonished crowds as voices traveled through wires. Communication across distance seemed miraculous, a new wonder that transformed human connection and felt like sorcery made real.',
        image: Phone
      },
      {
        title: '1895 – Shadows That Moved',
        description: 'The Lumière brothers’ first film screening mesmerized audiences with moving pictures projected on a screen. Life replayed visually was unprecedented, a new marvel that redefined entertainment and felt like capturing reality itself.',
        image: Film
      }
    ]
  },
  "21th C.": {
    slides: [
      {
        title: 'CRISPR Gene Editing (2012 onward)',
        description: 'Scientists developed CRISPR, a tool that can edit DNA with precision. It’s new, astonishing, and seen as rewriting life’s code—opening possibilities to cure genetic diseases, engineer crops, and even alter evolution itself.',
        image:DNA
      },
      {
        title: 'Night-Vision Solar Panels (2026)',
        description: 'New solar tech in 2026 captures infrared radiation, allowing panels to generate electricity even after sunset. It’s a surreal leap—energy from darkness, reshaping how we think about sustainability and power independence.',
        image: Solar
      },
      {
        title: 'China’s AI Surgical Robots (2025–2026)',
        description: 'Hospitals across China now use AI-powered surgical robots for complex procedures like breast surgery, joint replacements, and even revision hip and knee operations. These robots perform with millimeter-level precision, while human surgeons supervise. It’s not assistance—it’s delegation',
        image: Robot
      },
    ]
  },
  "22th C.": {
    slides: [
      {
        title: 'Molecular Nanotechnology',
        description: 'Future nanobots could operate inside the human body at the cellular level. They would repair tissues, destroy cancer cells, and even reverse aging processes. This technology would make medicine microscopic, turning treatment into precision engineering at the scale of atoms.',
        image: Nano
      },
      {
        title: 'Space-Based Solar Power',
        description: 'Massive solar arrays in orbit could beam energy back to Earth using microwaves or lasers. Unlike ground panels, they would collect sunlight 24/7, providing continuous clean power and potentially replacing terrestrial energy grids entirely.',
        image: Space
      },
      {
        title: 'Mind–Machine Integration',
        description: 'Brain–computer interfaces may evolve into seamless systems where thoughts directly control technology. People could share memories, communicate without speech, or extend consciousness into digital realms, blurring the line between biology and machine.',
        image: Mind
      },
    ]
  }
}

const CircularScene = ({ currentYear, setCurrentYear, onOffGlimpse }) => {
  const [currentSlide, setCurrentSlide] = useState(0)
  const slides = yearData[currentYear]?.slides || []

  const years = ["19th C.", "21th C.", "22th C."]
  const currentYearIndex = years.indexOf(currentYear)

  const handleForward = () => {
    if (currentYearIndex < years.length - 1) {
      setCurrentYear(years[currentYearIndex + 1])
      setCurrentSlide(0)
    }
  }

  const handleBackward = () => {
    if (currentYearIndex > 0) {
      setCurrentYear(years[currentYearIndex - 1])
      setCurrentSlide(0)
    }
  }

  const navigateSlide = (direction) => {
    const newIndex = currentSlide + direction
    if (newIndex >= 0 && newIndex < slides.length) {
      setCurrentSlide(newIndex)
    }
  }

  const goToSlide = (index) => {
    if (index >= 0 && index < slides.length) {
      setCurrentSlide(index)
    }
  }

  const handleKeyPress = (e) => {
    switch(e.key) {
      case 'ArrowLeft':
        navigateSlide(-1)
        break
      case 'ArrowRight':
        navigateSlide(1)
        break
      case 'Escape':
        onOffGlimpse()
        break
    }
  }

  useEffect(() => {
    window.addEventListener('keydown', handleKeyPress)
    return () => window.removeEventListener('keydown', handleKeyPress)
  }, [currentSlide, slides.length])

  const getYearBackgroundClass = () => {
    if (currentYear === "19th C.") return 'bg-gradient-to-br from-[#6b4423] to-[#8b6f47]'
    if (currentYear === "21th C.") return 'bg-gradient-to-br from-[#8b6f47] to-[#a6896b]'
    if (currentYear === "22th C.") return 'bg-gradient-to-br from-[#4a7ba7] to-[#6ba3d1]'
    return 'bg-brown-orange'
  }

  return (
    <div className="relative w-full h-full bg-dark-blue flex items-center justify-center p-4 md:p-8 overflow-hidden">
      {/* Navigation Labels */}
      <div className="absolute top-[5%] left-[3%] text-white text-base md:text-xl lg:text-2xl font-medium z-10 cursor-pointer hover:text-light-blue transition-colors" onClick={handleBackward}>
        Backward
      </div>
      <div className="absolute top-[5%] right-[3%] text-white text-base md:text-xl lg:text-2xl font-medium z-10 cursor-pointer hover:text-light-blue transition-colors" onClick={handleForward}>
        Forward
      </div>
      
      {/* Outer Circular Border - At screen edge */}
      <div 
        className={`absolute inset-0 overflow-hidden transition-all duration-500 bg-blue-300`}
        style={{
          clipPath: 'circle(55% at 50% 50%)',
        }}
      />
      
      {/* Inner Content Area - Smaller radius, creating more space for content */}
      <div 
        className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[75vh] w-[75vh] lg:w-[80vw] lg:h-[80vw] rounded-full overflow-hidden transition-all duration-500 ${getYearBackgroundClass()}`}
        style={{
          boxShadow: 'inset 0 0 50px rgba(0,0,0,0.2)',
        }}
      >
        {/* Slides Container */}
        <div className="relative w-full h-full overflow-hidden">
          {slides.map((slide, index) => (
            <div
              key={index}
              className={`absolute flex flex-col md:flex-row gap-[0.7rem] md:gap-[3rem] items-center justify-center top-0 left-0 w-full h-full p-4 md:p-8 transition-all duration-500 ${
                index === currentSlide
                  ? 'opacity-100 translate-x-0'
                  : index < currentSlide
                  ? 'opacity-0 -translate-x-full'
                  : 'opacity-0 translate-x-full'
              }`}
            >
              <div className='w-[40%]'>
              <h2 className="text-white text-2xl md:text-3xl lg:text-4xl font-bold mb-4 text-center">
                {slide.title}
              </h2>
              <p className="text-white text-sm md:text-base lg:text-lg mb-4 leading-relaxed">
                {slide.description}
              </p>
              </div>
              <img
                src={slide.image}
                alt={slide.title}
                className="border-4 border-blue-500 max-w-[30%] max-h-[30%] object-contain rounded-lg shadow-lg"
                onError={(e) => { e.target.style.display = 'none' }}
              />
            </div>
          ))}
        </div>
        
        {/* Slide Navigation Arrows */}
        <div className="absolute top-1/2 -translate-y-1/2 w-full flex justify-between px-24 md:px-4 pointer-events-none z-5">
          <button
            onClick={() => navigateSlide(-1)}
            className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-white/20 border-2 border-white/50 text-white text-2xl md:text-3xl flex items-center justify-center pointer-events-auto backdrop-blur-sm transition-all duration-300 hover:bg-white/30 hover:scale-110"
          >
            ‹
          </button>
          <button
            onClick={() => navigateSlide(1)}
            className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-white/20 border-2 border-white/50 text-white text-2xl md:text-3xl flex items-center justify-center pointer-events-auto backdrop-blur-sm transition-all duration-300 hover:bg-white/30 hover:scale-110"
          >
            ›
          </button>
        </div>
        
        {/* Slide Indicators */}
        <div className="absolute bottom-[10%] md:bottom-[20%] left-1/2 -translate-x-1/2 flex gap-2 z-5">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentSlide
                  ? 'bg-white scale-130'
                  : 'bg-white/40 hover:bg-white/60'
              }`}
            />
          ))}
        </div>
      </div>
      
      {/* Off Glimpse Button */}
      <button
        onClick={onOffGlimpse}
        className="absolute bottom-[5%] right-[3%] bg-medium-blue border-2 border-light-blue rounded-lg px-4 md:px-6 py-2 md:py-3 text-white text-xs md:text-sm font-semibold uppercase tracking-wider cursor-pointer transition-all duration-300 z-10 shadow-lg hover:bg-light-blue hover:scale-105 hover:shadow-[0_6px_20px_rgba(107,163,209,0.4)] [writing-mode:vertical-rl]"
      >
        off the glimpse
      </button>
    </div>
  )
}

export default CircularScene
