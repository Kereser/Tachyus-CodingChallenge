import { useCallback, useEffect, useState } from 'react'
import { csv } from 'd3'
import pDatacsv from './data/dataP.csv'
import cDataCsv from './data/dataC.csv'

import AgGrid from './components/AgGrid'
import NivoVisualization from './components/NivoVisualization'
import InputButton from './components/InputButton'

function App() {
  const [dataRow, setDataRow] = useState([])
  const [dataColumns, setDataColumns] = useState([])
  const [dataRowP, setDataRowP] = useState([])
  const [dataColumnsP, setDataColumnsP] = useState([])
  const [filt, setFilt] = useState('')
  const [dataForG, setDataForG] = useState([])

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

  useEffect(() => {
    const rawData = dataForGraph()
    const result = rateGraphEnergyData(rawData)
    setDataForG(result)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dataRow, dataRowP])

  useEffect(() => {
    const rowInformation = dataRow.find((d) => d.wellName === filt)
    const dataR = dataRow.filter((d) => d.wellAPI === rowInformation.wellAPI)
    const dataP = dataRowP.filter((d) => d.wellAPI === rowInformation.wellAPI)
    setDataRow(dataR)
    setDataRowP(dataP)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filt])

  const dataForGraph = () => {
    let data = [
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
        const arrayEveryYear = dataRowP.filter((d) => {
          return d['Year'] === i.toString(10)
        })
        // Assign the value of the corresponding energy

        data[k]['data'].push({
          [i]:
            arrayEveryYear.reduce((acc, el) => {
              return (
                acc +
                +el[k === 0 ? 'Qo' : k === 1 ? 'Qw' : k === 2 ? 'Qg' : 'Qs']
              )
            }, 0) / arrayEveryYear.length,
        })
      }
    }

    return data
  }

  const rateGraphEnergyData = (data) => {
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
      newData[i].data = data[i].data.map((el, i, arr) => {
        const [key] = Object.keys(el)
        return {
          x: key,
          y: Object.values(el) / Object.values(arr[i === 0 ? i : i - 1]) - 1,
        }
      })
    }

    return newData
  }

  return (
    <>
      {console.log('Renderizo return de app')}
      <div className="App">
        <section className="start-section">
          <div className="input-search">
            <InputButton setFil={setFilt} />
          </div>
        </section>
        <section className="grid-section-container">
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
        </section>
        <section className="Visualization-container">
          <div>
            <h1>Visualization of the Rate for different energies over time</h1>
            <div style={{ height: '70vh', width: '100%' }}>
              <NivoVisualization data={dataForG} />
            </div>
          </div>
        </section>
      </div>
    </>
  )
}

export default App

// Ahora, debo quitar las columnas repetidas, pero primero debo encontrar como meter los dos arrasys en 1 solo.

