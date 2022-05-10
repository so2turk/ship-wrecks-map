import { useEffect, useState } from 'react'
import Map, { NavigationControl } from 'react-map-gl'
import axios from 'axios'
import Register from '../components/register/register'
import Login from '../components/login/login'
import DepthSlider from '../components/slider/slider'
import Logo from '../components/logo/logo'
import Info from '../components/info/info'
import MarkerPopup from '../components/marker-popup/marker-popup'
import 'mapbox-gl/dist/mapbox-gl.css'
import('../app.css')

const michigan = 'https://opendata.arcgis.com/datasets/9544348973ac4d9e9a77007bca8a706e_0.geojson'

function ReactMap() {
  const [viewState, setViewState] = useState({
    width: "100%",
		latitude: 40.463669,
		longitude: -3.74922,
		zoom: 1.8,
  })
  const [shipWrecks, setShipWrecks] = useState([])
  const [selectedShipId, setSelectedShipId] = useState(null)
  const [shipWrecks2, setShipWrecks2] = useState(null)
  const [filteredSW, setFilteredSW] = useState(null)
  const [filteredSW2, setFilteredSW2] = useState(null)
  const [depth, setDepth] = useState([-1000, -100])
  const lstorage = window.localStorage
  const [user, setUser] = useState(lstorage.getItem('user'))
  const [showReg, setShowReg] = useState(false)
  const [showLog, setShowLog] = useState(false)
  const [showMongoDB, setShowMongoDB] = useState(false)
  const [showMichigan, setShowMichigan] = useState(false)
  
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
			depth: depth.map((d) => (d < 0 ? d * -1 : d)),
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
    return ships.filter(
			(s) => 
				s.depth >= variables.filters.depth[1] &&
        s.depth <= variables.filters.depth[0])
  }

  const filterDepth2 = (ships) => {
    ships.features.map(
			(ship) => ship.properties.Depth = parseInt(ship.properties.Depth)
		)
    return ships.features.filter(
			(s) => 
				s.properties.Depth >= variables.filters.depth[1] &&
        s.properties.Depth <= variables.filters.depth[0]
		)
  }

  const handleLogout = () => {
    setUser(null)
    lstorage.removeItem('user')
    setShowMongoDB(false)
    setShowMichigan(false)
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
        doubleClickZoom={user}
        scrollZoom={user}
      >
        {showMichigan && 
					filteredSW2 && 
					filteredSW2.map(shipWreck2 => (
						<MarkerPopup
							db="michigan"
							sw={shipWreck2}
							selectedShipId={selectedShipId}
							setSelectedShipId={setSelectedShipId}
							viewState={viewState}
						/>
					))}
        {showMongoDB && 
					filteredSW && 
					filteredSW.map(shipWreck => (
						<MarkerPopup
							db="mongoDB"
							sw={shipWreck}
							selectedShipId={selectedShipId}
							setSelectedShipId={setSelectedShipId}
							viewState={viewState}
						/>
					))}
        <NavigationControl 
          position='bottom-left'
          showCompass={false}
        />
        {user ? (
          <div>
            <button
              className="logout button"
              onClick={handleLogout}>Logout
            </button>
            <DepthSlider depth={depth} setDepth={setDepth} />
            <Info
              showMongoDB={showMongoDB}
              setShowMongoDB={setShowMongoDB}
              showMichigan={showMichigan}
              setShowMichigan={setShowMichigan}
            />
          </div>
          ) : (
            <>
              <div className="log-res">
                <button 
									className="login button" 
									onClick={() => {
										setShowLog(!showLog)
										setShowReg(false)
                	}}
								>Login</button>
                <button 
									className="register button" 
									onClick={() => {
										setShowReg(!showReg)
										setShowLog(false)
                	}}
								>Register</button>
              </div>
              <Logo />
            </>
          )
        }
        {showReg ? <Register setShowReg={setShowReg} /> : null}
        {showLog ? (
					<Login 
						setShowLog={setShowLog} 
						setUser={setUser} 
						lstorage={lstorage}
					/>
				) : null}
      </Map>
    </div>
  );
}

export default ReactMap;
