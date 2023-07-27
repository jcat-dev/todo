import ProviderLightTheme from './contexts/ProviderLightTheme'
import ProviderTodo from './contexts/ProviderTodo'
import './styles/global.css'
import './styles/theme.css'

const App = () => {
  return (
    <ProviderLightTheme>
      <ProviderTodo />
    </ProviderLightTheme>
  )
}

export default App
