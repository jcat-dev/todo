import ProviderLightTheme from './contexts/ProviderLightTheme'
import ProviderTodo from './contexts/ProviderTodo'
import './styles/global.css'

const App = () => {
  return (
    <ProviderLightTheme>
      <ProviderTodo />
    </ProviderLightTheme>
  )
}

export default App
