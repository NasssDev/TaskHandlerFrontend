import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter as Router } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import Footer from './components/Footer'

// Keep any local development settings you have here
const root = createRoot(document.getElementById('root'))
root.render(
  <StrictMode>
    <Router>
      <AuthProvider>
        <App />
        <Footer />
      </AuthProvider>
    </Router>
  </StrictMode>,
)
