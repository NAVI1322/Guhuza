import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { ThemeProvider } from './components/theme/themeProvider.tsx'
import { BrowserRouter } from 'react-router-dom'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
     <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
    <App />
    </ThemeProvider>
    </BrowserRouter>
  </StrictMode>,
)
