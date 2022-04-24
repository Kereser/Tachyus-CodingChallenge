import { useCallback, useEffect, useState, useContext } from 'react'
import { csv } from 'd3'
import pDatacsv from './data/dataP.csv'
import cDataCsv from './data/dataC.csv'

import AgGrid from './components/AgGrid'
// import NivoVisualization from './components/NivoVisualization'
import InputButton from './components/InputButton'
import Visualization from './components/Visualization'

// ContexProviderCSV
import CsvContex from './context/contextcsv'

function App() {
  const [dataForG, setDataForG] = useState([])

  const {
    dataRow,
    dataColumns,
    dataRowP,
    dataColumnsP,
    setDataRow,
    setDataColumns,
    setDataRowP,
    setDataColumnsP,
    setInitialData,
    setInitialDataP,
  } = useContext(CsvContex)

  useEffect(() => {
    csv(cDataCsv).then((data) => {
      setDataRow(data.slice(0, data.length))
      setDataColumns(data.columns)
      setInitialData(data.slice(0, data.length))
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
      setInitialDataP(newDataP)
      setDataColumnsP([...data.columns, 'Gross'])
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const getDataForGraph = useCallback(() => {
    let data = [
      {
        id: 'Oil',
        data: [],
      },
      {
        id: 'Water',
        data: [],
      },
      {
        id: 'Gas',
        data: [],
      },
      {
        id: 'WaterInj',
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

    let otherData = [['Year', 'Oil', 'Water', 'Gas', 'WaterInj']]

    // ? Making the data in the right format.
    for (let i = 0; i < 4; i++) {
      // I create the years with the valies of oil
      if (i === 0) {
        data[i]['data'].forEach((d) => {
          const year = Object.keys(d)
          otherData.push([parseInt(year, 10), d[year]])
        })
      }
      // I have to modify those array to concat the rest of values of the other energies
      // d === {2005: valor}
      else {
        otherData.map((el, j) => {
          if (j === 0) return el
          return el.push(Object.values(data[i]['data'][j - 1])[0])
        })
      }
    }

    // I need to find the rate.
    // The rate is the difference between a value and the previous one.

    const headers = otherData.shift()

    let newArr = []
    for (let i = 1; i < 5; i++) {
      // 'For' to go through energies
      // Starting at 1 to not take the year value
      // Changing the arrayToUse because if not, im going to work with the same as always and im getting the changes only in the last energy column
      let arrayToUse = i === 1 ? otherData : newArr
      newArr = arrayToUse.map((el, j, arr) => {
        // Change the values for the Oil
        if (j === 0) return el
        const fOValue = el[i]
        const sOValue = arr[j - 1][i]
        const rate = fOValue / sOValue - 1
        const copy = [...el]
        copy[i] = rate
        return copy
      })
    }
    const firstRow = [2005, 0, 0, 0, 0]
    newArr[0] = firstRow
    newArr.unshift(headers)
    return newArr
  }, [dataRowP])

  useEffect(() => {
    const r = getDataForGraph()
    setDataForG(r)
  }, [getDataForGraph])

  return (
    <>
      <div className="App">
        <section className="start-section">
          <div className="input-search">
            <InputButton
              label={'Enter a filter'}
              btnLabel={'Click to filter'}
            />
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
        <section className="visualization-section">
          <div>
            <h1>Visualization of the Rate for different energies over time</h1>
            <div style={{ height: '70vh', width: '100%' }}>
              <Visualization data={dataForG} />
            </div>
          </div>
        </section>
      </div>
    </>
  )
}

export default App

// Ahora, debo quitar las columnas repetidas, pero primero debo encontrar como meter los dos arrasys en 1 solo.

