import { Todo } from '../types/Todo'
import { Formik, Form, Field, FormikHelpers } from 'formik'
import { useTodoContext } from '../contexts/useTodoContext'
import { TOAST_ERROR_MSG } from '../constants/TOAST_MSG'
import { toast } from 'react-toastify'
import * as Yup from 'yup'
import CircleShape from './shapes/CircleShape'
import styles from './styles/todoForm.module.css'

const TodoForm: React.FC = () => {
  const { 
    createTodo,
  } = useTodoContext()
  
  const initialValues: Todo = {
    title: '',
    completed: false,
  } 
  
  const validationSchema: Yup.ObjectSchema<Todo> = Yup.object({
    title: Yup.string().trim().required(),
    completed: Yup.boolean().required(),
  })
 
  const handleForm = async (value: Todo, FormikHelpers: FormikHelpers<Todo>) => {
    const status = await createTodo(value)

    if (status) return FormikHelpers.resetForm()
    toast.error(TOAST_ERROR_MSG)
  }

  return(
    <Formik
      initialValues={initialValues}
      enableReinitialize={true}
      validationSchema={validationSchema}
      onSubmit={(value, formikHelpers) => handleForm(value, formikHelpers)}
    >
      <Form className={styles['form']} >
        <CircleShape />
              
        <Field
          className={styles['form-input']}
          type="text"
          id="title"
          name="title"
          placeholder="Create a new note..."
        />
      </Form>
    </Formik>
  )
}

export default TodoForm