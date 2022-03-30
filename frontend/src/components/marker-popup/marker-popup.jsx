import { RoomSharp } from '@mui/icons-material'
import { Marker } from 'react-map-gl'
import './marker.css'

const MarkerPopup = ({ db, sw, viewState }) => {
  let shipWreck

  switch (db) {
    case 'michigan':
      shipWreck = {
        color: 'red',
        coordinates: [sw.geometry.coordinates[0], sw.geometry.coordinates[1]],
        id: sw.properties.F__OBJECTID,
      }
      break
    default:
      shipWreck = {
        color: 'black',
        coordinates: [sw.londec, sw.latdec],
        id: sw._id,
      }
  }

  return (
    <>
      <Marker 
        longitude={shipWreck.coordinates[0]} 
        latitude={shipWreck.coordinates[1]} 
        anchor="bottom"
      >
        <RoomSharp
          style={{ 
            color: shipWreck.color, 
            fontSize: viewState.zoom * 5,
            cursor: "pointer"
          }} 
        />
      </Marker>
    </>
  )
}

export default MarkerPopup