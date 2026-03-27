import React from 'react';
import { Link } from 'react-router-dom';
import { FaPlus, FaSearch, FaBell } from 'react-icons/fa';
import { DarkModeToggle } from './DarkModeToggle';
import useAuthStore from '../store/authStore';
const Navbar = () => {
  const { user, logout } = useAuthStore();
  return (
    <nav className="bg-[#032541] h-[64px] flex items-center sticky top-0 z-50">
      <div className="max-w-[1300px] mx-auto w-full px-8 flex justify-between items-center">

        {/* Left Side: Logo & Main Links */}
        <div className="flex items-center gap-8">
          <Link to="/" className="flex flex-col leading-none font-black text-[#01b4e4] text-2xl tracking-tighter cursor-pointer transition-transform hover:scale-105">
            <span>TMDB</span>
          </Link>

          <ul className="hidden md:flex gap-6 text-white font-semibold text-[15px]">
            <li className="hover:text-[#01b4e4] cursor-pointer transition-colors">Movies</li>
            <li className="hover:text-[#01b4e4] cursor-pointer transition-colors">TV Shows</li>
            <li className="hover:text-[#01b4e4] cursor-pointer transition-colors">People</li>
            {/* إضافة الويش ليست هنا قبل مور */}
            <Link to="/wishlist" className="hover:text-[#01b4e4] cursor-pointer transition-colors">
              Wishlist
            </Link>
            <li className="hover:text-[#01b4e4] cursor-pointer transition-colors">More</li>
          </ul>
        </div>

        {/* Right Side: Auth & Tools */}
        <div className="flex items-center gap-6 text-white font-semibold text-[15px]">
          {/* روابط الـ Auth */}
          {!user ? (
            <>
              <Link to="/login" className="hover:text-[#01b4e4] transition-colors">
                Login
              </Link>
              <Link to="/register" className="hover:text-[#01b4e4] transition-colors">
                Join TMDB
              </Link>
            </>
          ) : (
            <>
              <Link to="/account" className="hover:text-[#01b4e4] transition-colors">
                Account
              </Link>
              <button
                onClick={logout}
                className="hover:text-[#01b4e4] transition-colors cursor-pointer"
              >
                Logout
              </button>
            </>
          )}

          {/* الأدوات والأيقونات */}
          <div className="flex items-center gap-5">
            <FaPlus className="cursor-pointer hover:text-[#01b4e4] text-sm" title="Add Item" />

            <div className="border border-white px-1.5 py-0.5 rounded-[3px] text-[11px] font-bold hover:bg-white hover:text-[#032541] cursor-pointer transition-all">
              EN
            </div>

            <DarkModeToggle />

            <div className="relative cursor-pointer group">
              <FaBell className="group-hover:text-[#01b4e4] transition-colors" />
              {/* Optional: Notification dot */}
              <span className="absolute -top-1 -right-1 w-2 h-2 bg-[#d40242] rounded-full"></span>
            </div>

            {/* User Profile Circle */}
            {user && (
              <Link to="/account">
                <div className="w-8 h-8 rounded-full bg-[#c0392b] flex items-center justify-center text-sm font-bold cursor-pointer hover:ring-2 hover:ring-white transition-all shadow-md">
                  {user?.username?.charAt(0).toUpperCase()}
                </div>
              </Link>
            )}

            <FaSearch className="text-[#01b4e4] text-lg cursor-pointer hover:scale-125 transition-transform" />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;