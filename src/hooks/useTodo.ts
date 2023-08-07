import { useEffect, useState } from 'react'
import { Todo, TodoWithID } from '../types/Todo'
import { ResponseTodo } from '../types/Response'
import { TodoType } from '../types/TodoType'

export const useTodo = () => {
  const [todoList, setTodoList] = useState<TodoWithID[]>([])
  const [filteredTodo, setFilteredTodo] = useState<TodoWithID[]>([])
  const [todoType, setTodoType] = useState<TodoType>('all')

  useEffect(() => {    
    updateTodo()
  }, [])
  
  const updateTodo = async () => {
    const result = await fetch(String(import.meta.env.VITE_API_TODO))
    const data: ResponseTodo = await result.json()

    if (data.status) {      
      setTodoList(data.data)
      setFilteredTodo(data.data)
      setTodoType('all')
    }
  }

  const createTodo = async (value: Todo) => {    
    await fetch(String(import.meta.env.VITE_API_TODO), {
      method: 'POST',
      body: JSON.stringify(value),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    
    updateTodo()
  }

  const deleteTodoByID = async (id: string) => {
    await fetch(String(import.meta.env.VITE_API_TODO) + `/${id}`, {
      method: 'DELETE'
    })

    updateTodo()
  }

  const deleteAllTodoCompleted = async () => {
    await fetch(String(import.meta.env.VITE_API_TODO), {
      method: 'DELETE'
    })

    updateTodo()
  }

  const completeTodo = async (todo: TodoWithID) => {
    await fetch(String(import.meta.env.VITE_API_TODO) + `/${todo._id}`, {
      method: 'PUT',
      body: JSON.stringify({...todo, completed: !todo.completed}),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    
    updateTodo()
  }

  const sortTodo = async (currentIndex: number, targetIndex: number) => {
    await fetch(String(import.meta.env.VITE_API_TODO) + '/sort', {
      method: 'PUT',
      body: JSON.stringify({ currentIndex, targetIndex }),
      headers: {
        'Content-Type': 'application/json'
      }
    })

    updateTodo()
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