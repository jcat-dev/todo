import { useEffect, useState } from 'react'
import TodoForm from './TodoForm'
import TodoList from './TodoList'
import bgDesktopDark from '../assets/images/bg-desktop-dark.jpg'
import bgMobilDark from '../assets/images/bg-mobile-dark.jpg'
import iconSun from '../assets/images/icon-sun.svg'
import '../styles/todo.css'

const Todo: React.FC = () => {
  const [imgSrc, setImgSrc] = useState('')

  useEffect(() => {
    const handleWidth = () => {
      const width = window.innerWidth
  
      if (width <= 425 ) {
        return setImgSrc(bgMobilDark)
      }
  
      return setImgSrc(bgDesktopDark)
    }

    handleWidth()

    window.addEventListener('resize', handleWidth)

    return () => {
      window.removeEventListener('resize', handleWidth)
    }
  }, [])

  return (
    <main className='main' >
      <img 
        src={imgSrc} 
        alt="img background desktop" 
      />

      <div
        className='todo-container'
      >
        <h1
          className='todo-title'
        >
          TODO
            
          <button
            className='theme-btn'
          >
            <img 
              className=''
              src={iconSun} 
              alt="icon sun" 
            />
          </button>
        </h1> 
        
        <TodoForm />
        <TodoList />
      </div>
    </main>
  )
}

export default Todo