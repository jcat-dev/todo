import { useEffect, useState } from 'react'
import { Todo, TodoWithID } from '../types/Todo'
import { ResponseTodo } from '../types/Response'

export const useTodo = () => {
  const [todoList, setTodoList] = useState<TodoWithID[]>([])
  const [filteredTodo, setFilteredTodo] = useState<TodoWithID[]>([])

  useEffect(() => {    
    updateTodo()
  }, [])
  
  const updateTodo = async () => {
    const result = await fetch(String(import.meta.env.VITE_API_TODO))
    const data: ResponseTodo = await result.json()

    if (data.status) {      
      data.data.sort((a, b) => {
        if ((a.completed && a.completed === b.completed) || (a.completed === b.completed)) return 0
        if (a.completed && a.completed !== b.completed) return -1
        
        return 1
      })

      setTodoList(data.data)
      setFilteredTodo(data.data)
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

  const getAllTodo = () => {
    setFilteredTodo(todoList)
  }

  const getActiveTodo = () => {
    setFilteredTodo(
      todoList.filter((value) => !value.completed)
    )
  }

  const getCompletedTodo = () => {
    setFilteredTodo(
      todoList.filter((value) => value.completed)
    )
  }

  return {
    todoList: filteredTodo,
    updateTodo,
    createTodo,
    deleteTodoByID,
    deleteAllTodoCompleted,
    completeTodo,
    getAllTodo,
    getActiveTodo,
    getCompletedTodo
  }
}