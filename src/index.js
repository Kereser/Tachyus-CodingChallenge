import React from 'react'
import ReactDOM from 'react-dom'
import './styles.css'
import App from './App'

//Context
import { CsvContextProvider } from './context/contextcsv'

ReactDOM.render(
  <CsvContextProvider>
    <App />
  </CsvContextProvider>,
  document.getElementById('root'),
)
