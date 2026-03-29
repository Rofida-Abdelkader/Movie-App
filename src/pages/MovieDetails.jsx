import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FaPlay, FaList, FaHeart, FaBookmark, FaStar, FaLink, FaTimes } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';
import { DarkModeToggle } from '@/components/DarkModeToggle';
import {
  getMovieDetails,
  getMovieCredits,
  getMovieReviews,
  getMovieRecommendations,
  getMovieVideos
} from '../services/api';
import useWishlistStore from '../store/wishlistStore';
import useAuthStore from '../store/authStore';
import useToast from '../hooks/useToast';

const MovieDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const toast = useToast();
  const { toggleWishlist, isWishlisted } = useWishlistStore();
  const { user } = useAuthStore();
  const [movie, setMovie] = useState(null);
  const [cast, setCast] = useState([]);
  const [reviews, setReviews] = useState(null);
  const [recommendations, setRecommendations] = useState([]);
  const [videos, setVideos] = useState([]);
  const [images, setImages] = useState({ backdrops: [], posters: [] });
  const [collection, setCollection] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showTrailer, setShowTrailer] = useState(false);
  const [activeVideo, setActiveVideo] = useState(null);
  const [activeSocialTab, setActiveSocialTab] = useState('reviews');
  const [activeMediaTab, setActiveMediaTab] = useState('videos');
  const [isFavorite, setIsFavorite] = useState(false);
  const isRTL = i18n.language === 'ar';
  const API_KEY = "5e2343a149dc636e6c5398bf90b319dd"; // Replace with your actual API key
  const IMAGE_BASE_URL = "https://image.tmdb.org/t/p";

  useEffect(() => {
    if (!id || !API_KEY) return;

    const fetchData = async () => {
      try {
        setLoading(true);
        window.scrollTo(0, 0);

        const [movieRes, castRes, reviewRes, recRes, videoRes, imageRes] = await Promise.all([
          getMovieDetails(id, i18n.language),
          getMovieCredits(id, i18n.language),
          getMovieReviews(id, i18n.language),
          getMovieRecommendations(id, i18n.language),
          getMovieVideos(id, i18n.language),
          fetch(`https://api.themoviedb.org/3/movie/${id}/images?api_key=${API_KEY}`)
        ]);

        const movieData = movieRes.data;
        const castData = castRes.data;
        const reviewData = reviewRes.data;
        const recData = recRes.data;
        const videoData = videoRes.data;
        const imageData = await imageRes.json();

        setMovie(movieData);
        setCast(castData.cast?.slice(0, 10) || []);
        setReviews(reviewData.results?.[0] || null);
        setRecommendations(recData.results?.slice(0, 6) || []);

        const trailers = videoData.results?.filter(v => v.type === "Trailer") || [];
        setVideos(trailers);
        setActiveVideo(trailers[0] || null);

        setImages({
          backdrops: imageData.backdrops?.slice(0, 10) || [],
          posters: imageData.posters?.slice(0, 10) || []
        });

        if (movieData.belongs_to_collection) {
          const colRes = await fetch(
            `https://api.themoviedb.org/3/collection/${movieData.belongs_to_collection.id}?api_key=${API_KEY}`
          );
          const colData = await colRes.json();
          setCollection(colData);
        }

        document.title = `TMDB | ${movieData.title}`;
      } catch (error) {
        console.error("Error fetching movie data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id, API_KEY, i18n.language]);

  if (loading) return <div className="h-screen flex items-center justify-center bg-[#032541] text-white">{t('movie_details.loading')}</div>;
  if (!movie) return <div className="h-screen flex items-center justify-center">{t('movie_details.not_found')}</div>;

  return (
    <div
      dir={isRTL ? 'rtl' : 'ltr'}
      lang={isRTL ? 'ar' : 'en'}
      className="font-sans bg-white dark:bg-[#0a192f] text-black dark:text-white transition-colors duration-300 relative rtl:text-right"
    >

      {/* Trailer Video Modal */}
      {showTrailer && activeVideo && (
        <div className="fixed inset-0 z-[1000] bg-black/90 flex items-center justify-center p-4">
          <button
            onClick={() => setShowTrailer(false)}
            className="absolute top-10 right-10 rtl:left-10 rtl:right-auto text-white text-3xl hover:text-[#01b4e4] transition-colors"
          >
            <FaTimes />
          </button>
          <div className="w-full max-w-5xl aspect-video bg-black shadow-2xl">
            <iframe
              className="w-full h-full"
              src={`https://www.youtube.com/embed/${activeVideo.key}?autoplay=1`}
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      )}

      {/* 1. Hero Section */}
      <div
        className="relative w-full text-white bg-cover bg-center"
        style={{ backgroundImage: `linear-gradient(to right, rgba(3, 37, 65, 1) 150px, rgba(3, 37, 65, 0.8) 100%), url(${IMAGE_BASE_URL}/original${movie.backdrop_path})` }}
      >
        <div className="max-w-[1300px] mx-auto px-10 py-10 flex flex-col md:flex-row gap-10">
          <img src={`${IMAGE_BASE_URL}/w500${movie.poster_path}`} className="w-[300px] rounded-xl shadow-2xl mx-auto md:mx-0" alt={movie.title} />
          <div className="flex flex-col justify-center">
            <h1 className="text-4xl font-bold">{movie.title} <span className="font-normal opacity-70 rtl:hidden dark:text-white">({movie.release_date?.split('-')[0]})</span></h1>
            <div className="flex items-center gap-3 mt-2 mb-6 text-sm flex-wrap">
              <span className="border px-1 rounded uppercase font-bold text-[12px]">PG-13</span>
              <span>{movie.release_date}</span>
              <span>•</span>
              <span>{movie.genres?.map(g => g.name).join(', ')}</span>
              <span>•</span>
              <span>{Math.floor(movie.runtime / 60)}h {movie.runtime % 60}m</span>
            </div>

            <div className="flex items-center gap-6 mb-8 flex-wrap">
              <div className="flex items-center gap-2">
                <div className="w-14 h-14 rounded-full border-4 border-green-500 flex items-center justify-center bg-[#081c22] font-bold text-lg">
                  {Math.round(movie.vote_average * 10)}%
                </div>
                <span className="text-sm font-bold w-28 leading-tight">{t('movie_details.user_score')}</span>
              </div>
              {user && (
                <div className="flex gap-3">
                  <button
                    onClick={() => toast.success(t('movie_details.added_list'))}
                    className="bg-[#032541] p-3 rounded-full hover:scale-110 transition-all">
                    <FaList size={14} />
                  </button>
                  <button
                    onClick={() => {
                      setIsFavorite(!isFavorite);
                      toast.success(!isFavorite ? t('movie_details.marked_favorite') : t('movie_details.removed_favorite'));
                    }}
                    className={`p-3 rounded-full hover:scale-110 transition-all shadow-md ${isFavorite ? 'bg-pink-600 text-white' : 'bg-[#032541] text-pink-400'
                      }`}
                  >
                    <FaHeart size={14} />
                  </button>
                  <button
                    onClick={() => {
                      toggleWishlist(movie);
                      const active = isWishlisted(movie.id);
                      toast.success(
                        active
                          ? `${movie.title} ${t('wishlist.added')}`
                          : `${movie.title} ${t('wishlist.removed')}`
                      );
                    }}
                    className={`p-3 rounded-full hover:scale-110 transition-all shadow-md ${isWishlisted(movie.id) ? 'bg-[#01b4e4] text-white' : 'bg-[#032541] text-white'}`}
                    title={isWishlisted(movie.id) ? t('wishlist.remove') : t('wishlist.add')}
                  >
                    <FaBookmark size={14} />
                  </button>
                </div>
              )}
              <button
                onClick={() => { setActiveVideo(videos[0]); setShowTrailer(true); }}
                className="flex items-center gap-2 font-bold hover:text-[#01b4e4] transition-colors"
              >
                <FaPlay className="rtl:rotate-180" /> {t('movie_details.play_trailer')}
              </button>
            </div>
            <p className="italic opacity-80 text-lg mb-4 text-left rtl:text-right">{t(movie.tagline)}</p>
            <h3 className="text-xl font-bold mb-2 text-left rtl:text-right dark:text-white">{t('movie_details.overview')}</h3>
            <p className="leading-relaxed max-w-3xl text-left rtl:text-right">{movie.overview}</p>
          </div>
        </div>
      </div>

      {/* 2. Main Content Grid */}
      <div className="max-w-[1300px] mx-auto px-10 py-10 flex flex-col lg:flex-row gap-12 text-left rtl:text-right">

        {/* Left Column */}
        <div className="lg:w-3/4 overflow-hidden">

          {/* Top Billed Cast */}
          <section className="mb-10">
            <h2 className="text-2xl font-bold mb-6 text-black dark:text-white">{t('movie_details.top_cast')}</h2>
            <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
              {cast.map(person => (
                <div key={person.id} className="min-w-[140px] border dark:border-gray-800 rounded-xl shadow-sm bg-white dark:bg-[#0d253f] overflow-hidden hover:shadow-md transition-shadow">
                  <img src={person.profile_path ? `${IMAGE_BASE_URL}/w185${person.profile_path}` : 'https://via.placeholder.com/185x278'} className="w-full h-[175px] object-cover" alt={person.name} />
                  <div className="p-3">
                    <p className="font-bold text-[14px] text-black dark:text-white">{person.name}</p>
                    <p className="text-gray-500 dark:text-gray-400 text-[12px]">{person.character}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Social / Review Section */}
          <section className="mb-10 border-t pt-8 font-sans">
            <div className="flex items-center gap-8 mb-6">
              <h2 className="text-2xl font-bold text-black dark:text-white">{t('movie_details.social')}</h2>
              <div
                className={`flex gap-6 text-[17px] font-semibold cursor-pointer pb-2 transition-all ${activeSocialTab === 'reviews' ? 'border-b-[4px] border-black dark:border-[#01b4e4] text-black dark:text-[#01b4e4]' : 'text-gray-500 dark:text-gray-400'}`}
                onClick={() => setActiveSocialTab('reviews')}
              >
                <span>{t('movie_details.reviews')} <span className="text-gray-400 font-normal ml-1">{reviews ? '1' : '0'}</span></span>
              </div>
              <div
                className={`text-[17px] font-semibold cursor-pointer pb-2 transition-all hover:text-black dark:hover:text-white ${activeSocialTab === 'discussions' ? 'border-b-[4px] border-black dark:border-[#01b4e4] text-black dark:text-[#01b4e4]' : 'text-gray-500 dark:text-gray-400'}`}
                onClick={() => setActiveSocialTab('discussions')}
              >
                {t('movie_details.discussions')} <span className="text-gray-400 font-normal ml-1">0</span>
              </div>
            </div>

            {activeSocialTab === 'reviews' ? (
              reviews ? (
                <div className="border border-gray-200 dark:border-gray-800 rounded-xl shadow-md p-6 bg-white dark:bg-[#0d253f]">
                  <div className="flex items-center gap-4 mb-5">
                    <div className="w-12 h-12 bg-[#01b4e4] rounded-full flex items-center justify-center text-white font-bold text-xl uppercase shadow-sm overflow-hidden">
                      {reviews.author_details?.avatar_path ? (
                        <img src={`${IMAGE_BASE_URL}/w45${reviews.author_details.avatar_path}`} className="w-full h-full object-cover" alt={reviews.author} />
                      ) : reviews.author[0]}
                    </div>
                    <div className="flex flex-col">
                      <div className="flex items-center gap-3 flex-wrap">
                        <h3 className="font-bold text-[1.2rem] text-black dark:text-white hover:text-gray-700 dark:hover:text-[#01b4e4] transition-colors cursor-pointer">
                          {t('movie_details.review_by')} {reviews.author}
                        </h3>
                        {reviews.author_details?.rating && (
                          <div className="bg-[#032541] dark:bg-[#01b4e4] text-white text-[11px] px-2 py-0.5 rounded-[5px] flex items-center gap-1 font-bold rtl:flex-row-reverse">
                            <FaStar size={9} /> {reviews.author_details.rating * 10}%
                          </div>
                        )}
                      </div>
                      <p className="text-[14px] text-gray-500 dark:text-gray-400 mt-1">
                        {t('movie_details.written_by')} <span className="text-black dark:text-white font-semibold">{reviews.author}</span> {t('movie_details.on')} {new Date(reviews.created_at).toLocaleDateString(
                          i18n.language === 'en' ? 'en-US' :
                            i18n.language === 'fr' ? 'fr-FR' :
                              i18n.language === 'it' ? 'it-IT' :
                                i18n.language === 'es' ? 'es-ES' :
                                  i18n.language === 'de' ? 'de-DE' : 'ar-EG',
                          { month: 'long', day: 'numeric', year: 'numeric' }
                        )}
                      </p>
                    </div>
                  </div>
                  <div className="text-[15px] leading-relaxed text-gray-800 dark:text-gray-200 px-1">
                    <div className="line-clamp-4 italic">{reviews.content}</div>
                    <button className="text-black dark:text-[#01b4e4] underline font-bold mt-3 hover:text-gray-600 dark:hover:text-white block transition-colors">{t('movie_details.read_rest')}</button>
                  </div>
                </div>
              ) : (
                <div className="p-10 bg-gray-50 dark:bg-[#0d141e] rounded-xl text-center text-gray-400 italic border-2 border-dashed border-gray-200 dark:border-gray-800">{t('movie_details.no_reviews')}</div>
              )
            ) : (
              <div className="p-10 bg-gray-50 dark:bg-[#0d141e] rounded-xl text-center text-gray-400 italic border-2 border-dashed border-gray-200 dark:border-gray-800">{t('movie_details.no_discussions')}</div>
            )}
          </section>

          {/* Media Section */}
          <section className="mb-10 border-t pt-8 font-sans">
            <div className="flex items-center gap-8 mb-6 overflow-x-auto scrollbar-hide">
              <h2 className="text-2xl font-bold text-black dark:text-white">{t('movie_details.media')}</h2>
              {[
                { key: 'videos', label: t('movie_details.videos'), count: videos.length },
                { key: 'backdrops', label: t('movie_details.backdrops'), count: images.backdrops.length },
                { key: 'posters', label: t('movie_details.posters'), count: images.posters.length },
              ].map(tab => (
                <div
                  key={tab.key}
                  onClick={() => setActiveMediaTab(tab.key)}
                  className={`cursor-pointer pb-2 whitespace-nowrap text-[17px] font-semibold transition-all ${activeMediaTab === tab.key
                    ? 'border-b-[4px] border-black dark:border-[#01b4e4] text-black dark:text-[#01b4e4]'
                    : 'text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white'
                    }`}
                >
                  {tab.label} <span className="text-gray-400 font-normal ml-1">{tab.count}</span>
                </div>
              ))}
            </div>

            <div className="flex gap-2 overflow-x-auto pb-4 scrollbar-hide rounded-xl">
              {activeMediaTab === 'videos' && (
                videos.length > 0 ? videos.slice(0, 5).map((video) => (
                  <div
                    key={video.id}
                    onClick={() => { setActiveVideo(video); setShowTrailer(true); }}
                    className="relative min-w-[350px] md:min-w-[530px] h-[200px] md:h-[300px] group cursor-pointer overflow-hidden bg-black"
                  >
                    <img
                      src={`https://img.youtube.com/vi/${video.key}/maxresdefault.jpg`}
                      className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity"
                      alt={video.name}
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-16 h-16 bg-black/60 rounded-full flex items-center justify-center group-hover:bg-[#01b4e4] transition-all duration-300">
                        <FaPlay className="text-white ml-1 rtl:rotate-180" size={25} />
                      </div>
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                      <p className="text-white font-bold">{video.name}</p>
                    </div>
                  </div>
                )) : (
                  <div className="w-full h-[200px] bg-gray-100 dark:bg-[#081c22] rounded-xl flex items-center justify-center text-gray-400 dark:text-gray-500 italic border border-gray-200 dark:border-gray-800">{t('movie_details.no_videos')}</div>
                )
              )}

              {activeMediaTab === 'backdrops' && (
                images.backdrops.length > 0 ? images.backdrops.map((img, i) => (
                  <img
                    key={i}
                    src={`${IMAGE_BASE_URL}/w500${img.file_path}`}
                    className="h-[200px] rounded-xl shadow-sm object-cover"
                    alt="backdrop"
                  />
                )) : (
                  <div className="w-full h-[200px] bg-gray-100 dark:bg-[#081c22] rounded-xl flex items-center justify-center text-gray-400 italic">
                    No backdrops available
                  </div>
                )
              )}

              {activeMediaTab === 'posters' && (
                images.posters.length > 0 ? images.posters.map((img, i) => (
                  <img
                    key={i}
                    src={`${IMAGE_BASE_URL}/w185${img.file_path}`}
                    className="h-[250px] rounded-xl shadow-sm object-cover"
                    alt="poster"
                  />
                )) : (
                  <div className="w-full h-[200px] bg-gray-100 dark:bg-[#081c22] rounded-xl flex items-center justify-center text-gray-400 italic">
                    No posters available
                  </div>
                )
              )}
            </div>
          </section>

          {/* Recommendations */}
          <section className="border-t pt-8 mb-10">
            <h2 className="text-2xl font-bold mb-6 text-black dark:text-white">{t('movie_details.recommendations')}</h2>
            {recommendations.length > 0 ? (
              <div className="flex gap-4 overflow-x-auto pb-6 scrollbar-hide">
                {recommendations.map(item => (
                  <div
                    key={item.id}
                    onClick={() => navigate(`/movie/${item.id}`)}
                    className="min-w-[250px] group cursor-pointer hover:opacity-80 transition-opacity"
                  >
                    <img src={item.backdrop_path ? `${IMAGE_BASE_URL}/w500${item.backdrop_path}` : 'https://via.placeholder.com/500x281'} className="rounded-xl mb-2 shadow-sm dark:shadow-black w-full h-[140px] object-cover" alt={item.title} />
                    <div className="flex justify-between text-sm">
                      <p className="truncate font-medium w-[80%] text-black dark:text-white text-left rtl:text-right">{item.title}</p>
                      <span className="font-bold text-green-600 rtl:mr-auto rtl:ml-0">{Math.round(item.vote_average * 10)}%</span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-10 bg-gray-50 dark:bg-[#0d141e] rounded-xl text-center text-gray-400 italic border-2 border-dashed border-gray-200 dark:border-gray-800">
                No recommendations available
              </div>
            )}
          </section>

          {/* Collection/Series */}
          {collection && (
            <section className="border-t pt-8">
              <h2 className="text-2xl font-bold mb-6 text-black dark:text-white">
                Part of {collection.name}
              </h2>
              <div
                className="relative rounded-xl overflow-hidden text-white p-8 bg-cover bg-center"
                style={{
                  backgroundImage: `linear-gradient(to right, rgba(3,37,65,0.9), rgba(3,37,65,0.6)), url(${IMAGE_BASE_URL}/original${collection.backdrop_path})`
                }}
              >
                <h3 className="text-2xl font-bold mb-2">{collection.name}</h3>
                <p className="text-sm opacity-80 mb-6">Includes {collection.parts?.length} movies</p>
                <div className="flex gap-4 overflow-x-auto pb-2">
                  {collection.parts?.map(part => (
                    <div
                      key={part.id}
                      onClick={() => navigate(`/movie/${part.id}`)}
                      className="min-w-[120px] cursor-pointer hover:opacity-80 transition-opacity"
                    >
                      <img
                        src={part.poster_path ? `${IMAGE_BASE_URL}/w200${part.poster_path}` : 'https://via.placeholder.com/200x300?text=No+Image'}
                        className="rounded-lg shadow-lg w-full"
                        alt={part.title}
                      />
                      <p className="text-xs mt-2 text-center truncate">{part.title}</p>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          )}

        </div>

        {/* Right Column: Sidebar */}
        <div className="lg:w-1/4 flex flex-col gap-6 text-black dark:text-white text-left rtl:text-right">
          <div className="flex gap-6 mb-4 text-2xl">
            <a href={`https://www.imdb.com/title/${movie.imdb_id}`} target="_blank" rel="noreferrer">
              <FaLink className="cursor-pointer hover:text-[#01b4e4] transition-colors" />
            </a>
          </div>
          <div>
            <p className="font-bold">{t('movie_details.status')}</p>
            <p className="text-gray-600 dark:text-gray-400">{movie.status}</p>
          </div>
          <div>
            <p className="font-bold">{t('movie_details.original_language')}</p>
            <p className="text-gray-600 dark:text-gray-400">{t('movie_details.english')}</p>
          </div>
          <div>
            <p className="font-bold">{t('movie_details.budget')}</p>
            <p className="text-gray-600 dark:text-gray-400">${movie.budget?.toLocaleString() || '-'}</p>
          </div>
          <div>
            <p className="font-bold">{t('movie_details.revenue')}</p>
            <p className="text-gray-600 dark:text-gray-400">${movie.revenue?.toLocaleString() || '-'}</p>
          </div>
        </div>

      </div>
    </div>
  );
};

export default MovieDetails;