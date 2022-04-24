import React, { useCallback, useRef } from 'react'
import { AgGridReact } from 'ag-grid-react'

import 'ag-grid-community/dist/styles/ag-grid.css'
import 'ag-grid-community/dist/styles/ag-theme-alpine-dark.css'
import InputButton from './InputButton'

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
    <div style={{ width: '100%' }}>
      <h1 style={{ marginBottom: '60px' }}>Grid of: {title}</h1>
      <div
        id="myGrid"
        className="ag-theme-alpine-dark"
        style={{ height: '80%', minWidth: '100%' }}
      >
        <AgGridReact
          ref={gridRef}
          rowData={rowData}
          columnDefs={columnDefs}
          rowSelection={'multiple'}
          onSelectionChanged={onSelectionChanged}
        />
      </div>
    </div>
  ) : (
    <div style={{ width: '100%' }}>
      <h1>Grid of: {title}</h1>
      <div className="header">
        <div className="header-rows">
          Selection:
          <span id="selectedRows"></span>
        </div>
        <div className="input-button">
          <InputButton label={'Replace name'} btnLabel={'Change'} />
        </div>
      </div>
      <div
        id="myGrid"
        className="ag-theme-alpine-dark"
        style={{ height: '80%', minWidth: '100%' }}
      >
        <AgGridReact
          ref={gridRef}
          rowData={rowData}
          columnDefs={columnDefs}
          rowSelection={'single'}
          onSelectionChanged={onSelectionChanged}
        />
      </div>
    </div>
  )
}

export default AgGrid
