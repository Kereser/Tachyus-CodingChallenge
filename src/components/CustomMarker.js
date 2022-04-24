import { useState } from 'react'
import { Marker, InfoWindow } from '@react-google-maps/api'
import redDot from '../icons/red-dot.png'
import greenDot from '../icons/green-dot.png'

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
          <div>
            <h3 className="sub-heading">{`Name: ${wellName}`}</h3>
            <h3 className="sub-heading">{`wellAPI: ${wellAPI}`}</h3>
            <h3 className="sub-heading">{`TD: ${TD}`}</h3>
            <h3 className="sub-heading">{`Type: ${Type}`}</h3>
            <h3 className="sub-heading">{`Reservoir: ${reservoir}`}</h3>
          </div>
        </InfoWindow>
      )}
    </Marker>
  )
}

export default CustomMarker
