import '../styles/loading.css'

interface Props {
  loading: boolean
}

const Loading: React.FC<Props> = ({ loading }) => {
  if (!loading) return

  return (
    <div
      className='loading-box'
    >
      <div
        className={'loading'}
      />           
    </div>
  )
}

export default Loading