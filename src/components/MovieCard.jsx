import { Link } from 'react-router-dom';

const MovieCard = ({ movie }) => {
  // Defensive programming: check if movie exists
  if (!movie) return null;

  const rating = Math.round((movie.vote_average || 0) * 10);
  
  // Dynamic border color based on rating
  const getBorderColor = (score) => {
    if (score >= 70) return 'border-[#21d07a]';
    if (score >= 40) return 'border-[#d2d531]';
    return 'border-[#db2360]';
  };

  const releaseDate = movie.release_date 
    ? new Date(movie.release_date).toLocaleDateString('en-US', { 
        month: 'short', 
        day: 'numeric', 
        year: 'numeric' 
      })
    : 'No date';

  const posterUrl = movie.poster_path 
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : 'https://via.placeholder.com/500x750?text=No+Image';

  return (
    <Link 
      to={`/movie/${movie.id}`} 
      className="flex flex-col group w-full mb-5"
    >
      <div className="relative">
        <div className="rounded-lg overflow-hidden shadow-md bg-[#dbdbdb] aspect-[2/3]">
          <img 
            src={posterUrl} 
            alt={movie.title || 'Movie Poster'}
            loading="lazy"
            className="w-full h-full object-cover transform transition-transform duration-300 group-hover:scale-105"
          />
        </div>

        {/* Circular Rating Score */}
        <div className={`absolute -bottom-5 left-3 w-9 h-9 bg-[#081c22] rounded-full flex items-center justify-center border-[2px] ${getBorderColor(rating)} z-20 shadow-lg`}>
          <div className="flex items-start">
            <span className="text-white font-bold text-[13px]">{rating}</span>
            <span className="text-white text-[6px] mt-1 ml-0.5">%</span>
          </div>
        </div>
      </div>

      <div className="mt-7 px-1">
        <h3 className="font-bold text-[16px] leading-tight hover:text-[#01b4e4] transition-colors line-clamp-2">
          {movie.title || movie.name}
        </h3>
        <p className="text-gray-500 text-[14px] mt-1">
          {releaseDate}
        </p>
      </div>
    </Link>
  );
};

export default MovieCard;