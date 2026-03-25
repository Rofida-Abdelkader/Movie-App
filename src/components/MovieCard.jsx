import { Link } from 'react-router-dom';
import { Heart } from 'lucide-react';

const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';

const MovieCard = ({ movie }) => {
  return (
    <div className="relative rounded-lg overflow-hidden shadow-md hover:scale-105 hover:shadow-xl transition-all duration-300 cursor-pointer bg-white dark:bg-slate-900 border dark:border-slate-800">
      
      {/* Poster with Link */}
      <Link to={`/movie/${movie.id}`}>
        <img
          src={movie.poster_path 
            ? `${IMAGE_BASE_URL}${movie.poster_path}` 
            : 'https://via.placeholder.com/500x750?text=No+Image'}
          alt={movie.title}
          className="w-full h-[350px] object-cover"
        />
      </Link>

      {/* Rating Badge */}
      <div className="absolute top-2 left-2 bg-[#032541]/90 backdrop-blur-sm text-white text-[10px] font-bold px-2 py-1 rounded-md border border-green-500">
        ⭐ {movie.vote_average?.toFixed(1)}
      </div>

      {/* Wishlist Button */}
      <button className="absolute top-2 right-2 bg-black/40 text-white p-1.5 rounded-full hover:bg-red-500 hover:scale-110 transition-all">
        <Heart size={16} />
      </button>

      {/* Info Section */}
      <div className="p-3">
        <Link to={`/movie/${movie.id}`}>
          <h3 className="text-sm font-bold text-gray-800 dark:text-white truncate hover:text-[#01b4e4] transition">
            {movie.title}
          </h3>
        </Link>
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
          {movie.release_date ? movie.release_date.slice(0, 4) : 'N/A'}
        </p>
      </div>

    </div>
  );
};

export default MovieCard;