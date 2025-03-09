import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/tw.css'
import App from './app/app.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
