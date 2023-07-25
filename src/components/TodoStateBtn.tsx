import { BtnType } from '../types/BtnType'
import '../styles/todoStateBtn.css'

interface Props {
  type: BtnType
  activeType: BtnType
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