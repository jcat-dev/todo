import { ToastContainer } from 'react-toastify'
import TodoForm from './TodoForm'
import TodoList from './TodoList'
import ThemeButton from './buttons/ThemeButton'
import TodoButtons from './TodoButtons'
import styles from './styles/todo.module.css'
import 'react-toastify/dist/ReactToastify.css';

const Todo: React.FC = () => {  
  return (
    <main className={styles['main']} >                  
      <div className={styles['todo']} >
        <h1 className={styles['todo-title']} >
          NOTE

          <ThemeButton className={styles['todo-title__theme-button']} />
        </h1>       

        <TodoForm />

        <div className={styles['todo-box']}>
          <TodoList />
          <TodoButtons />
        </div>        
      </div>     

      <ToastContainer 
        position='bottom-right'
      />
    </main>
  )
}

export default Todo