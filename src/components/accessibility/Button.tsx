interface Props {
  className: string
  ariaLabel: string
  type: 'button' | 'submit' | 'reset'
  onClick: () => void
  children: React.ReactNode
}

const Button: React.FC<Props> = (props) => {
  return (
    <button
      className={props.className}
      aria-label={props.ariaLabel}
      onClick={props.onClick}
      type={props.type}
    >
      {
        props.children
      }
    </button>
  )
}

export default Button