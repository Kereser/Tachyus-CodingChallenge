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
    <div className="container-grid">
      <h1>Grid of: {title}</h1>
      <div
        className="ag-theme-alpine-dark"
        style={{ height: '70vh', minWidth: '100%', padding: '1rem 5rem' }}
      >
        <AgGridReact rowData={rowData} columnDefs={columnDefs} />
      </div>
    </div>
  )
}

export default AgGrid
