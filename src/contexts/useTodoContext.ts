import { useContext } from 'react'
import { TodoContext } from './ProviderTodo'

export const useTodoContext = () => {
  const todo = useContext(TodoContext)

  if (!todo) {
    throw new Error('useTodoContext must be used within a Provider')
  }

  return todo
}