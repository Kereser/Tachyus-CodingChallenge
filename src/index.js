import React from 'react'
import ReactDOM from 'react-dom/client'
import './styles.css'
import App from './App'

//Context
import { CsvContextProvider } from './context/contextcsv'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <CsvContextProvider>
    <App />
  </CsvContextProvider>,
)

