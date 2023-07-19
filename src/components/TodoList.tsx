import { TodoContext } from '../contexts/ProviderTodo'
import { useContext } from 'react'
import iconCheck from '../assets/images/icon-check.svg'
import iconCross from '../assets/images/icon-cross.svg'
import '../styles/todoList.css'

const TodoList: React.FC = () => {
  const {
    todoList,
    completeTodo,
    deleteTodoByID
  } = useContext(TodoContext)
  
  return (
    <ul 
      className='todo-list'
    >
      {
        todoList.map((value, index) => {
          if (index <= 5) 
            return (
              <li 
                key={value._id}
                className='todo-list__item'
              >                              
                <div
                  className={
                    value.completed
                      ? 'todo-list__item-completed todo-list__item-completed--bg-active'
                      : 'todo-list__item-completed'
                  }
                >
                  <button            
                    className={
                      value.completed 
                        ? 'completed-btn completed-btn--bg-active'
                        : 'completed-btn'                      
                    }         
                    onClick={() => completeTodo(value)}
                  >
                    <img 
                      hidden={!value.completed}
                      src={iconCheck} 
                      alt="icon check" 
                    />
                  </button>   
                </div>                     
                  
                <p 
                  className={
                    value.completed
                      ? 'todo-list__item-title todo-list__item-title--completed'
                      : 'todo-list__item-title'
                  }
                >
                  {value.title}
                </p>
                  
                <button 
                  className='todo-list__item-delete'
                  onClick={() => deleteTodoByID(value._id)}
                >
                  <img 
                    hidden
                    src={iconCross} 
                    alt="icon cross" 
                  />
                </button>                              
              </li>
            )
        })
      }      
    </ul>
  )
}

export default TodoList