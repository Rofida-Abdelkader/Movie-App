import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const MovieCard = ({ movie }) => {
  const { t, i18n } = useTranslation();
  
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
    ? new Date(movie.release_date).toLocaleDateString(
        i18n.language === 'en' ? 'en-US' : 
        i18n.language === 'fr' ? 'fr-FR' : 
        i18n.language === 'it' ? 'it-IT' : 
        i18n.language === 'es' ? 'es-ES' : 
        i18n.language === 'de' ? 'de-DE' : 
        'ar-EG',
        { 
          month: 'short', 
          day: 'numeric', 
          year: 'numeric' 
        }
      )
    : t('movie_card.no_date');

  const posterUrl = movie.poster_path 
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : 'https://via.placeholder.com/500x750?text=No+Image';

  return (
    <Link 
      to={`/movie/${movie.id}`} 
      className="flex flex-col group w-full mb-5 transition-colors duration-300 rtl:text-right"
    >
      <div className="relative">
        <div className="rounded-lg overflow-hidden shadow-md bg-[#dbdbdb] aspect-2/3">
          <img 
            src={posterUrl} 
            alt={movie.title || 'Movie Poster'}
            loading="lazy"
            className="w-full h-full object-cover transform transition-transform duration-300 group-hover:scale-105"
          />
        </div>

        <div className={`absolute -bottom-5 left-3 rtl:right-3 rtl:left-auto w-9 h-9 bg-[#081c22] rounded-full flex items-center justify-center border-[2px] ${getBorderColor(rating)} z-20 shadow-lg`}>
          <div className="flex items-start">
            <span className="text-white font-bold text-[13px]">{rating}</span>
            <span className="text-white text-[6px] mt-1 ml-0.5">%</span>
          </div>
        </div>
      </div>

      <div className="mt-7 px-1 text-left rtl:text-right">
        <h3 className="font-bold text-[16px] leading-tight text-gray-900 dark:text-white hover:text-[#01b4e4] dark:hover:text-[#01b4e4] transition-colors line-clamp-2">
          {movie.title || movie.name}
        </h3>
        <p className="text-gray-500 dark:text-gray-400 text-[14px] mt-1">
          {releaseDate}
        </p>
      </div>
    </Link>
  );
};

export default MovieCard;