import React, { useState } from 'react'

import Input from '@mui/material/Input'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import Button from '@mui/material/Button'

const InputButton = ({ setFil }) => {
  const [filer, setFilter] = useState('')

  const handleClick = () => {
    setFil(filer)
  }

  return (
    <>
      <FormControl>
        <InputLabel>Filter by wellNAME</InputLabel>
        <Input
          style={{ width: '300px' }}
          onChange={({ target }) => setFilter(target.value)}
        />
      </FormControl>
      <Button
        variant="contained"
        style={{ marginLeft: '20px' }}
        onClick={handleClick}
      >
        Click to filter
      </Button>
    </>
  )
}

export default InputButton
