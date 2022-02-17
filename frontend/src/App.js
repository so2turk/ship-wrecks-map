import React, { useState } from 'react'
import Map, { Marker } from 'react-map-gl'
import { RoomSharp } from '@material-ui/icons'

import 'mapbox-gl/dist/mapbox-gl.css'

function App() {
  const [viewState, setViewState] = useState({
    latitude: 52.520008,
    longitude: 13.404954,
    zoom: 6
  });

  return (
    
      <Map
        {...viewState}
        onMove={evt => setViewState(evt.viewState)}
        style={{width: '100vh', height: '100vh'}}
        mapStyle="mapbox://styles/mapbox/streets-v9"
        mapboxAccessToken={process.env.REACT_APP_MAPBOX}
      >
        <Marker longitude={13.404954} latitude={52.520008} anchor="bottom" >
          <RoomSharp />
        </Marker>
      </Map>
    
  );
}

export default App;
