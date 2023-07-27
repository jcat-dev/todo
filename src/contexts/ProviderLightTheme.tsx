import { createContext, useState, useEffect } from 'react'

interface Props {
  children: React.ReactNode
}

interface LightTheme {
  lightModeEnabled: boolean
  toggleTheme: () => void
}

export const ThemeContext = createContext<LightTheme>({
  lightModeEnabled: true,
  toggleTheme: () => {}
})

const ProviderLightTheme:React.FC<Props> = ({children}) => {
  const [lightModeEnabled, setLightModeEnabled] = useState<boolean>(false)

  useEffect(() => {
    if (localStorage.getItem('light-mode') === 'true') {  
      setLightModeEnabled(true)
      document.querySelector('body')?.setAttribute('data-theme', 'light')
      return 
    }    

    document.querySelector('body')?.setAttribute('data-theme', 'dark')
  }, [])

  const setTheme = (value: boolean) => {
    if (value) {
      localStorage.setItem('light-mode', 'true')
      document.querySelector('body')?.setAttribute('data-theme', 'light')
      return 
    }

    localStorage.setItem('light-mode', 'false')
    document.querySelector('body')?.setAttribute('data-theme', 'dark')
  }
  
  const toggleTheme = () => {
    const newValue = !lightModeEnabled

    setTheme(newValue)
    setLightModeEnabled(newValue)
  }

  return(
    <ThemeContext.Provider
      value={{
        lightModeEnabled,
        toggleTheme
      }}
    >
      {
        children
      }
    </ThemeContext.Provider>
  )
}

export default ProviderLightTheme