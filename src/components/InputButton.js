import React, { useState, useContext } from 'react'

// Context =>
import CsvContext from '../context/contextcsv'

// Mui Components
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import FormControl from '@mui/material/FormControl'
import Button from '@mui/material/Button'

const InputButton = ({ label, btnLabel }) => {
  const [inputUser, setInputUser] = useState('')

  const {
    initialData,
    initialDataP,
    setDataRow,
    setDataRowP,
    setInitialData,
    setNotify,
  } = useContext(CsvContext)

  const filterFunction = (inputUser, initialData) => {
    const dataC = initialData.filter((d) =>
      d.wellName.toLowerCase().startsWith(inputUser.toLowerCase()),
    )
    // Another state to change one and be able to show with the other a updated state.

    console.log(!!dataC)
    if (dataC.length === 0) {
      setTimeout(() => {
        setNotify({ message: '', state: 'noneState' })
      }, 5000)
      setNotify({
        message: "The wells name you entered doesn't have a successful match",
        state: 'failed',
      })
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
      // Logic to change the wellName
      const wellsNames = document.querySelector('#selectedRows').innerHTML
      const dividedNames = wellsNames.split(',')
      if (dividedNames[0] === '') {
        setTimeout(() => {
          setNotify({ message: '', state: 'noneState' })
        }, 5000)
        setNotify({
          message: 'You have to select a well',
          state: 'failed',
        })
        setInputUser('')
        return
      }

      if (inputUser === '') {
        setTimeout(() => {
          setNotify({ message: '', state: 'noneState' })
        }, 5000)
        setNotify({
          message: 'You have to enter a replace name',
          state: 'failed',
        })
        setInputUser('')
        return
      }

      // Logic to change the wellname/s
      const newData = initialData.map((d) => {
        return dividedNames.includes(d.wellName)
          ? { ...d, wellName: inputUser }
          : d
      })
      setTimeout(() => {
        setNotify({ message: '', state: 'noneState' })
      }, 5000)
      setNotify({
        message: 'Name has been changed',
        state: 'success',
      })
      setInitialData(newData)
      filterFunction(inputUser, newData)
      setInputUser('')
    }
  }

  return (
    <Box className="input-search">
      <FormControl>
        <TextField
          label={label}
          style={{ width: '150px' }}
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
    </Box>
  )
}

export default InputButton
