import { useEffect, useState } from 'react'
import { Todo, TodoWithID } from '../types/Todo'
import { TODO_ACTIVE_VALUE, TODO_ALL_VALUE, TODO_COMPLETED_VALUE, TODO_TYPE_KEY } from '../constants/TODO_TYPE'
import { fetchTodo } from '../utils/fetchTodo'
import { sortArr } from '../utils/sortArr'
import { FetchResponseWithData } from '../types/Fetch'

interface LoadingTodo {
  [key: string]: boolean
}

export const useTodo = () => {
  const [todos, setTodos] = useState<TodoWithID[]>([])
  const [filteredTodos, setFilteredTodos] = useState<TodoWithID[]>([])
  const [loadingTodos, setLoadingTodos] = useState<boolean>(true)
  const [loadingTodo, setLoadingTodo] = useState<LoadingTodo>({})
  const [todoFilter, setTodoFilter] = useState<number>(6)

  useEffect(() => {    
    const getTodos = async () => {
      const {status, data} = await fetchTodo<FetchResponseWithData<TodoWithID[]>>('/', 'GET')

      if (status) {  
        setTodos(data)
        setFilteredTodos(filterArrTodoByType(data))
      }

      setLoadingTodos(false)
    }

    getTodos()
  }, [])

  const filterArrTodoByType = (arr: TodoWithID[]) => {
    const todoType = localStorage.getItem(TODO_TYPE_KEY)

    if (todoType === TODO_ACTIVE_VALUE) return arr.filter((value) => !value.completed)
    if (todoType === TODO_COMPLETED_VALUE) return arr.filter((value) => value.completed)
    return arr
  }

  const addLoadingTodoByID = (id: string) => {
    setLoadingTodo((prev) => ({...prev, [id]: true}))
  }

  const removeLoadingTodoByID = (id: string) => {
    setLoadingTodo((prev) => {
      const {[id]: _, ...rest} = prev
      return rest
    })
  }

  const createTodo = async (value: Todo) => {
    setLoadingTodos(true)
    const {status, data} = await fetchTodo<FetchResponseWithData<TodoWithID>>('/', 'POST', value)

    if(status) {
      const newTodos = [...todos, data]
      setTodos(newTodos)
      setFilteredTodos(filterArrTodoByType(newTodos))
    }

    setLoadingTodos(false)
    return status
  }

  const deleteTodoByID = async (id: string) => {
    addLoadingTodoByID(id)
    const {status} = await fetchTodo(`/${id}`, 'DELETE')
    
    if (status) {
      const newTodos = todos.filter((value) => value._id !== id)
      setTodos(newTodos)
      setFilteredTodos(filterArrTodoByType(newTodos))
    }

    removeLoadingTodoByID(id)
    return status
  }

  const deleteAllTodoCompleted = async () => {
    setLoadingTodos(true)
    const {status} = await fetchTodo('/', 'DELETE')

    if (status) {
      const newTodos = todos.filter((value) => !value.completed)
      setTodos(newTodos)
      setFilteredTodos(filterArrTodoByType(newTodos))
    }

    setLoadingTodos(false)
    return status
  }

  const completeTodo = async (todo: TodoWithID) => {
    addLoadingTodoByID(todo._id)
    const {status} = await fetchTodo(`/${todo._id}`, 'PUT', {...todo, completed: !todo.completed})

    if (status) {
      const result = await fetchTodo<FetchResponseWithData<TodoWithID[]>>('/', 'GET')

      if (result.status) {
        setTodos(result.data)
        setFilteredTodos(filterArrTodoByType(result.data))
      }
    }

    removeLoadingTodoByID(todo._id)
    return status
  }
 
  const sortTodo = (currentIndex: number, targetIndex: number) => {
    const todoType = localStorage.getItem(TODO_TYPE_KEY)
    const completedTodoLength = todos.filter((value) => value.completed).length
    const newTargetIndex = TODO_ALL_VALUE === todoType ? targetIndex : targetIndex + completedTodoLength
    const newCurrentIndex = TODO_ALL_VALUE === todoType ? currentIndex : currentIndex + completedTodoLength
    if (todoType === TODO_COMPLETED_VALUE || newTargetIndex < completedTodoLength || newCurrentIndex < completedTodoLength) return 

    fetchTodo('/sort', 'PUT', {
      currentIndex: newCurrentIndex,
      targetIndex: newTargetIndex
    })

    const newTodos = sortArr(todos, newCurrentIndex, newTargetIndex)
    setFilteredTodos(filterArrTodoByType(newTodos))
    setTodos(newTodos)
  }

  const getAllTodo = () => {
    localStorage.setItem(TODO_TYPE_KEY, TODO_ALL_VALUE)
    setFilteredTodos(filterArrTodoByType(todos))
  }

  const getActiveTodo = () => {
    localStorage.setItem(TODO_TYPE_KEY, TODO_ACTIVE_VALUE)
    setFilteredTodos(filterArrTodoByType(todos))
  }
  
  const getCompletedTodo = () => {
    localStorage.setItem(TODO_TYPE_KEY, TODO_COMPLETED_VALUE)
    setFilteredTodos(filterArrTodoByType(todos))
  }

  const getMoreTodo = () => {
    setTodoFilter(todoFilter + 3)
  }

  const todosLeft = filterArrTodoByType(todos).length
  return {
    todos: filteredTodos.slice(0, todoFilter),
    leftTodos: todosLeft > todoFilter ? todosLeft - todoFilter : 0,
    loadingTodos,
    loadingTodo,
    
    createTodo,
    deleteTodoByID,
    deleteAllTodoCompleted,
    completeTodo,
    sortTodo,

    getAllTodo,
    getActiveTodo,
    getCompletedTodo,
    getMoreTodo
  }
}