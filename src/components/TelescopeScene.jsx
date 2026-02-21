import { useState, useEffect } from 'react'

// Import telescope image - Make sure to add telescope.jpg to src/assets/
// Using a path that Vite can resolve, with fallback handling
const telescopeImagePath = '/src/assets/telescope.png'

const TelescopeScene = ({ currentYear, setCurrentYear, onGlimpse, isZooming }) => {
  const [currentTime, setCurrentTime] = useState('present')
  const [pressedButton, setPressedButton] = useState(null)
  // Start with 100 to show present (2026) initially
  const [yearScrollPosition, setYearScrollPosition] = useState(0)

  const years = [1990, 2026, 2040]

  useEffect(() => {
    // Update scroll position based on current time
    // Each year takes 100% of the visible height (100px), so we scroll by 100% per year
    // translateY(-0%) = shows first year (1990)
    // translateY(-100%) = shows second year (2026) 
    // translateY(-200%) = shows third year (2040)
    if (currentTime === 'past') {
      setYearScrollPosition(0) // Show 1990 at top
      setCurrentYear(1990)
    } else if (currentTime === 'present') {
      setYearScrollPosition(100) // Show 2026 (middle year, scroll down 100%)
      setCurrentYear(2026)
    } else if (currentTime === 'future') {
      setYearScrollPosition(200) // Show 2040 (scroll down 200% to show last year)
      setCurrentYear(2040)
    }
  }, [currentTime, setCurrentYear])

  const handleTimeSelection = (time) => {
    if (isZooming) return
    
    setCurrentTime(time)
    setPressedButton(time)
    
    setTimeout(() => {
      setPressedButton(null)
    }, 200)
  }

  const handleKeyPress = (e) => {
    if (isZooming) return
    
    switch(e.key) {
      case '1':
        handleTimeSelection('past')
        break
      case '2':
        handleTimeSelection('present')
        break
      case '3':
        handleTimeSelection('future')
        break
      case 'Enter':
      case ' ':
        if (!isZooming) onGlimpse()
        break
    }
  }

  useEffect(() => {
    window.addEventListener('keydown', handleKeyPress)
    return () => window.removeEventListener('keydown', handleKeyPress)
  }, [isZooming])

  return (
    <div className="relative w-full h-full overflow-hidden bg-dark-blue">
      {/* Stars Background - z-0 (lowest layer) */}
      <div className="stars-background z-0"></div>
      
      {/* Floor - Slanted div box at bottom edge to edge - z-10 */}
      <div 
        className="absolute bottom-0 left-0 w-full h-[50%] z-10"
        style={{
          background: 'linear-gradient(to top, #1a1a1a 0%, #2a2a2a 50%, #4a4949 100%)',
          clipPath: 'polygon(30% 0%, 100% 0%, 100% 100%, 0% 100%)',
          boxShadow: '0 -4px 20px rgba(0, 0, 0, 0.5)',
        }}
      />
      
      {/* Main Title - z-30 */}
      <h1 className="absolute top-[5%] left-1/2 -translate-x-1/2 text-white text-center z-30 text-3xl md:text-4xl lg:text-5xl font-light tracking-wider">
        Glimpse of the future
      </h1>
      
      {/* Main Container - z-20 (above floor, below title/button) */}
      <div className="border-4 border-red-500 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8 w-[90%] max-w-6xl z-20">
        
        {/* Year Selector Box - Shows only one year at a time */}
        <div className="relative bg-medium-blue rounded-lg p-4 w-24 md:w-32 h-[100px] md:h-[120px] overflow-hidden shadow-lg">
          <div 
            className="absolute inset-0 flex flex-col transition-transform duration-600 ease-out"
            style={{ transform: `translateY(-${yearScrollPosition}%)` }}
          >
            {years.map((year) => (
              <div
                key={year}
                className="flex-shrink-0 flex items-center justify-center text-white font-bold text-xl md:text-2xl lg:text-3xl h-[100px] md:h-[120px]"
              >
                {year}
              </div>
            ))}
          </div>
        </div>
        
        {/* Telescope Wrapper */}
        <div 
          className={`border-4 border-blue-500 relative flex flex-col bottom-[10%] ${
            isZooming ? 'animate-telescope-zoom' : ''
          }`}
          style={{
            transformOrigin: 'center center',
            transition: isZooming ? 'none' : 'all 1s ease',
          }}
        >
          {/* Telescope Image with fallback */}
          <div className="relative border-4 border-red-500 w-[5%] md:w-64 lg:w-80 h-64 md:h-80">
            <img
              src={telescopeImagePath}
              alt="Telescope"
              className={`relative w-full h-full object-contain mix-blend-lighten transition-all duration-1000 ${
                isZooming ? 'scale-[15] translate-y-[40%]' : ''
              }`}
              style={{
                transformOrigin: 'center bottom',
              }}
              onError={(e) => {
                // Show placeholder instead of hiding
                e.target.style.display = 'none'
                const placeholder = e.target.nextElementSibling
                if (placeholder) {
                  placeholder.style.display = 'flex'
                }
                console.warn('Telescope image not found. Please add telescope.jpg to src/assets/')
              }}
            />
            {/* Fallback placeholder - visible when image fails to load */}
            <div 
              className="hidden w-full h-full bg-gradient-to-b from-light-blue/30 to-lighter-blue/30 border-2 border-light-blue rounded-lg flex flex-col items-center justify-center text-white text-sm"
              style={{ display: 'none' }}
            >
              <div className="text-center">
                <div className="text-2xl mb-2">🔭</div>
                <div>Telescope</div>
                <div className="text-xs mt-1 opacity-75">Add telescope.jpg to src/assets/</div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Time Controls - Horizontal Layout */}
        <div className="flex flex-row gap-4 md:gap-6 bg-medium-blue rounded-lg p-4 md:p-6 shadow-lg">
          {/* Past Button */}
          <div className="flex flex-col items-center gap-2">
            <label className="text-white text-xs md:text-sm font-medium uppercase tracking-wider">
              Past
            </label>
            <button
              onClick={() => handleTimeSelection('past')}
              className={`w-12 h-12 md:w-16 md:h-16 bg-dark-blue border-2 rounded-lg text-white text-xl md:text-2xl flex items-center justify-center transition-all duration-300 hover:bg-medium-blue hover:scale-105 ${
                currentTime === 'past' 
                  ? 'bg-light-blue border-lighter-blue shadow-[0_0_15px_rgba(107,163,209,0.5)]' 
                  : 'border-light-blue'
              } ${
                pressedButton === 'past' ? 'scale-95 bg-lighter-blue' : ''
              }`}
            >
              ←
            </button>
          </div>
          
          {/* Present Button */}
          <div className="flex flex-col items-center gap-2">
            <label className="text-white text-xs md:text-sm font-medium uppercase tracking-wider">
              Present
            </label>
            <button
              onClick={() => handleTimeSelection('present')}
              className={`w-12 h-12 md:w-16 md:h-16 bg-dark-blue border-2 rounded-lg text-white text-xl md:text-2xl flex items-center justify-center transition-all duration-300 hover:bg-medium-blue hover:scale-105 ${
                currentTime === 'present' 
                  ? 'bg-light-blue border-lighter-blue shadow-[0_0_15px_rgba(107,163,209,0.5)]' 
                  : 'border-light-blue'
              } ${
                pressedButton === 'present' ? 'scale-95 bg-lighter-blue' : ''
              }`}
            >
              ↑
            </button>
          </div>
          
          {/* Future Button */}
          <div className="flex flex-col items-center gap-2">
            <label className="text-white text-xs md:text-sm font-medium uppercase tracking-wider">
              Future
            </label>
            <button
              onClick={() => handleTimeSelection('future')}
              className={`w-12 h-12 md:w-16 md:h-16 bg-dark-blue border-2 rounded-lg text-white text-xl md:text-2xl flex items-center justify-center transition-all duration-300 hover:bg-medium-blue hover:scale-105 ${
                currentTime === 'future' 
                  ? 'bg-light-blue border-lighter-blue shadow-[0_0_15px_rgba(107,163,209,0.5)]' 
                  : 'border-light-blue'
              } ${
                pressedButton === 'future' ? 'scale-95 bg-lighter-blue' : ''
              }`}
            >
              →
            </button>
          </div>
        </div>
      </div>
      
      {/* Glimpse Button - z-30 (same as title) */}
      <button
        onClick={onGlimpse}
        disabled={isZooming}
        className="absolute bottom-[10%] left-3/4 -translate-x-1/2 bg-medium-blue border-2 border-light-blue rounded-lg px-6 md:px-10 py-3 md:py-4 text-white text-sm md:text-base lg:text-lg font-semibold uppercase tracking-wider cursor-pointer transition-all duration-300 z-30 shadow-lg hover:bg-light-blue hover:scale-105 hover:shadow-[0_6px_20px_rgba(107,163,209,0.4)] active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Take a glimpse
      </button>
    </div>
  )
}

export default TelescopeScene
