import { Route, Routes } from 'react-router-dom';

import Homepage from './pages/Homepage/Homepage';
import Favorites from './pages/Favorites/Favorites';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import './App.css';
function App() {
  return (
    <div className="App">
      <Routes>
        <Route exact path="/" element={<Homepage />} />
        <Route exact path="/favorites" element={<Favorites />} />
      </Routes>
      <ToastContainer />
    </div>
  );
}

export default App;
