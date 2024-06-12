import styles from './circleShape.module.css'

interface Props {
  className: string
  children?: React.ReactNode
}

const CircleShape: React.FC<Props> = ({className, children}) => {
  return (
    <span className={`${className} ${styles['circle']}`} >
      {
        children
      }
    </span>
  )
}

export default CircleShape