import React from 'react'
import { Chart } from 'react-google-charts'

const Visualization = ({ data /* see data tab */ }) => {
  console.log('Renderizo NivoVisualization', data)

  const options = {
    chart: {
      title: 'Rate over time',
      subtitle: 'Rate taking by year',
    },
    legend: { position: 'bottom' },
  }

  return (
    <Chart
      chartType="LineChart"
      width="100%"
      height="70vh"
      data={data}
      options={options}
    />
  )
}

export default React.memo(Visualization)
