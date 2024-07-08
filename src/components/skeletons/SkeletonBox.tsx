import { HTMLAttributes, forwardRef } from 'react'
import styles from './css/skeletonBox.module.css'

interface Props extends HTMLAttributes<HTMLDivElement> {
  className: string
}

const SkeletonBox = forwardRef<HTMLDivElement, Props>(({className, ...props}, ref) => {
  return (
    <div 
      className={`${styles['skeleton']} ${className}`} 
      {...props}
      ref={ref}
    />
  )
})

export default SkeletonBox