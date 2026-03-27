import { Link } from "react-router-dom"
import { useState } from "react"
import { FaBell, FaBars, FaTimes } from "react-icons/fa"
import SearchBar from "./SearchBar"
import {DarkModeToggle} from "./DarkModeToggle"
import LanguageDropdown from "./LanguageDropdown"
import useLanguageStore from "@/store/Language"
import useAuthStore from "@/store/authStore"

export default function Navbar(){
  const language = useLanguageStore((state) => state.language);
  const setLanguage = useLanguageStore((state) => state.setLanguage);
  const [menuOpen,setMenuOpen] = useState(false)
  const { user, logout } = useAuthStore();

 return(

 <nav className="bg-gray-400 h-16 dark:bg-[#0d1b2a] flex items-center sticky top-0 z-50">

  <div className="mx-auto w-full px-6 flex justify-between items-center">

   {/* Logo */}
   <Link to="/" className="font-black text-[#01b4e4] text-2xl">
    TMDB
   </Link>

   {/* Desktop Links */}
   <ul className="hidden md:flex gap-6 text-black dark:text-white font-semibold">
    <Link to="/" className="hover:text-[#01b4e4]">
     Movies
    </Link>
    <Link to="/wishlist" className="hover:text-[#01b4e4]">
     Wishlist
    </Link>
   </ul>

   {/* Desktop Right Side */}
   <div className="hidden md:flex items-center gap-6">

    <SearchBar/>
    <LanguageDropdown
        language={language}
        setLanguage={setLanguage}
      />
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
          </div>

    <DarkModeToggle/>

    <FaBell className="cursor-pointer"/>
   </div>

   {/* Mobile Menu Button */}
   <div className="md:hidden flex items-center gap-4">

    <FaBars
     className="text-xl cursor-pointer"
     onClick={()=>setMenuOpen(true)}
    />

   </div>

  </div>

  {/* Mobile Menu */}
       
  {menuOpen && (

   <div className="absolute top-0 left-0 w-full h-screen bg-black/90 text-white flex flex-col p-8 gap-6">

    <FaTimes
     className="text-2xl self-end cursor-pointer"
     onClick={()=>setMenuOpen(false)}
    />

    <Link to="/" onClick={()=>setMenuOpen(false)}>Home</Link>
    <Link to="/movies" onClick={()=>setMenuOpen(false)}>Movies</Link>
    <Link to="/tv" onClick={()=>setMenuOpen(false)}>TV Shows</Link>
    <Link to="/people" onClick={()=>setMenuOpen(false)}>People</Link>
    <Link to="/wishlist" onClick={()=>setMenuOpen(false)}>Wishlist</Link>

    <SearchBar/>

    <Link to="/login">Login</Link>
    <Link to="/register">Register</Link>

   </div>

  )}

 </nav>
 )
}
