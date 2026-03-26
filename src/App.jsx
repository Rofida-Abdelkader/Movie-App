import { Routes, Route } from 'react-router-dom';
import NotFound from './pages/NotFound';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import MovieDetails from './pages/MovieDetails.jsx'; 
import BackToTop from './components/BackToTop';

function App() {
  return (
    <div className="min-h-screen bg-white dark:bg-[#0d1b2a] text-black dark:text-white transition-colors duration-500">
      <Navbar />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/movie/:id" element={<MovieDetails />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <BackToTop />
      <Footer />
    </div>
  );
}


export default App;
