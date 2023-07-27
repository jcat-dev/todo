import { createContext } from 'react'
import { useTodo } from '../hooks/useTodo'
import Todo from '../components/Todo'

export const TodoContext = createContext<ReturnType<typeof useTodo>>({
  todoList: [],
  selectedTodo: 'all',
  updateTodo: async () => {},
  createTodo: async () => {},
  deleteTodoByID: async () => {},
  deleteAllTodoCompleted: async () => {},
  completeTodo: async () => {},
  getAllTodo:  () => {},
  getActiveTodo:  () => {},
  getCompletedTodo:  () => {}
})

const ProviderTodo = () => {
  return (
    <TodoContext.Provider
      value={useTodo()}
    >
      <Todo />
    </TodoContext.Provider>
  )
}

export default ProviderTodo