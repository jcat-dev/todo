import { useContext } from 'react'
import { ThemeContext } from '../contexts/ProviderLightTheme'
import { TodoContext } from '../contexts/ProviderTodo'
import TodoForm from './TodoForm'
import TodoList from './TodoList'
import TodoStatesBtns from './TodoStatesBtns'
import iconSun from '../assets/images/icon-sun.svg'
import iconMoon from '../assets/images/icon-moon.svg'
import Loading from './Loading'
import Button from './accessibility/Button'
import '../styles/todo.css'

const Todo: React.FC = () => {  
  const { 
    lightModeEnabled,
    toggleTheme
  } = useContext(ThemeContext)

  const {
    isLoading
  } = useContext(TodoContext)

  return (
    <main 
      className="main" 
    >                  
      <div
        className='todo-container'
      >
        <h1
          className='todo-title'
        >
          TODO   

          <Button
            className={'theme-btn'}
            ariaLabel={
              lightModeEnabled
                ? 'light mode'
                : 'dark mode'
            }
            type='button'
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
          </Button>
        </h1> 
        
        <TodoForm />
        <TodoList />
        <TodoStatesBtns />
        <Loading loading={isLoading} />  
      </div>      
    </main>
  )
}

export default Todo