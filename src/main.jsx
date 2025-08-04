import React, { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import appStore from './utils/appStore.js'

createRoot(document.getElementById('root')).render(
  <StrictMode>
      <BrowserRouter>
    <Provider store={appStore}>
      <ToastContainer />
    <App />
    </Provider>
    </BrowserRouter>
  </StrictMode>,
)
