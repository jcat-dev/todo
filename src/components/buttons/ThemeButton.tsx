import { useEffect, useState } from 'react'
import { THEME_DARK_VALUE, THEME_KEY, THEME_LIGHT_VALUE } from '../../constants/THEME'
import Button from './Button'
import iconMoon from '../../assets/images/icon-moon.svg'
import iconSun from '../../assets/images/icon-sun.svg'
import styles from './styles/themeButton.module.css'

interface Props {
  className?: string
}

const ThemeButton: React.FC<Props> = ({className}) => {
  const [darkMode, setDarkMode] = useState<boolean>(true)

  useEffect(() => {  
    if (localStorage.getItem(THEME_KEY) === THEME_LIGHT_VALUE) {  
      setDarkMode(false)
      document.querySelector('body')?.setAttribute('data-theme', THEME_LIGHT_VALUE)
      return 
    }    

    localStorage.setItem(THEME_KEY, THEME_DARK_VALUE)
    document.querySelector('body')?.setAttribute('data-theme', THEME_DARK_VALUE)
  }, [])

  const toggleTheme = () => {
    if (darkMode) {
      localStorage.setItem(THEME_KEY, THEME_LIGHT_VALUE)
      document.querySelector('body')?.setAttribute('data-theme', THEME_LIGHT_VALUE)
    } else {      
      localStorage.setItem(THEME_KEY, THEME_DARK_VALUE)
      document.querySelector('body')?.setAttribute('data-theme', THEME_DARK_VALUE)
    }

    setDarkMode(!darkMode)
  }
  
  return (
    <Button
      className={`${styles['theme-btn']} ${className ?? ''}`}
      type='button'
      onClick={toggleTheme}
      ariaLabel={
        darkMode
          ? 'dark mode'
          : 'light mode'
      }
    >
      <img 
        className={styles['theme-btn__img']}
        alt= {'icon moon/sun'}
        src={
          darkMode
            ? iconSun
            : iconMoon
        }
      />
    </Button>
  )
}

export default ThemeButton