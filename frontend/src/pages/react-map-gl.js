import React, { useEffect, useState } from 'react'
import Map, { Marker, Popup, NavigationControl } from 'react-map-gl'
import { RoomSharp } from '@material-ui/icons'
import axios from 'axios'
import 'mapbox-gl/dist/mapbox-gl.css'
import('../app.css')

const michigan = 'https://opendata.arcgis.com/datasets/9544348973ac4d9e9a77007bca8a706e_0.geojson'

function ReactMap() {
  const [viewState, setViewState] = useState({
    latitude: 42.7860064,
    longitude: -80.0417,
    zoom: 4
  })
  const [ shipWrecks, setShipWrecks ] = useState([])
  const [ selectedShipId, setSelectedShipId ] = useState(null)
  const [ shipWrecks2, setShipWrecks2 ] = useState(null)
  
  useEffect(() => {
    getShipWrecks()
    getShipWrecks2()

  }, [])

  const variables = {
      filters: {
        'depth': [1,10]
      }
  }

  const getShipWrecks = async () => {
    try {
      const res = await axios.post('/ships', variables)
      setShipWrecks(res.data)

    } catch(err) {
      console.log(err)
    }
  }
  const getShipWrecks2 = async () => {
    try {
      const res2 = await axios.get(michigan)
      setShipWrecks2(res2.data)

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
        { shipWrecks2 && shipWrecks2.features.map(shipWreck2 => (
          <>
            <Marker 
              longitude={shipWreck2.geometry.coordinates[0]} 
              latitude={shipWreck2.geometry.coordinates[1]} 
              anchor="bottom"
            >
              <RoomSharp 
                onClick={() => handleMarkerSelect(shipWreck2.properties.F__OBJECTID)}
                style={{ 
                  color: 'red', 
                  fontSize: viewState.zoom * 5,
                  cursor: "pointer"
                }} 
              />
            </Marker>
          </>
        ))}
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
                    <span><label>Total Wrecks:</label> {shipWrecks.length}</span>
                  </div>
                </Popup>
            )}
          </>
        ))}
        <NavigationControl 
          position='bottom-right'
          showCompass={false}
        />
      </Map>
    </div>
  );
}

export default ReactMap;
