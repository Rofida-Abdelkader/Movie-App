<<<<<<< HEAD
import './App.css'

function App() {

  return (
    <>
      
    </>
  )
}

export default App
=======
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import MovieDetails from './pages/MovieDetails.jsx'; 
import BackToTop from './components/BackToTop';

function App() {
  return (
    <div className="min-h-screen flex flex-col font-sans">
      <Navbar />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/movie/:id" element={<MovieDetails />} />
        </Routes>
      </main>
      <BackToTop />
      <Footer />
    </div>
  );
}

export default App;
>>>>>>> e6561b727209c11887412709098969e6f5191a5f
