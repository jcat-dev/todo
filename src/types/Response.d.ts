import { TodoWithID } from './Todo'

export interface ResponseTodo {
  status: boolean
  data: TodoWithID[]
}