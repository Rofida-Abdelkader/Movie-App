import React from 'react';
import { FaPlus, FaSearch, FaBell } from 'react-icons/fa';

const Navbar = () => {
  return (
    <nav className="bg-[#032541] h-[64px] flex items-center sticky top-0 z-50">
      <div className="max-w-[1300px] mx-auto w-full px-8 flex justify-between items-center">
        
        {/* Left Side: Logo & Links */}
        <div className="flex items-center gap-8">
          <div className="flex flex-col leading-none font-black text-[#01b4e4] text-2xl tracking-tighter cursor-pointer">
            <span>TMDB</span>
          </div>
          <ul className="hidden md:flex gap-6 text-white font-semibold text-[15px]">
            <li className="hover:text-[#01b4e4] cursor-pointer">Movies</li>
            <li className="hover:text-[#01b4e4] cursor-pointer">TV Shows</li>
            <li className="hover:text-[#01b4e4] cursor-pointer">People</li>
            <li className="hover:text-[#01b4e4] cursor-pointer">More</li>
          </ul>
        </div>

        {/* Right Side: Icons & Profile */}
        <div className="flex items-center gap-7 text-white">
          <FaPlus className="cursor-pointer hover:text-[#01b4e4] text-sm" />
          <div className="border border-white px-1.5 py-0.5 rounded-[3px] text-[11px] font-bold hover:bg-white hover:text-[#032541] cursor-pointer transition-colors">
            EN
          </div>
          <FaBell className="cursor-pointer hover:text-[#01b4e4]" />
          <div className="w-8 h-8 rounded-full bg-pink-500 flex items-center justify-center text-sm font-bold cursor-pointer hover:opacity-80">
            M
          </div>
          <FaSearch className="text-[#01b4e4] text-lg cursor-pointer hover:scale-110 transition-transform" />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;