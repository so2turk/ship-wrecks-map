import React, { useEffect, useRef, useState } from 'react'
import MapBoxGl from 'mapbox-gl'
import axios from 'axios'
import 'mapbox-gl/dist/mapbox-gl.css'
import('../app.css')
MapBoxGl.accessToken = process.env.REACT_APP_MAPBOX

const MapBox = () => {
  const mapBoxContainer = useRef(null)
  const [lat, setLat] = useState(40.712776)
  const [lang, setLang] = useState(-74.005974)
  const [zoom, setZoom] = useState(4)
  const [ shipWrecks, setShipWrecks ] = useState([])

  useEffect(() => {
    const Map = new MapBoxGl.Map({
      container: mapBoxContainer.current,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [lang, lat],
      zoom: zoom
    })
  
    Map.addControl(new MapBoxGl.NavigationControl(), 'bottom-right')
    Map.addControl(new MapBoxGl.FullscreenControl());

    getShipWrecks()

    shipWrecks.forEach(ship => {
      const el = document.createElement('div');
      el.className = 'marker';

      new MapBoxGl.Marker(el)
          .setLngLat(ship.coordinates)
          .addTo(Map)
    });

    return () => Map.remove()
  }, [])

  const variables = {
    filters: {
      'depth': [100,2000]
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
  
  return (
    <div >
        <div 
          style={{
              position: 'absolute',
              top: 0,
              bottom: 0,
              left: 0,
              right: 0,
              width: '100%',
              height: '100%',
          }} 
          ref={mapBoxContainer} />
    </div>
  );
}

export default MapBox;
