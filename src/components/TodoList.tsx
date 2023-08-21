import { TodoContext } from '../contexts/ProviderTodo'
import { useContext } from 'react'
import { DragDropContext, Draggable, DropResult, Droppable } from 'react-beautiful-dnd'
import iconCheck from '../assets/images/icon-check.svg'
import iconCross from '../assets/images/icon-cross.svg'
import Button from './accessibility/Button'
import '../styles/todoList.css'

const TodoList: React.FC = () => {
  const {
    filteredTodo,
    completeTodo,
    deleteTodoByID,
    sortTodo
  } = useContext(TodoContext)
  
  const handleDragAndDrop = (result: DropResult) => {
    const currentIndex = result.source.index
    const targetIndex = result.destination

    if (!targetIndex || currentIndex === targetIndex.index) return

    sortTodo(currentIndex, targetIndex.index)
  }

  return (
    <DragDropContext
      onDragEnd={(result) => handleDragAndDrop(result)}
    >
      <Droppable
        droppableId='todo'
      >
        {
          (provided) => (         
            <ul 
              className='todo-list'
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              {
                filteredTodo.map((value, index) => {
                  if (index <= 5) 
                    return (
                      <Draggable
                        key={value._id}
                        draggableId={value._id}
                        index={index}
                      >
                        {
                          (provided) => (                         
                            <li 
                              className='todo-list__item'
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              ref={provided.innerRef}
                            >                              
                              <div
                                className={
                                  value.completed
                                    ? 'todo-list__item-completed todo-list__item-completed--bg-active'
                                    : 'todo-list__item-completed'
                                }
                              >
                                <Button
                                  className={
                                    value.completed 
                                      ? 'completed-btn completed-btn--bg-active'
                                      : 'completed-btn'                      
                                  }    
                                  ariaLabel={
                                    value.completed 
                                      ? 'completed todo'
                                      : 'complete todo'
                                  }
                                  type='button'     
                                  onClick={() => completeTodo(value)}                                
                                >
                                  <img 
                                    hidden={!value.completed}
                                    src={iconCheck} 
                                    alt="icon check" 
                                  />
                                </Button> 
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

                              <Button
                                className='todo-list__item-delete'
                                ariaLabel='delete todo'
                                onClick={() => deleteTodoByID(value._id)}
                                type='button'
                              >
                                <img 
                                  hidden
                                  src={iconCross} 
                                  alt="icon cross" 
                                />
                              </Button>                            
                            </li>
                          )
                        }
                      </Draggable>
                    )
                })
              }  
              {provided.placeholder}    
            </ul>
          )
        }
      </Droppable>
    </DragDropContext>
  )
}

export default TodoList