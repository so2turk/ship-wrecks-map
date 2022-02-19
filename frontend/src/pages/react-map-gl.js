import React, { useEffect, useState } from 'react'
import Map, { Marker, Popup, NavigationControl, Layer } from 'react-map-gl'
import { RoomSharp } from '@material-ui/icons'
import axios from 'axios'
import 'mapbox-gl/dist/mapbox-gl.css'
import('../app.css')

function ReactMap() {
  const [viewState, setViewState] = useState({
    latitude: -14.270972,
    longitude: -170.7,
    zoom: 10
  });
  const [ shipWrecks, setShipWrecks ] = useState([])
  const [ selectedShipId, setSelectedShipId ] = useState(null)
  
  useEffect(() => {
    getShipWrecks()

  }, [])

  const getShipWrecks = async () => {
    try {
      const res = await axios.get('/ships')
      setShipWrecks(res.data)
    } catch(err) {
      console.log(err)
    }
  }

  const handleMarkerSelect = (id) => {
    try{
      setSelectedShipId(id)
    } catch(err){
      console.log(err)
    }
  }

  return (
    <div>
      <Map
        {...viewState}
        onMove={evt => setViewState(evt.viewState)}
        style={{width: '100%', height: '100vh'}}
        mapStyle="mapbox://styles/mapbox/streets-v9"
        mapboxAccessToken={process.env.REACT_APP_MAPBOX}
        transitionDuration="200"
        doubleClickZoom
        scrollZoom
      >
        { shipWrecks.map(shipWreck => (
          <>
            <Marker 
              longitude={shipWreck.londec} 
              latitude={shipWreck.latdec} 
              anchor="bottom"
            >
              <RoomSharp 
                onClick={() => handleMarkerSelect(shipWreck._id)}
                style={{ 
                  color: 'black', 
                  fontSize: viewState.zoom * 5,
                  cursor: "pointer"
                }} 
              />
            </Marker>
            {shipWreck._id === selectedShipId && (
                <Popup
                  key={shipWreck._id}
                  longitude={shipWreck.londec}
                  latitude={shipWreck.latdec}
                  anchor="top"
                  closeButton={true}
                  closeOnClick={false}
                >
                  <div className='popupCard'>
                    <span><label>Fature:</label> {shipWreck.feature_type}</span>
                    <span><label>Depth:</label> {shipWreck.depth}</span>
                    <span><label>Chart:</label> {shipWreck.chart}</span>
                    <label>Coordinates:</label>
                    <span>Lat:{shipWreck.latdec} / Long:{shipWreck.londec}</span>
                  </div>
                </Popup>
            )}
          </>
        ))}
        <NavigationControl 
          position='bottom-right'
          showCompass={false}
        />
        <Layer
          icon-allow-overlap={true}
        />
      </Map>
    </div>
  );
}

export default ReactMap;
