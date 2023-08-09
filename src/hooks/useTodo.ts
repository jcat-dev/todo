import { useEffect, useState } from 'react'
import { Todo, TodoWithID } from '../types/Todo'
import { TodoType } from '../types/TodoType'
import fetchTodo from '../utils/fetchTodo'

export const useTodo = () => {
  const [todoList, setTodoList] = useState<TodoWithID[]>([])
  const [filteredTodo, setFilteredTodo] = useState<TodoWithID[]>([])
  const [todoType, setTodoType] = useState<TodoType>('all')

  useEffect(() => {    
    updateTodo()
  }, [])
  
  const updateTodo = async () => {
    const data = await fetchTodo.setGet()

    if (data.status) {      
      setTodoList(data.data)
      setFilteredTodo(data.data)
      setTodoType('all')
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

    if (todoType === 'all') {
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
    setFilteredTodo(todoList)
    setTodoType('all')
  }

  const getActiveTodo = () => {
    setFilteredTodo(
      todoList.filter((value) => !value.completed)
    )
    setTodoType('active')
  }

  const getCompletedTodo = () => {
    setFilteredTodo(
      todoList.filter((value) => value.completed)
    )
    setTodoType('completed')
  }

  return {
    todoList: filteredTodo,
    todoType,

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