import { TodoType } from '../types/TodoType'
import '../styles/todoStateBtn.css'
import Button from './buttons/Button'

interface Props {
  type: TodoType
  activeType: TodoType
  handleClick: () => void
}

const TodoStateBtn: React.FC<Props> = ({type, activeType, handleClick}) => {
  return (
    <Button
      className={
        type === activeType
          ? 'todo-state-btn todo-state-btn--active'
          : 'todo-state-btn'
      }
      ariaLabel={`type of list todo ${type}`}
      type='button'
      onClick={handleClick}
    >
      {
        type
      }
    </Button>
  )
}

export default TodoStateBtn