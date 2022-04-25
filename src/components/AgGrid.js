import React, { useCallback, useRef } from 'react'
import { AgGridReact } from 'ag-grid-react'

import 'ag-grid-community/dist/styles/ag-grid.css'
import 'ag-grid-community/dist/styles/ag-theme-alpine.css'
import 'ag-grid-community/dist/styles/ag-theme-alpine.css'

//Components
import InputButton from './InputButton'

// Mui Components
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'

const AgGrid = ({ rowData, columns, title }) => {
  const gridRef = useRef()

  const columnDefs = columns.map((col) => {
    return {
      field: col,
      sortable: true,
    }
  })

  const onSelectionChanged = useCallback(() => {
    var selectedRow = gridRef.current.api.getSelectedRows()
    var selectedRowsString = ''
    selectedRowsString += selectedRow[0].wellName
    document.querySelector('#selectedRows').innerHTML = selectedRowsString
  }, [])

  return title !== 'Completion CSV' ? (
    <Box style={{ width: '100%' }}>
      <Typography
        className="heading"
        variant="h4"
        sx={{ marginBottom: '40px' }}
      >
        Grid of: {title}
      </Typography>
      <Box
        id="myGrid"
        className="ag-theme-alpine"
        style={{ height: '80%', minWidth: '100%' }}
      >
        <AgGridReact
          ref={gridRef}
          rowData={rowData}
          columnDefs={columnDefs}
          rowSelection={'multiple'}
          onSelectionChanged={onSelectionChanged}
        />
      </Box>
    </Box>
  ) : (
    <Box style={{ width: '100%' }}>
      <Typography className="heading" variant="h4">
        Grid of: {title}
      </Typography>
      <Box className="header">
        <Box className="header-rows">
          Selection:
          <Box component={'span'} id="selectedRows"></Box>
        </Box>
        <Box className="input-button">
          <InputButton label={'Replace name'} btnLabel={'Change'} />
        </Box>
      </Box>
      <Box
        id="myGrid"
        className="ag-theme-alpine"
        style={{ height: '80%', minWidth: '100%' }}
      >
        <AgGridReact
          ref={gridRef}
          rowData={rowData}
          columnDefs={columnDefs}
          rowSelection={'single'}
          onSelectionChanged={onSelectionChanged}
        />
      </Box>
    </Box>
  )
}

export default AgGrid
