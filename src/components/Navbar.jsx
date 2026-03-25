import { Link } from 'react-router-dom';
import { Heart, Search } from 'lucide-react';

const Navbar = () => {
  return (
    <nav className="bg-[#032541] px-6 py-3 flex items-center justify-between sticky top-0 z-50 shadow-lg">
      {/* Logo */}
      <Link to="/" className="hover:opacity-80 transition">
        <img 
          src="https://www.themoviedb.org/assets/2/v4/logos/v2/blue_short-8e7b30f73a4020692ccca9c88bafe5dcb6f8a62a4c6bc55cd9ba82bb2cd95f6c.svg" 
          alt="TMDB Logo" 
          width={100}
        />
      </Link>

      {/* Navigation Links */}
      <div className="flex items-center gap-8">
        <Link to="/" className="text-white text-sm font-medium hover:text-[#01b4e4] transition">
          Home
        </Link>
        <Link to="/wishlist" className="text-white text-sm font-medium hover:text-[#01b4e4] flex items-center gap-1 transition">
          <Heart size={18} />
          Wishlist
        </Link>
        <Link to="/search" className="text-white hover:text-[#01b4e4] transition">
          <Search size={20} />
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;