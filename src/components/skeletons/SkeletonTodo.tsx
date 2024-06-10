import SkeletonBox from './SkeletonBox'
import styles from './css/skeletonTodo.module.css'

const SkeletonTodo = () => {
  return (
    <>
      <SkeletonBox className={styles['skeleton-box']} />
      <SkeletonBox className={styles['skeleton-box']} />
      <SkeletonBox className={styles['skeleton-box']} />
      <SkeletonBox className={styles['skeleton-box']} />
      <SkeletonBox className={styles['skeleton-box']} />
      <SkeletonBox className={styles['skeleton-box']} />
    </>
  )
}

export default SkeletonTodo