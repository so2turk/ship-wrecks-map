import React, { useEffect, useState } from 'react'
import Map, { Marker, Popup, NavigationControl } from 'react-map-gl'
import { RoomSharp } from '@mui/icons-material'
import axios from 'axios'
import 'mapbox-gl/dist/mapbox-gl.css'
import Register from '../components/register/register'
import Login from '../components/login/login'
import('../app.css')

const michigan = 'https://opendata.arcgis.com/datasets/9544348973ac4d9e9a77007bca8a706e_0.geojson'

function ReactMap() {
  const [viewState, setViewState] = useState({
    width: "100%",
    // height: "100vh",
    latitude: 42.7860064,
    longitude: -80.0417,
    zoom: 4
  })
  const [ shipWrecks, setShipWrecks ] = useState([])
  const [ selectedShipId, setSelectedShipId ] = useState(null)
  const [ shipWrecks2, setShipWrecks2 ] = useState(null)
  const [filteredSW, setFilteredSW] = useState(null)
  const [filteredSW2, setFilteredSW2] = useState(null)
  const [depth, setDepth] = useState([10, 100])
  const lstorage = window.localStorage
  const [user, setUser] = useState(lstorage.getItem('user'))
  const [showReg, setShowReg] = useState(false)
  const [showLog, setShowLog] = useState(false)

  
  useEffect(() => {
    getShipWrecks()
    getShipWrecks2()

  }, [])

  useEffect(() => {
    if(shipWrecks) setFilteredSW(filterDepth(shipWrecks))
    if(shipWrecks2) setFilteredSW2(filterDepth2(shipWrecks2))

  }, [shipWrecks, shipWrecks2, depth])

  const variables = {
      filters: {
        'depth': depth
      }
  }

  const getShipWrecks = async () => {
    try {
      const res = await axios.post('/ships')
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

  const filterDepth = (ships) => {
    return ships.filter(s => s.depth >= variables.filters.depth[0] &&
                             s.depth <= variables.filters.depth[1])
  }

  const filterDepth2 = (ships) => {
    ships.features.map(ship => ship.properties.Depth=parseInt(ship.properties.Depth))
    return ships.features
                .filter(s => s.properties.Depth >= variables.filters.depth[0] &&
                             s.properties.Depth <= variables.filters.depth[1])
  }

  const handleMarkerSelect = (id) => {
    try{
      setSelectedShipId(id)
    } catch(err){
      console.log(err)
    }
  }

  const handleLogout = () => {
    setUser(null)
    lstorage.removeItem('user')
  }

  return (
    <div>
      <Map
        {...viewState}
        onMove={evt => setViewState(evt.viewState)}
        style={{height: '100vh'}}
        mapStyle="mapbox://styles/mapbox/streets-v9"
        mapboxAccessToken={process.env.REACT_APP_MAPBOX}
        transitionDuration="200"
        doubleClickZoom
        scrollZoom
      >
        { filteredSW2 && filteredSW2.map(shipWreck2 => (
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
            {shipWreck2.properties.F__OBJECTID === selectedShipId && (
                <Popup
                  key={shipWreck2.properties.F__OBJECTID}
                  longitude={shipWreck2.geometry.coordinates[0]}
                  latitude={shipWreck2.geometry.coordinates[1]}
                  anchor="top"
                  closeButton={true}
                  closeOnClick={false}
                >
                  <div className='popupCard'>
                    <span><label>Vessel:</label> {shipWreck2.properties.Vessel}</span>
                    <span><label>Depth:</label> {shipWreck2.properties.Depth}</span>
                    <span><label>Lost Year:</label> {shipWreck2.properties.LostYR}</span>
                    <label>Coordinates:</label>
                    <span>Lat:{shipWreck2.properties.LatitudeDecimalDegrees} / Long:{shipWreck2.properties.LongitudeDecimalDegrees}</span>
                  <span><label>Photos:</label><a href={shipWreck2.properties.Photo1}> Ship </a>-<a href={shipWreck2.properties.ShipwreckPhoto}> Wreck</a></span>
                  </div>
                </Popup>
            )}
          </>
        ))}
        { filteredSW && filteredSW.map(shipWreck => (
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
        {user ? (
          <div>
            <button
              className="logout button"
              onClick={handleLogout}>Logout
            </button>
          </div>
          ) : (
            <>
              <div className="log-res">
                <button className="login button" onClick={() => {
                  setShowLog(!showLog)
                  setShowReg(false)
                }}>Login</button>
                <button className="register button" onClick={() => {
                  setShowReg(!showReg)
                  setShowLog(false)
                }}>Register</button>
              </div>
            </>
          )
        }
        {showReg ? <Register setShowReg={setShowReg} /> : null}
        {showLog ? <Login setShowLog={setShowLog} setUser={setUser} lstorage={lstorage}/> : null}
      </Map>
    </div>
  );
}

export default ReactMap;
