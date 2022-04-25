import { useState } from 'react'
import { Marker, InfoWindow } from '@react-google-maps/api'

// Icons
import redDot from '../icons/red-dot.png'
import greenDot from '../icons/green-dot.png'

//Mui Components
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

const CustomMarker = ({ lat, lng, wellName, wellAPI, TD, Type, reservoir }) => {
  const [showInfo, setShowInfo] = useState(false)

  const handleMouseOver = () => {
    setShowInfo(true)
  }

  const handleMouseExit = () => {
    setShowInfo(false)
  }

  const redIcon = redDot
  const greenIcon = greenDot
  const iconToUse = Type === 'Producer' ? greenIcon : redIcon

  return (
    <Marker
      position={{ lat, lng }}
      onMouseOver={handleMouseOver}
      onMouseOut={handleMouseExit}
      icon={{ url: iconToUse }}
    >
      {showInfo && (
        <InfoWindow>
          <Box>
            <Box>
              <Typography
                variant="sub-heading"
                className="sub-heading"
              >{`Name: ${wellName}`}</Typography>
            </Box>
            <Box>
              <Typography
                variant="sub-heading"
                className="sub-heading"
              >{`wellAPI: ${wellAPI}`}</Typography>
            </Box>
            <Box>
              <Typography
                variant="sub-heading"
                className="sub-heading"
              >{`TD: ${TD}`}</Typography>
            </Box>
            <Box>
              <Typography
                variant="sub-heading"
                className="sub-heading"
              >{`Type: ${Type}`}</Typography>
            </Box>
            <Box>
              <Typography
                variant="sub-heading"
                className="sub-heading"
              >{`Reservoir: ${reservoir}`}</Typography>
            </Box>
          </Box>
        </InfoWindow>
      )}
    </Marker>
  )
}

export default CustomMarker
