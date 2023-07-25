import { useContext, useState } from 'react'
import { TodoContext } from '../contexts/ProviderTodo'
import TodoStateBtn from './TodoStateBtn'
import { BtnType } from '../types/BtnType'
import '../styles/todoStatesBtns.css'

const TodoStatesBtns: React.FC = () => {
  const [isActive, setIsActive] = useState<BtnType>('all')

  const {
    todoList,
    deleteAllTodoCompleted,
    getActiveTodo,
    getAllTodo,
    getCompletedTodo
  } = useContext(TodoContext)

  const handleStateBtn = (type: BtnType) => {
    if (type === 'active') {
      setIsActive('active')
      getActiveTodo()
    }

    if (type === 'all') {
      setIsActive('all')
      getAllTodo()
    }

    if (type === 'completed') {
      setIsActive('completed')
      getCompletedTodo()
    }
  }

  return (    
    <div
      className='todo-states'
    >
      <p
        className='todo-states__count'
      >
        {
          todoList.length >= 5
            ? todoList.length - 5
            : 0 
        } items left
      </p>

      <div
        className='todo-states__btns'
      >
        <TodoStateBtn 
          activeType={isActive}
          type={'all'}
          handleClick={() => handleStateBtn('all')}
        />

        <TodoStateBtn 
          activeType={isActive}
          type={'active'}
          handleClick={() => handleStateBtn('active')}
        />

        <TodoStateBtn 
          activeType={isActive}
          type={'completed'}
          handleClick={() => handleStateBtn('completed')}
        />     
      </div> 

      <button
        className='todo-states__clear-btn'
        onClick={deleteAllTodoCompleted}
      >
        Clear Completed
      </button>
    </div> 
  )
}

export default TodoStatesBtns