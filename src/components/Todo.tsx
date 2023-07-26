import { useResizeWidth } from '../hooks/useResizeWidth'
import { useContext } from 'react'
import { ThemeContext } from '../contexts/ProviderLightTheme'
import TodoForm from './TodoForm'
import TodoList from './TodoList'
import TodoStatesBtns from './TodoStatesBtns'
import iconSun from '../assets/images/icon-sun.svg'
import iconMoon from '../assets/images/icon-moon.svg'
import '../styles/todo.css'

const Todo: React.FC = () => {
  const theme = useResizeWidth()
  
  const { 
    lightModeEnabled,
    toggleTheme
  } = useContext(ThemeContext)

  return (
    <main 
      className="main" 
    >
      <img 
        src={
          lightModeEnabled
            ? theme?.lightImg
            : theme?.darkImg
        } 
        alt="img background desktop/mobil" 
      />

      <div
        className='todo-container'
      >
        <h1
          className='todo-title'
        >
          TODO
            
          <button
            className={'theme-btn'}
            onClick={toggleTheme}
          >
            <img 
              src={
                lightModeEnabled
                  ? iconMoon
                  : iconSun
              } 
              alt= {'icon moon/sun'}
            />
          </button>
        </h1> 
        
        <TodoForm />
        <TodoList />
        <TodoStatesBtns />
      </div>
    </main>
  )
}

export default Todo