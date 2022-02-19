import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import ReactMap from './pages/react-map-gl';
import Err404 from './pages/err';

function App() {
  return (
    <Router>
      <div className="App">
          <Routes>
            <Route path="/" element={<ReactMap/>} exact />
            <Route path='*' element={<Err404/>} />
          </Routes>
      </div>
    </Router>
  );
}

export default App;
