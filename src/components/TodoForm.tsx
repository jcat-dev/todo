import { Todo } from '../types/Todo'
import { Formik, Form, Field } from 'formik'
import { useContext } from 'react'
import { TodoContext } from '../contexts/ProviderTodo'
import * as Yup from 'yup'
import '../styles/todoForm.css'

const TodoForm: React.FC = () => {
  const { 
    createTodo,
    todoList
  } = useContext(TodoContext)
  
  const initialValues: Todo = {
    title: '',
    completed: false,
    order: todoList.length
  } 
  
  const validationSchema: Yup.ObjectSchema<Todo> = Yup.object({
    title: Yup.string().trim().required(),
    completed: Yup.boolean().required(),
    order: Yup.number().required()
  })
 
  return(
    <Formik
      initialValues={initialValues}
      enableReinitialize={true}
      validationSchema={validationSchema}
      onSubmit={(value) => createTodo(value)}
    >
      <Form
        className='form'
      >
        <div className='form-circle' />
              
        <Field
          className="form-input"
          type="text"
          id="title"
          name="title"
          placeholder="Create a new todo..."
        />
      </Form>
    </Formik>
  )
}

export default TodoForm