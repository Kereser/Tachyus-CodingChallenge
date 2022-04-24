//
import { useContext } from 'react'
import { useJsApiLoader, GoogleMap } from '@react-google-maps/api'
import CustomMarker from './CustomMarker'

// State from Context
import ContextCsv from '../context/contextcsv'

const center = { lat: -33.17877677, lng: 21.21233603 }

const Map = () => {
  const { dataRow } = useContext(ContextCsv)
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: 'AIzaSyDOO_WW_Q9zGdWQaoeMld3bBmipdHNvu5k',
  })
  console.log(isLoaded)
  if (!isLoaded) {
    return <h1>Loading</h1>
  }

  const formattedDate = dataRow.map((d) => {
    let { lat, long, Type, wellAPI, wellName, reservoir, TD } = d
    lat = +lat
    long = +long
    return {
      lat,
      lng: long,
      wellName,
      wellAPI,
      Type,
      reservoir,
      TD,
    }
  })

  // I have to build 246 customMarkers

  return (
    <div style={{ height: '100%' }}>
      <GoogleMap
        center={center}
        zoom={12.5}
        mapContainerStyle={{ width: '100%', height: '100%' }}
        options={{
          streetViewControl: false,
          fullscreenControl: false,
        }}
      >
        {formattedDate.map((props) => (
          <CustomMarker key={props.lat + props.lng} {...props} />
        ))}
      </GoogleMap>
    </div>
  )
}

export default Map
