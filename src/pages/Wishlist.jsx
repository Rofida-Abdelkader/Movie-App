import React from 'react';
import { Link } from 'react-router-dom';
import MovieCard from '../components/MovieCard'; 
import { FaHeart, FaTrash, FaRegHeart } from 'react-icons/fa';

const Wishlist = () => {
  // داتا وهمية (Mock Data) مؤقتاً للتأكد من الـ UI
  const wishlistedMovies = [
    // مثال لفيلم لو عايزة تشوفي الشكل:
    // { id: 1, title: "Example Movie", poster_path: "https://image.tmdb.org/t/p/w500/uDsyFyLTkySjndTePkJ7S3GvSwa.jpg", vote_average: 8.5 }
  ];

  return (
    <div className="max-w-[1300px] mx-auto px-10 py-10 font-sans min-h-[60vh]">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-8 border-b pb-4 border-gray-200">
        <h2 className="text-[1.8rem] font-bold text-[#000] dark:text-white">My Wishlist</h2>
        <span className="bg-[#01b4e4] text-white px-3 py-1 rounded-full text-sm font-bold shadow-sm">
          {wishlistedMovies.length} Items
        </span>
      </div>

      {/* Content Section */}
      {wishlistedMovies.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8">
          {wishlistedMovies.map((movie) => (
            <div key={movie.id} className="relative group">
              <MovieCard movie={movie} />
              {/* زرار الحذف بستايل شيك */}
              <button 
                title="Remove from wishlist"
                className="absolute top-2 right-2 bg-red-600 text-white p-2.5 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 shadow-xl hover:scale-110 active:scale-95 z-10"
              >
                <FaTrash size={14} />
              </button>
            </div>
          ))}
        </div>
      ) : (
        /* Empty State */
        <div className="flex flex-col items-center justify-center py-24 text-gray-500">
          <div className="bg-gray-100 dark:bg-gray-800 p-10 rounded-full mb-6 transition-colors">
             <FaRegHeart size={60} className="text-gray-300 dark:text-gray-600" />
          </div>
          <h3 className="text-2xl font-bold mb-2 text-gray-700 dark:text-gray-300">Your wishlist is empty</h3>
          <p className="mb-8 text-gray-400">Start exploring and save your favorite movies for later!</p>
          <Link 
            to="/" 
            className="bg-[#01b4e4] text-white px-10 py-3 rounded-[4px] font-bold hover:bg-[#081c22] transition-all shadow-md hover:shadow-lg active:transform active:scale-95"
          >
            Browse Movies
          </Link>
        </div>
      )}
    </div>
  );
};

export default Wishlist;