import { useEffect, useState } from 'react'
import { Todo, TodoWithID } from '../types/Todo'
import { TodoType } from '../types/TodoType'
import fetchTodo from '../utils/fetchTodo'
import localStorageType from '../utils/localStorageType'

export const useTodo = () => {
  const [todoList, setTodoList] = useState<TodoWithID[]>([])
  const [filteredTodo, setFilteredTodo] = useState<TodoWithID[]>([])
  
  useEffect(() => {    
    updateTodo()
  }, []) 

  const updateTodo = async () => {
    const result = await fetchTodo.setGet()
    
    if (result.status) {      
      const item = localStorageType.getItem<TodoType>('todoType')
      setTodoList(result.data)

      if (item === 'active') {
        return setFilteredTodo(result.data.filter((value) => !value.completed))
      }

      if (item === 'completed') {
        return setFilteredTodo(result.data.filter((value) => value.completed))
      }

      return setFilteredTodo(result.data)
    }
  }

  const createTodo = async (value: Todo) => {   
    await fetchTodo.setPost(value)
    await updateTodo()
  }

  const deleteTodoByID = async (id: string) => {
    await fetchTodo.setDelete(`/${id}`)
    await updateTodo()
  }

  const deleteAllTodoCompleted = async () => {
    await fetchTodo.setDelete()
    await updateTodo()
  }

  const completeTodo = async (todo: TodoWithID) => {
    await fetchTodo.setUpdate({...todo, completed: !todo.completed}, `/${todo._id}`)
    await updateTodo()
  }

  const sortTodo = async (currentIndex: number, targetIndex: number) => {
    const todoLength = todoList.filter((value) => value.completed).length
    const todoType = localStorageType.getItem<TodoType>('todoType')
    
    if (todoType !== 'completed') {
      await fetchTodo.setUpdate( { currentIndex, targetIndex}, '/sort')
    }

    if (todoType === 'active') {
      await fetchTodo.setUpdate({ 
        currentIndex: currentIndex + todoLength, 
        targetIndex: targetIndex + todoLength 
      }, '/sort',)
    }
    
    await updateTodo()
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
    todoList: filteredTodo,

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