export interface Todo {
  title: string
  completed: boolean
}

export interface TodoWithID extends Todo {
  _id: string
}