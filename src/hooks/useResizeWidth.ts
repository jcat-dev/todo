import { useState, useEffect } from 'react'
import bgDesktopDark from '../assets/images/bg-desktop-dark.jpg'
import bgMobilDark from '../assets/images/bg-mobile-dark.jpg'
import bgDesktopLight from '../assets/images/bg-desktop-light.jpg'
import bgMobilLight from '../assets/images/bg-mobile-light.jpg'

interface Theme {
  darkImg: string
  lightImg: string 
}

export const useResizeWidth = () => {
  const [imgSrc, setImgSrc] = useState<Theme>()
  
  const handleWidth = () => {
    const width = window.innerWidth
    
    if (width <= 425 ) {
      return {
        darkImg: bgMobilDark,
        lightImg: bgMobilLight     
      }
    }
    
    return {
      darkImg: bgDesktopDark,
      lightImg: bgDesktopLight  
    }
  }
  
  useEffect(() => {    
    setImgSrc(handleWidth())
    
    window.addEventListener('resize', handleWidth)
    
    return () => {
      window.removeEventListener('resize', handleWidth)
    }
  }, [])

  return imgSrc
}
