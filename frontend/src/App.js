import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import ReactMap from './pages/react-map-gl';
import MapBox from './pages/map-box-gl';
import Err404 from './pages/err';

function App() {
  return (
    <Router>
      <div className="App">
          <Routes>
            <Route path="/" element={<ReactMap/>} exact />
            <Route path="/mapbox" element={<MapBox/>} exact />
            <Route path='*' element={<Err404/>} />
          </Routes>
      </div>
    </Router>
  );
}

export default App;
