import React, { useState, useContext } from 'react'

import TextField from '@mui/material/TextField'
import FormControl from '@mui/material/FormControl'
import Button from '@mui/material/Button'

// Context =>
import CsvContext from '../context/contextcsv'

const InputButton = ({ label, btnLabel }) => {
  const [inputUser, setInputUser] = useState('')

  const { initialData, initialDataP, setDataRow, setDataRowP, setInitialData } =
    useContext(CsvContext)

  const filterFunction = (inputUser, initialData) => {
    const dataC = initialData.filter((d) =>
      d.wellName.toLowerCase().startsWith(inputUser.toLowerCase()),
    )
    // Another state to change one and be able to show with the other a updated state.

    console.log(!!dataC)
    if (dataC.length === 0) {
      window.alert(
        "----The wells name you entered doesn't have a successful match---- \n --------Please try again-------- \n",
      )
      setDataRow(initialData)
      setDataRowP(initialDataP)
      setInputUser('')
    } else {
      const wellApisFromC = dataC.map((d) => d.wellAPI)
      const dataP = initialDataP.filter((d) =>
        wellApisFromC.includes(d.wellAPI),
      )
      setDataRow(dataC)
      setDataRowP(dataP)
    }
  }

  const handleClick = () => {
    if (label === 'Enter a filter') {
      filterFunction(inputUser, initialData)
    } else {
      // Logic to change the wellname/s
      console.log(initialData, initialDataP)

      const wellsNames = document.querySelector('#selectedRows').innerHTML
      const dividedNames = wellsNames.split(',')
      console.log(dividedNames)
      if (dividedNames[0] === '') {
        window.alert('Please select a well')
        setInputUser('')
      }

      if (inputUser === '') {
        window.alert('Have to enter a replace name')
        setInputUser('')
      }

      // Logic to change the wellname/s
      const newData = initialData.map((d) => {
        return dividedNames.includes(d.wellName)
          ? { ...d, wellName: inputUser }
          : d
      })
      setInitialData(newData)
      filterFunction(inputUser, newData)
      setInputUser('')
    }
  }

  return (
    <>
      <FormControl>
        <TextField
          label={label}
          style={{ width: '100px' }}
          id="outlined-size-small"
          size="small"
          value={inputUser}
          onChange={({ target }) => setInputUser(target.value)}
        />
      </FormControl>
      <Button
        variant="contained"
        style={{ marginLeft: '20px' }}
        onClick={handleClick}
      >
        {btnLabel}
      </Button>
    </>
  )
}

export default InputButton
