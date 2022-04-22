import { useEffect, useState } from 'react'
import { csv } from 'd3'
import pDatacsv from './data/dataP.csv'
import cDataCsv from './data/dataC.csv'

import AgGrid from './components/AgGrid'
import NivoVisualization from './components/NivoVisualization'

function App() {
  const [dataRow, setDataRow] = useState([])
  const [dataColumns, setDataColumns] = useState([])
  const [dataRowP, setDataRowP] = useState([])
  const [dataColumnsP, setDataColumnsP] = useState([])

  useEffect(() => {
    csv(cDataCsv).then((data) => {
      setDataRow(data.slice(0, data.length))
      setDataColumns(data.columns)
    })
    csv(pDatacsv).then((data) => {
      const onlyRows = data.slice(0, data.length)
      const newDataP = onlyRows.map((d) => {
        const Gross = +d.Qw + +d.Qo
        return {
          ...d,
          Gross,
        }
      })
      setDataRowP(newDataP)
      setDataColumnsP([...data.columns, 'Gross'])
    })
  }, [])

  console.log(dataRowP)

  const dataForGraph = () => {
    const data = [
      {
        id: 'Oil',
        color: 'hsl(261, 70%, 50%)',
        data: [],
      },
      {
        id: 'Water',
        color: 'hsl(312, 70%, 50%)',
        data: [],
      },
      {
        id: 'Gas',
        color: 'hsl(104, 70%, 50%)',
        data: [],
      },
      {
        id: 'WaterInj',
        color: 'hsl(356, 70%, 50%)',
        data: [],
      },
    ]

    for (let k = 0; k < 4; k++) {
      // k for energies
      for (let i = 2005; i < 2019; i++) {
        // i for years
        for (let j = 1; j < 13; j++) {
          // j for months
          const arrayEveryMonth = dataRowP.filter(
            (d) =>
              d['Year'] === i.toString(10) && d['Month'] === j.toString(10),
          )

          // Assign the value of the corresponding energy

          data[k]['data'].push({
            [`${i}-${j}`]:
              arrayEveryMonth.reduce(
                (acc, el) =>
                  acc +
                  +el[k === 0 ? 'Qo' : k === 1 ? 'Qw' : k === 2 ? 'Qg' : 'Qs'],
                0,
              ) / arrayEveryMonth.length,
          })
        }
      }
    }

    return data
  }
  const datafromfunc = dataForGraph()
  console.log(datafromfunc)

  const rateGraphEnergyData = (data) => {
    const fixedData = []

    for (let k = 0; k < 4; k++) {
      // k for energies
      //? Because we dont want to skip the first month for all years, have yo keep just the values on every array.
      fixedData.push(
        data[k]['data'].map((d) => {
          return Object.values(d)
        }),
      )
    }

    let newData = [
      {
        id: 'Oil',
        color: 'hsl(261, 70%, 50%)',
        data: [],
      },
      {
        id: 'Water',
        color: 'hsl(312, 70%, 50%)',
        data: [],
      },
      {
        id: 'Gas',
        color: 'hsl(104, 70%, 50%)',
        data: [],
      },
      {
        id: 'WaterInj',
        color: 'hsl(356, 70%, 50%)',
        data: [],
      },
    ]
    for (let i = 0; i < 4; i++) {
      const holderData = data[i].data.map((el, i, arr) => {
        const [key] = Object.keys(el)
        return {
          x: key,
          y: Object.values(arr[i === 167 ? i : i + 1]) / Object.values(el) - 1,
        }
      })
      newData[i].data = holderData
    }

    return newData
  }

  const dataToPass = datafromfunc
  const result = rateGraphEnergyData(dataToPass)
  console.log(result)
  // Tengo que formatear la data bien pq realmente es x: ano y y: valor de ese ano

  return (
    <>
      <div className="App">
        {dataRow.length > 0 ? (
          <>
            <AgGrid
              rowData={dataRow}
              columns={dataColumns}
              title="Completion CSV"
            />
            <AgGrid
              rowData={dataRowP}
              columns={dataColumnsP}
              title="Production CSV"
            />
          </>
        ) : (
          'Loading'
        )}
      </div>
      <div style={{ overflowX: 'scroll', padding: '1rem 5rem' }}>
        <div style={{ height: '70vh', width: '4000px' }}>
          <NivoVisualization data={result} />
        </div>
      </div>
    </>
  )
}

export default App

// Ahora, debo quitar las columnas repetidas, pero primero debo encontrar como meter los dos arrasys en 1 solo.

