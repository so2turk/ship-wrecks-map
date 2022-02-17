import React, { useEffect, useState } from 'react'
import Map, { Marker, Popup } from 'react-map-gl'
import { RoomSharp } from '@material-ui/icons'
import axios from 'axios'
import 'mapbox-gl/dist/mapbox-gl.css'
import('./app.css')

function App() {
  const [viewState, setViewState] = useState({
    latitude: 52.520008,
    longitude: 13.404954,
    zoom: 6
  });
  const [ shipWrecks, setShipWrecks ] = useState([])
  
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

  return (
    <div>
      <Map
        {...viewState}
        onMove={evt => setViewState(evt.viewState)}
        style={{width: '100%', height: '100vh'}}
        mapStyle="mapbox://styles/mapbox/streets-v9"
        mapboxAccessToken={process.env.REACT_APP_MAPBOX}
      >
        { shipWrecks.map(shipWreck => (
          <>
            <Marker 
              longitude={shipWreck.londec} 
              latitude={shipWreck.latdec} 
              anchor="bottom"
            >
              <RoomSharp style={{ color: 'black', fontSize: viewState.zoom * 5 }} />
            </Marker>
            <Popup
              longitude={shipWreck.londec}
              latitude={shipWreck.londec}
              anchor="bottom"
              closeButton={true}
              closeOnClick={false}
            >
              <div className='popupCard'>
                <label>Fature:</label>
                <p>{shipWreck.feature_type}</p>
                <label>Depth:</label>
                <p>{shipWreck.depth}</p>
                <label>Chart:</label>
                <p>{shipWreck.chart}</p>
                <label>Coordinates:</label>
                <p>{shipWreck.coordinates}</p>
              </div>
            </Popup>
          </>
        ))}
      </Map>
    </div>
  );
}

export default App;
