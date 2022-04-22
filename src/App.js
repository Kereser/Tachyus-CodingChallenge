import { useEffect, useState } from 'react'
import { csv } from 'd3'
import pDatacsv from './data/dataP.csv'
import cDataCsv from './data/dataC.csv'

import AgGrid from './components/AgGrid'

function App() {
  const [dataRow, setDataRow] = useState([])
  const [dataColumns, setDataColumns] = useState([])

  useEffect(() => {
    csv(pDatacsv).then((data) => {
      csv(cDataCsv).then((dataC) => {
        const finalArray = data.map((d) => {
          const wellApiRegisterC = dataC.find((dc) => dc.wellAPI === d.wellAPI)
          const { wellAPI, bodeID, compSubId, ...finalCRegister } =
            wellApiRegisterC
          const Gross = +d.Qo + +d.Qw
          return {
            ...d,
            ...finalCRegister,
            Gross,
          }
        })

        setDataRow(finalArray)
        setDataColumns([
          ...new Set(data.columns.concat(dataC.columns)),
          'Gross',
        ])
      })
    })
  }, [])

  return (
    <>
      <div className="App">
        {dataRow.length > 0 ? (
          <AgGrid rowData={dataRow} columns={dataColumns} />
        ) : (
          'Loading'
        )}
      </div>
    </>
  )
}

export default App

// Ahora, debo quitar las columnas repetidas, pero primero debo encontrar como meter los dos arrasys en 1 solo.

