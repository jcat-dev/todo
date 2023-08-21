import { useContext } from 'react'
import { TodoContext } from '../contexts/ProviderTodo'
import { TodoType } from '../types/TodoType'
import TodoStateBtn from './TodoStateBtn'
import localStorageType from '../utils/localStorageType'
import '../styles/todoStatesBtns.css'
import Button from './accessibility/Button'

const TodoStatesBtns: React.FC = () => {
  const todoType = localStorageType.getItem<TodoType>('todoType') ?? 'all'
  const {
    filteredTodo,
    deleteAllTodoCompleted,
    getActiveTodo,
    getAllTodo,
    getCompletedTodo
  } = useContext(TodoContext)

  return (    
    <div
      className='todo-states'
    >
      <p
        className='todo-states__count'
      >
        {
          filteredTodo.length > 6
            ? filteredTodo.length - 6
            : 0 
        } items left
      </p>

      <div
        className='todo-states__btns'
      >
        <TodoStateBtn 
          activeType={todoType}
          type={'all'}
          handleClick={getAllTodo}
        />

        <TodoStateBtn 
          activeType={todoType}
          type={'active'}
          handleClick={getActiveTodo}
        />

        <TodoStateBtn 
          activeType={todoType}
          type={'completed'}
          handleClick={getCompletedTodo}
        />     
      </div> 

      <Button      
        className='todo-states__clear-btn'
        ariaLabel='clear completed todo'
        type='button'
        onClick={deleteAllTodoCompleted}
      >
        Clear Completed
      </Button>
    </div> 
  )
}

export default TodoStatesBtns