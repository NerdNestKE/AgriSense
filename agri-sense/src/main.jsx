import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './login.css'
import App from './signUp.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
