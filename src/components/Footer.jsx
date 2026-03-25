import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-[#032541] px-6 py-10 mt-20 border-t border-slate-700">
      <div className="container mx-auto flex flex-col items-center">
        {/* Logo */}
        <div className="mb-6">
          <img
            src="https://www.themoviedb.org/assets/2/v4/logos/v2/blue_short-8e7b30f73a4020692ccca9c88bafe5dcb6f8a62a4c6bc55cd9ba82bb2cd95f6c.svg"
            alt="TMDB Logo"
            width={130}
          />
        </div>

        {/* Quick Links */}
        <div className="flex gap-8 mb-6">
          <Link to="/" className="text-white text-sm hover:text-[#01b4e4] transition">Home</Link>
          <Link to="/wishlist" className="text-white text-sm hover:text-[#01b4e4] transition">Wishlist</Link>
          <Link to="/search" className="text-white text-sm hover:text-[#01b4e4] transition">Search</Link>
        </div>

        {/* Legal Stuff */}
        <p className="text-gray-400 text-xs text-center max-w-md leading-relaxed">
          © 2026 Movie App Project. This product uses the TMDB API but is not endorsed or certified by TMDB.
        </p>
      </div>
    </footer>
  );
};

export default Footer;