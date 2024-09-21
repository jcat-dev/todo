import { DragDropContext, Draggable, DropResult, Droppable } from 'react-beautiful-dnd'
import { useTodoContext } from '../contexts/useTodoContext'
import { TodoWithID } from '../types/Todo'
import { toast } from 'react-toastify'
import { TOAST_ERROR_MSG } from '../constants/TOAST_MSG'
import iconCheck from '../assets/images/icon-check.svg'
import iconCross from '../assets/images/icon-cross.svg'
import Button from './buttons/Button'
import SkeletonTodo from './skeletons/SkeletonTodo'
import CircleShape from './shapes/CircleShape'
import SkeletonBox from './skeletons/SkeletonBox'
import styles from './styles/todoList.module.css'

const TodoList: React.FC = () => {
  const {
    todos,
    completeTodo,
    deleteTodoByID,
    sortTodoById,
    loadingTodo,
    loadingTodos
  } = useTodoContext()

  if (loadingTodos) {
    return (
      <SkeletonTodo />
    )
  }
  
  const handleDragAndDrop = (result: DropResult) => {
    const targetIndex = result.destination
    const currentIndex = result.source.index

    if (!targetIndex || currentIndex === targetIndex.index) return
    sortTodoById(result.draggableId, currentIndex, targetIndex.index)
  }

  const handleCompleteTodo = async (value: TodoWithID) => {
    const status = await completeTodo(value)
    if (!status) sendErrorMsg()
  }

  const handleDeleteByID = async (id: string) => {
    const status = await deleteTodoByID(id)
    if (!status) sendErrorMsg()
  }

  const sendErrorMsg = () => {
    toast.error(TOAST_ERROR_MSG)
  }

  return (
    <DragDropContext onDragEnd={(result) => handleDragAndDrop(result)} >
      <Droppable droppableId='todo' >
        {(provided) => (         
          <ul 
            className={styles['todo-list']}
            {...provided.droppableProps}
            ref={provided.innerRef}
          >
            {
              todos.map((value, index) => (
                <Draggable
                  draggableId={value._id}
                  index={index}
                  key={value._id}
                >
                  {(provided) => 
                    loadingTodo[value._id]
                      ? <SkeletonBox 
                        className={styles['test']}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        ref={provided.innerRef}
                        key={value._id}
                      />
                      : <li 
                        className={styles['todo-list__item']}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        ref={provided.innerRef}
                        key={value._id}
                      >             
                        <Button
                          type='button'     
                          onClick={() => handleCompleteTodo(value)}                                
                          className={
                            value.completed 
                              ? `${styles['item-button']} ${styles['item-button--bg-active']}`
                              : styles['item-button']                   
                          }    
                          ariaLabel={
                            value.completed 
                              ? 'completed todo'
                              : 'complete todo'
                          }
                        >
                          <CircleShape className={styles['circle']} >
                            <CircleShape
                              className={
                                value.completed
                                  ? `${styles['minor-circle']} ${styles['minor-circle--bg-active']}`
                                  : styles['minor-circle']
                              }
                            >
                              <img 
                                className={styles['minor-circle__img']}
                                hidden={!value.completed}
                                src={iconCheck} 
                                alt="icon check" 
                              />
                            </CircleShape>       
                          </CircleShape>                           
                        </Button>               
                  
                        <p className={
                          value.completed
                            ? `${styles['todo-list__item-text']} ${styles['todo-list__item-text--completed']}`
                            : styles['todo-list__item-text']
                        }>
                          {value.title}
                        </p>

                        <Button
                          className={styles['todo-list__item-delete']}
                          ariaLabel='delete todo'
                          onClick={() => handleDeleteByID(value._id)}
                          type='button'
                        >
                          <img 
                            className={styles['cross-icon']}
                            hidden
                            src={iconCross} 
                            alt="cross icon" 
                          />
                        </Button>                            
                      </li>
                  }
                </Draggable>
              ))}  
            {provided.placeholder}    
          </ul>
        )}
      </Droppable>
    </DragDropContext>
  )
}

export default TodoList