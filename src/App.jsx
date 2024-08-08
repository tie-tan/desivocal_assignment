import './App.css'
import { Button } from './components/ui/button'
import { Checkbox } from './components/ui/checkbox'
import { SelectDemo } from './Select_Character'
import { ThemeProvider } from './components/ui/theme';

function App() {

  return (

    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <SelectDemo></SelectDemo>
    </ThemeProvider>
  )
}

export default App