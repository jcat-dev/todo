export interface Todo {
  title: string
  completed: boolean
  order: number
}

export interface TodoWithID extends Todo {
  _id: string
}