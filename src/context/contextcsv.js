import React, { useState } from 'react'

const Context = React.createContext()

export function CsvContextProvider({ children }) {
  const [dataRow, setDataRow] = useState([])
  const [dataColumns, setDataColumns] = useState([])
  const [dataRowP, setDataRowP] = useState([])
  const [dataColumnsP, setDataColumnsP] = useState([])
  const [initialData, setInitialData] = useState([])
  const [initialDataP, setInitialDataP] = useState([])
  const [notify, setNotify] = useState({ message: '', state: 'noneState' })

  //? I use the context to get something like a GlobalState.
  return (
    <Context.Provider
      value={{
        dataRow,
        dataColumns,
        dataRowP,
        dataColumnsP,
        initialData,
        initialDataP,
        notify,
        setNotify,
        setDataRow,
        setDataColumns,
        setDataRowP,
        setDataColumnsP,
        setInitialData,
        setInitialDataP,
      }}
    >
      {children}
    </Context.Provider>
  )
}

export default Context
