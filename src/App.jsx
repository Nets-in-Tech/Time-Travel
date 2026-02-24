import { useState } from 'react'
import TelescopeScene from './components/TelescopeScene'
import CircularScene from './components/CircularScene'

function App() {
  const [currentScene, setCurrentScene] = useState('telescope')
  const [currentYear, setCurrentYear] = useState("21th C.")
  const [isZooming, setIsZooming] = useState(false)

  const handleGlimpse = () => {
    setIsZooming(true)
    setTimeout(() => {
      setCurrentScene('circular')
      setIsZooming(false)
    }, 2000)
  }

  const handleOffGlimpse = () => {
    setCurrentScene('telescope')
  }

  return (
    <>
      {currentScene === 'telescope' && (
        <TelescopeScene
          currentYear={currentYear}
          setCurrentYear={setCurrentYear}
          onGlimpse={handleGlimpse}
          isZooming={isZooming}
        />
      )}
      {currentScene === 'circular' && (
        <CircularScene
          currentYear={currentYear}
          setCurrentYear={setCurrentYear}
          onOffGlimpse={handleOffGlimpse}
        />
      )}
    </>
  )
}

export default App
