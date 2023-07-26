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
    if (lightModeEnabled) {
      return document.querySelector('body')?.setAttribute('data-theme', 'light')
    }

    return document.querySelector('body')?.setAttribute('data-theme', 'dark')
  }, [lightModeEnabled])

  const toggleTheme = () => {
    setLightModeEnabled(!lightModeEnabled)
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