import { Todo } from '../types/Todo'
import { Formik, Form, Field, FormikHelpers } from 'formik'
import { useContext } from 'react'
import { TodoContext } from '../contexts/ProviderTodo'
import * as Yup from 'yup'
import '../styles/todoForm.css'

const TodoForm: React.FC = () => {
  const { 
    createTodo,
    todo
  } = useContext(TodoContext)
  
  const initialValues: Todo = {
    title: '',
    completed: false,
    order: todo.length
  } 
  
  const validationSchema: Yup.ObjectSchema<Todo> = Yup.object({
    title: Yup.string().trim().required(),
    completed: Yup.boolean().required(),
    order: Yup.number().required()
  })
 
  const handleForm = async (value: Todo, FormikHelpers: FormikHelpers<Todo>) => {
    await createTodo(value)
    FormikHelpers.resetForm()
  }

  return(
    <Formik
      initialValues={initialValues}
      enableReinitialize={true}
      validationSchema={validationSchema}
      onSubmit={(value, formikHelpers) => handleForm(value, formikHelpers)}
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