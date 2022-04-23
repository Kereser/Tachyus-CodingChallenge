import React from 'react'
import { AgGridReact } from 'ag-grid-react'

import 'ag-grid-community/dist/styles/ag-grid.css'
import 'ag-grid-community/dist/styles/ag-theme-alpine-dark.css'

const AgGrid = ({ rowData, columns, title }) => {
  const columnDefs = columns.map((col) => {
    return {
      field: col,
    }
  })

  return (
    <div style={{ width: '100%' }}>
      <h1>Grid of: {title}</h1>
      <div
        className="ag-theme-alpine-dark"
        style={{ height: '70vh', minWidth: '100%' }}
      >
        <AgGridReact rowData={rowData} columnDefs={columnDefs} />
      </div>
    </div>
  )
}

export default React.memo(AgGrid)
