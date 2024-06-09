import { ButtonHTMLAttributes } from 'react'

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  className: string
  ariaLabel: string
  type: 'button' | 'submit' | 'reset'
}

const Button: React.FC<Props> = (props) => {
  const {
    className,
    ariaLabel,
    type,
    children,
    ...rest
  } = props

  return (
    <button
      className={className}
      aria-label={ariaLabel}      
      type={type}
      {...rest}
    >
      {
        children
      }
    </button>
  )
}

export default Button