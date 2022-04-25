import React, { useState, useCallback, useContext, useEffect } from 'react'
import { Chart } from 'react-google-charts'

//Context
import csvContext from '../context/contextcsv'

const Visualization = () => {
  const [dataChart, setDataChart] = useState([])

  const { dataRowP } = useContext(csvContext)

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
      // Changing the arrayToUse because if not, im going to work with the same as always and im going to change only in the last energy column
      let arrayToUse = i === 1 ? otherData : newArr
      newArr = arrayToUse.map((el, j, arr) => {
        if (j === 0) return el
        const fOValue = el[i]
        const sOValue = arr[j - 1][i]
        const rate = fOValue / sOValue - 1
        const copy = [...el]
        copy[i] = rate
        return copy
      })
    }
    // The logic for get the rate for one year is divide it by the previous one.
    // As we don't have date for 2004, I harcoding the rate for 2005 to 0.
    const firstRow = [2005, 0, 0, 0, 0]
    newArr[0] = firstRow
    newArr.unshift(headers)
    return newArr
  }, [dataRowP])

  useEffect(() => {
    const r = getDataForGraph()
    setDataChart(r)
  }, [getDataForGraph])

  const options = {
    chart: {
      title: 'Rate over time',
      subtitle: 'Rate taking by year',
    },
    legend: { position: 'bottom' },
    backgroundColor: '#F8F5FF',
  }

  return (
    <Chart
      chartType="LineChart"
      width="100%"
      height="100%"
      data={dataChart}
      options={options}
    />
  )
}

export default Visualization
