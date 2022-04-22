import { AgGridReact } from 'ag-grid-react'

import 'ag-grid-community/dist/styles/ag-grid.css'
import 'ag-grid-community/dist/styles/ag-theme-alpine-dark.css'

const AgGrid = ({ rowData, columns }) => {
  console.log('AGGRID: ', columns, rowData)
  const columnDefs = columns.map((col) => {
    return {
      field: col,
    }
  })

  return (
    <div>
      <div
        className="ag-theme-alpine-dark"
        style={{ height: '70vh', width: '100%' }}
      >
        <AgGridReact rowData={rowData} columnDefs={columnDefs} />
      </div>
    </div>
  )
}

export default AgGrid
