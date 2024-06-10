import styles from './css/skeletonBox.module.css'

interface Props {
  className: string
}

const SkeletonBox: React.FC<Props> = ({className}) => {
  return (
    <div className={`${styles['skeleton']} ${className}`} />
  )
}

export default SkeletonBox