import { useState, useEffect } from 'react'

const yearData = {
  1990: {
    slides: [
      {
        title: 'Industrial Revolution',
        description: 'Early automation systems begin transforming manufacturing',
        image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=400&h=300&fit=crop'
      },
      {
        title: 'Computer Networks',
        description: 'The foundation of modern connectivity is established',
        image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=400&h=300&fit=crop'
      },
      {
        title: 'Personal Computing',
        description: 'Computers become accessible to everyday users',
        image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=400&h=300&fit=crop'
      },
      {
        title: 'Digital Communication',
        description: 'New ways of connecting people across distances emerge',
        image: 'https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=400&h=300&fit=crop'
      }
    ]
  },
  2026: {
    slides: [
      {
        title: 'Smart Assistants',
        description: 'AI assistants help manage our daily tasks and decisions. (this place is to be filled more)',
        image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400&h=300&fit=crop'
      },
      {
        title: 'Autonomous Systems',
        description: 'Self-driving vehicles and automated services become common',
        image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop'
      },
      {
        title: 'Virtual Reality',
        description: 'Immersive experiences blur the line between digital and physical',
        image: 'https://images.unsplash.com/photo-1593508512255-86ab42a8e620?w=400&h=300&fit=crop'
      },
      {
        title: 'Quantum Computing',
        description: 'Breakthrough computing power opens new possibilities',
        image: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=400&h=300&fit=crop'
      }
    ]
  },
  2040: {
    slides: [
      {
        title: 'Neural Interfaces',
        description: 'Direct brain-computer interfaces enable new forms of interaction',
        image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400&h=300&fit=crop'
      },
      {
        title: 'Space Exploration',
        description: 'Humanity expands beyond Earth with advanced space technology',
        image: 'https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?w=400&h=300&fit=crop'
      },
      {
        title: 'Sustainable Tech',
        description: 'Clean energy and eco-friendly solutions dominate',
        image: 'https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?w=400&h=300&fit=crop'
      },
      {
        title: 'Global Connectivity',
        description: 'Instant communication connects every corner of the world',
        image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=400&h=300&fit=crop'
      }
    ]
  }
}

const CircularScene = ({ currentYear, setCurrentYear, onOffGlimpse }) => {
  const [currentSlide, setCurrentSlide] = useState(0)
  const slides = yearData[currentYear]?.slides || []

  const years = [1990, 2026, 2040]
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
    if (currentYear === 1990) return 'bg-gradient-to-br from-[#6b4423] to-[#8b6f47]'
    if (currentYear === 2026) return 'bg-gradient-to-br from-[#8b6f47] to-[#a6896b]'
    if (currentYear === 2040) return 'bg-gradient-to-br from-[#4a7ba7] to-[#6ba3d1]'
    return 'bg-brown-orange'
  }

  return (
    <div className="relative w-full h-full bg-dark-blue flex items-center justify-center p-4 md:p-8">
      {/* Navigation Labels */}
      <div className="absolute top-[5%] left-[5%] text-white text-base md:text-xl lg:text-2xl font-medium z-10 cursor-pointer hover:text-light-blue transition-colors" onClick={handleBackward}>
        Backward
      </div>
      <div className="absolute top-[5%] right-[5%] text-white text-base md:text-xl lg:text-2xl font-medium z-10 cursor-pointer hover:text-light-blue transition-colors" onClick={handleForward}>
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
        className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90vw] h-[90vw] md:w-[65vw] md:h-[65vw] lg:w-[80vw] lg:h-[80vw] rounded-full overflow-hidden transition-all duration-500 ${getYearBackgroundClass()}`}
        style={{
          boxShadow: 'inset 0 0 50px rgba(0,0,0,0.2)',
        }}
      >
        {/* Slides Container */}
        <div className="relative w-full h-full overflow-hidden">
          {slides.map((slide, index) => (
            <div
              key={index}
              className={`absolute flex flex-row gap-[5rem] items-center justify-center top-0 left-0 w-full h-full p-4 md:p-8 transition-all duration-500 ${
                index === currentSlide
                  ? 'opacity-100 translate-x-0'
                  : index < currentSlide
                  ? 'opacity-0 -translate-x-full'
                  : 'opacity-0 translate-x-full'
              }`}
            >
              <div className='border-4 border-blue-500 w-[40%]'>
              <h2 className="text-white text-2xl md:text-3xl lg:text-4xl font-bold mb-4 text-center">
                {slide.title}
              </h2>
              <p className="text-white text-sm md:text-base lg:text-lg text-center mb-6 max-w-[80%] leading-relaxed">
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
        <div className="absolute top-1/2 -translate-y-1/2 w-full flex justify-between px-4 pointer-events-none z-5">
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
        <div className="absolute bottom-[10%] left-1/2 -translate-x-1/2 flex gap-2 z-5">
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
        className="absolute bottom-[5%] right-[5%] bg-medium-blue border-2 border-light-blue rounded-lg px-4 md:px-6 py-2 md:py-3 text-white text-xs md:text-sm font-semibold uppercase tracking-wider cursor-pointer transition-all duration-300 z-10 shadow-lg hover:bg-light-blue hover:scale-105 hover:shadow-[0_6px_20px_rgba(107,163,209,0.4)] [writing-mode:vertical-rl]"
      >
        off the glimpse
      </button>
    </div>
  )
}

export default CircularScene
