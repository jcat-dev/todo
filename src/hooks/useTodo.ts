import { useEffect, useState } from 'react'
import { Todo, TodoWithID } from '../types/Todo'
import { TodoType } from '../types/TodoType'
import fetchTodo from '../utils/fetchTodo'
import localStorageType from '../utils/localStorageType'

export const useTodo = () => {
  const [todoList, setTodoList] = useState<TodoWithID[]>([])
  const [filteredTodo, setFilteredTodo] = useState<TodoWithID[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(true)

  useEffect(() => { 
    updateTodo()
  }, []) 

  const updateTodo = async () => {
    const result = await fetchTodo.setGet()
    
    if (result.status) {      
      const item = localStorageType.getItem<TodoType>('todoType')
      setTodoList(result.data)

      if (item === 'active') {
        setFilteredTodo(result.data.filter((value) => !value.completed))        
        return setIsLoading(false)
      }

      if (item === 'completed') {
        setFilteredTodo(result.data.filter((value) => value.completed))        
        return setIsLoading(false)
      }

      setFilteredTodo(result.data)      
      return setIsLoading(false)
    }
  }

  const createTodo = async (value: Todo) => {   
    setIsLoading(true)
    await fetchTodo.setPost(value)
    await updateTodo()
  }

  const deleteTodoByID = async (id: string) => {
    setIsLoading(true)
    await fetchTodo.setDelete(`/${id}`)
    await updateTodo()
  }

  const deleteAllTodoCompleted = async () => {
    setIsLoading(true)
    await fetchTodo.setDelete()
    await updateTodo()
  }

  const completeTodo = async (todo: TodoWithID) => {
    setIsLoading(true)
    await fetchTodo.setUpdate({...todo, completed: !todo.completed}, `/${todo._id}`)
    await updateTodo()
  }

  const sortTodo = async (currentIndex: number, targetIndex: number) => {
    setIsLoading(true)    
    const todoType = localStorageType.getItem<TodoType>('todoType')   
    
    if (todoType === 'active') {     
      const todoLength = todoList.filter((value) => value.completed).length

      await fetchTodo.setUpdate({ 
        currentIndex: currentIndex + todoLength, 
        targetIndex: targetIndex + todoLength 
      }, '/sort',)      
      return await updateTodo()
    }

    if (todoType !== 'completed') {
      await fetchTodo.setUpdate({ currentIndex, targetIndex}, '/sort')
      return await updateTodo()
    }   

    setIsLoading(false) 
  }

  const getAllTodo = () => {
    localStorageType.setItem<TodoType>('todoType', 'all')
    setFilteredTodo(todoList)
  }

  const getActiveTodo = () => {
    localStorageType.setItem<TodoType>('todoType', 'active')
    setFilteredTodo(todoList.filter((value) => !value.completed))
  }

  const getCompletedTodo = () => {
    localStorageType.setItem<TodoType>('todoType', 'completed')
    setFilteredTodo(todoList.filter((value) => value.completed))
  }

  return {
    todo: todoList,
    filteredTodo,
    isLoading,
    
    createTodo,
    deleteTodoByID,
    deleteAllTodoCompleted,
    completeTodo,
    sortTodo,

    getAllTodo,
    getActiveTodo,
    getCompletedTodo,
  }
}