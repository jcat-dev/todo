import TodoForm from './TodoForm'
import TodoList from './TodoList'
import bgDesktop from '../assets/images/bg-desktop-dark.jpg'
import iconSun from '../assets/images/icon-sun.svg'
import '../styles/todo.css'

const Todo: React.FC = () => {
  return (
    <div className='container' >
      <img 
        src={bgDesktop} 
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
    </div>
  )
}

export default Todo