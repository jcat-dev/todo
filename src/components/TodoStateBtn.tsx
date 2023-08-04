import { TodoType } from '../types/TodoType'
import '../styles/todoStateBtn.css'

interface Props {
  type: TodoType
  activeType: TodoType
  handleClick: () => void
}

const TodoStateBtn: React.FC<Props> = ({type, activeType, handleClick}) => {
  return (
    <button
      className={
        type === activeType
          ? 'todo-state-btn todo-state-btn--active'
          : 'todo-state-btn'
      }
      onClick={handleClick}
    >
      {
        type
      }
    </button>
  )
}

export default TodoStateBtn