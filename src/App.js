import { useEffect, useContext } from 'react'
import { csv } from 'd3'
import pDatacsv from './data/dataP.csv'
import cDataCsv from './data/dataC.csv'

//Components
import AgGrid from './components/AgGrid'
import InputButton from './components/InputButton'
import Visualization from './components/Visualization'
import Notification from './components/Notification'
import Map from './components/Map'

//Mui Components
import Container from '@mui/material/Container'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Skeleton from '@mui//material/Skeleton'

// ContexProviderCSV
import CsvContex from './context/contextcsv'
import MenuBar from './components/MenuBar'

function App() {
  const {
    dataRow,
    dataColumns,
    dataRowP,
    dataColumnsP,
    notify,
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

  return (
    <>
      <Container>
        <Notification notify={notify} />
        <MenuBar />
        <section className="start half-section">
          <Box className="input-section">
            <InputButton
              label={'Enter a filter'}
              btnLabel={'Click to filter'}
            />
            <Box>
              <Typography
                className="sub-heading"
                variant="sub-heading"
                sx={{ lineHeight: '20px' }}
              >
                Let empty to see all data
              </Typography>
            </Box>
          </Box>
        </section>
        <section className="grid-container section" id="Grid">
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
            <Skeleton variant="rectangular" width={'100%'} height={'100%'} />
          )}
        </section>
        <section className="visualization section" id="Visualization">
          <Box sx={{ height: '100%' }}>
            <Typography className="heading" variant="h4">
              Visualization of the Rate for different energies over time
            </Typography>
            <Box sx={{ height: '93%', width: '100%' }}>
              <Visualization />
            </Box>
          </Box>
        </section>
        <section className="map section" id="Map">
          <Box sx={{ height: '100%' }}>
            <Typography className="heading" variant="h4">
              Map with markers at wells locations
            </Typography>
            <Map />
          </Box>
        </section>
      </Container>
    </>
  )
}

export default App

// Ahora, debo quitar las columnas repetidas, pero primero debo encontrar como meter los dos arrasys en 1 solo.

