import { useTodoContext } from '../contexts/useTodoContext'
import { TODO_ACTIVE_VALUE, TODO_ALL_VALUE, TODO_COMPLETED_VALUE, TODO_TYPE_KEY } from '../constants/TODO_TYPE'
import Button from './buttons/Button'
import styles from './styles/todoButtons.module.css'

const TodoButtons: React.FC = () => {
  const todoType = localStorage.getItem(TODO_TYPE_KEY) ?? TODO_ALL_VALUE

  const {
    leftTodos,
    deleteAllTodoCompleted,
    getActiveTodo,
    getAllTodo,
    getCompletedTodo,
    getMoreTodo
  } = useTodoContext()

  return (    
    <div className={styles['todo-buttons']} >
      <Button 
        className={styles['number-button']} 
        ariaLabel='todo number button'
        type='button'
        onClick={getMoreTodo}
      >
        {leftTodos} items left
      </Button>

      <div className={styles['todo-buttons__buttons']} >
        <Button
          ariaLabel={'todo type button'}
          type='button'
          onClick={getAllTodo}
          className={
            todoType === TODO_ALL_VALUE
              ? `${styles['button']} ${styles['button--active']}`
              : styles['button']
          }
        >
          All
        </Button> 
        
        <Button
          ariaLabel={'todo type button'}
          type='button'
          onClick={getActiveTodo}
          className={
            todoType === TODO_ACTIVE_VALUE
              ? `${styles['button']} ${styles['button--active']}`
              : styles['button']
          }
        >
          Active
        </Button>  

        <Button
          ariaLabel={'todo type button'}
          type='button'
          onClick={getCompletedTodo}
          className={
            todoType === TODO_COMPLETED_VALUE
              ? `${styles['button']} ${styles['button--active']}`
              : styles['button']
          }
        >
          Completed
        </Button>
      </div> 

      <Button      
        className={styles['clear-button']}
        ariaLabel='clear completed todo'
        type='button'
        onClick={deleteAllTodoCompleted}
      >
        Clear Completed
      </Button>
    </div> 
  )
}

export default TodoButtons