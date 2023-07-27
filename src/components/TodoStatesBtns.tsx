import { useContext } from 'react'
import { TodoContext } from '../contexts/ProviderTodo'
import TodoStateBtn from './TodoStateBtn'
import '../styles/todoStatesBtns.css'

const TodoStatesBtns: React.FC = () => {
  const {
    todoList,
    selectedTodo,
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
          todoList.length > 6
            ? todoList.length - 6
            : 0 
        } items left
      </p>

      <div
        className='todo-states__btns'
      >
        <TodoStateBtn 
          activeType={selectedTodo}
          type={'all'}
          handleClick={getAllTodo}
        />

        <TodoStateBtn 
          activeType={selectedTodo}
          type={'active'}
          handleClick={getActiveTodo}
        />

        <TodoStateBtn 
          activeType={selectedTodo}
          type={'completed'}
          handleClick={getCompletedTodo}
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