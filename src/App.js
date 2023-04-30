import { Route, Routes } from 'react-router-dom';

import Homepage from './pages/Homepage/Homepage';
import Favorites from './pages/Favorites/Favorites';
import './App.css';
function App() {
  return (
    <div className="App">
      <Routes>
        <Route exact path="/" element={<Homepage />} />
        <Route exact path="/favorites" element={<Favorites />} />
      </Routes>
    </div>
  );
}

export default App;
