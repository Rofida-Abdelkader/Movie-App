import { Routes, Route } from 'react-router-dom';
import NotFound from './pages/NotFound';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import MovieDetails from './pages/MovieDetails.jsx';
import Login from './pages/Login';
import Register from './pages/Register';
import ResetPassword from './pages/ResetPassword';
import BackToTop from './components/BackToTop';
import Wishlist from './pages/Wishlist';
import ToastContainer from './components/ToastContainer';
import ProtectedRoute from './components/ProtectedRoute';
import AccountDetails from './pages/AccountDetails';
function App() {
  return (
    <div className="min-h-screen bg-white dark:bg-[#0d1b2a] text-black dark:text-white transition-colors duration-500 flex flex-col">
      <ToastContainer />
      <Navbar />
      <main className="flex-1">
        <Routes>
          <Route path="/account" element={<ProtectedRoute><AccountDetails /></ProtectedRoute>} />
          <Route path="/" element={<Home />} />
          <Route path="/movie/:id" element={<MovieDetails />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/reset-password" element={<ResetPassword />} /> {/* وضيفي السطر ده */}
          <Route path="*" element={<NotFound />} />
          <Route path="/wishlist" element={<ProtectedRoute><Wishlist /></ProtectedRoute>} />
        </Routes>
      </main>
      <BackToTop />
      <Footer />
    </div>
  );
}

export default App;