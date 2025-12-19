import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import MyBookings from './pages/MyBookings';
import AddFlight from './pages/AddFlight';

function App() {
  return (
    <BrowserRouter>
      {/* Navbar is outside Routes so it shows on EVERY page */}
      <Navbar />
      
      <div className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/mybookings" element={<MyBookings />} />
          <Route path="/add-flight" element={<AddFlight />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;