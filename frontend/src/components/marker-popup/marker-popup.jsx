import { RoomSharp } from '@mui/icons-material'
import { Marker, Popup } from 'react-map-gl'
import './marker.css'

const MarkerPopup = ({ db, sw, selectedShipId, setSelectedShipId, viewState }) => {
  let shipWreck

  switch (db) {
    case 'michigan':
      shipWreck = {
        color: 'red',
        coordinates: [sw.geometry.coordinates[0], sw.geometry.coordinates[1]],
        id: sw.properties.F__OBJECTID,
        popupCard: [
          { 'Vessel': sw.properties.Vessel },
          { 'Depth': sw.properties.Depth },
          { 'Lost Year': sw.properties.LostYR },
          { 'Ship Image': sw.properties.Photo1 },
          { 'Wreck Image': sw.properties.ShipwreckPhoto }
        ]
      }
      break
    default:
      shipWreck = {
        color: 'black',
        coordinates: [sw.londec, sw.latdec],
        id: sw._id,
        popupCard: [
          { 'Fature': sw.feature_type },
          { 'Depth': sw.depth },
          { 'Chart': sw.chart },
        ]
      }
  }

  const handlePopupCard = () => shipWreck.popupCard.map((p, i) => {

		return (
			<div className='popupCard' key={i}>
				<span>
					<label>{Object.keys(p)}:</label>
					{Object.keys(p)[0].includes('Image') &&
					p[Object.keys(p)] !== null ? (
						<a href={p[Object.keys(p)]}>Image</a>
					) : (
						p[Object.keys(p)]
					)}        
				</span>
			</div>
		)
	})

  const handleMarkerSelect = (id) => {
    try{
      setSelectedShipId(id)
    } catch(err){
      console.log(err)
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
          onClick={() => handleMarkerSelect(shipWreck.id)}
        />
      </Marker>
      {shipWreck.id === selectedShipId && (
        <Popup
          key={shipWreck.id}
          longitude={shipWreck.coordinates[0]}
          latitude={shipWreck.coordinates[1]}
          anchor="top"
          closeButton={true}
          closeOnClick={false}
        >
					<div className="popupCard">{handlePopupCard()}</div>
        </Popup>
      )}
    </>
  )
}

export default MarkerPopup