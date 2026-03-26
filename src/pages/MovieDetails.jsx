import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { FaPlay, FaList, FaHeart, FaBookmark, FaStar, FaLink, FaTimes } from 'react-icons/fa';

const MovieDetails = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [cast, setCast] = useState([]);
  const [reviews, setReviews] = useState(null);
  const [recommendations, setRecommendations] = useState([]);
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);

  // --- حالات التشغيل الجديدة (Interactive States) ---
  const [showTrailer, setShowTrailer] = useState(false); // للمودال الخاص بالتريلر
  const [activeSocialTab, setActiveSocialTab] = useState('reviews'); // للتحكم في قسم Social
  const [activeMediaTab, setActiveMediaTab] = useState('popular'); // للتحكم في قسم Media

  const API_KEY = import.meta.env.VITE_API_KEY;
  const IMAGE_BASE_URL = "https://image.tmdb.org/t/p";

  useEffect(() => {
    if (!id || !API_KEY) return;

    const fetchData = async () => {
      try {
        setLoading(true);
        window.scrollTo(0, 0);

        const [movieRes, castRes, reviewRes, recRes, videoRes] = await Promise.all([
          fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}`),
          fetch(`https://api.themoviedb.org/3/movie/${id}/credits?api_key=${API_KEY}`),
          fetch(`https://api.themoviedb.org/3/movie/${id}/reviews?api_key=${API_KEY}`),
          fetch(`https://api.themoviedb.org/3/movie/${id}/recommendations?api_key=${API_KEY}`),
          fetch(`https://api.themoviedb.org/3/movie/${id}/videos?api_key=${API_KEY}`)
        ]);

        const movieData = await movieRes.json();
        const castData = await castRes.json();
        const reviewData = await reviewRes.json();
        const recData = await recRes.json();
        const videoData = await videoRes.json();

        setMovie(movieData);
        setCast(castData.cast?.slice(0, 10) || []);
        setReviews(reviewData.results?.[0] || null);
        setRecommendations(recData.results?.slice(0, 6) || []);
        
        const trailers = videoData.results?.filter(v => v.type === "Trailer") || [];
        setVideos(trailers);

        document.title = `TMDB | ${movieData.title}`;
      } catch (error) {
        console.error("Error fetching movie data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id, API_KEY]);

  if (loading) return <div className="h-screen flex items-center justify-center bg-[#032541] text-white">Loading...</div>;
  if (!movie) return <div className="h-screen flex items-center justify-center">Movie not found</div>;

  return (
    <div className="font-sans dark:bg-white text-black relative">
      
      {/* --- 0. Trailer Video Modal --- */}
      {showTrailer && videos.length > 0 && (
        <div className="fixed inset-0 z-[1000] bg-black/90 flex items-center justify-center p-4">
          <button 
            onClick={() => setShowTrailer(false)}
            className="absolute top-10 right-10 text-white text-3xl hover:text-[#01b4e4] transition-colors"
          >
            <FaTimes />
          </button>
          <div className="w-full max-w-5xl aspect-video bg-black shadow-2xl">
            <iframe
              className="w-full h-full"
              src={`https://www.youtube.com/embed/${videos[0].key}?autoplay=1`}
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      )}

      {/* 1. Hero Section (Header) */}
      <div
        className="relative w-full text-white bg-cover bg-center"
        style={{ backgroundImage: `linear-gradient(to right, rgba(3, 37, 65, 1) 150px, rgba(3, 37, 65, 0.8) 100%), url(${IMAGE_BASE_URL}/original${movie.backdrop_path})` }}
      >
        <div className="max-w-[1300px] mx-auto px-10 py-10 flex flex-col md:flex-row gap-10">
          <img src={`${IMAGE_BASE_URL}/w500${movie.poster_path}`} className="w-[300px] rounded-xl shadow-2xl" alt={movie.title} />
          <div className="flex flex-col justify-center">
            <h1 className="text-4xl font-bold">{movie.title} <span className="font-normal opacity-70">({movie.release_date?.split('-')[0]})</span></h1>
            <div className="flex items-center gap-3 mt-2 mb-6 text-sm">
              <span className="border px-1 rounded uppercase font-bold text-[12px]">PG-13</span>
              <span>{movie.release_date}</span>
              <span>•</span>
              <span>{movie.genres?.map(g => g.name).join(', ')}</span>
              <span>•</span>
              <span>{Math.floor(movie.runtime / 60)}h {movie.runtime % 60}m</span>
            </div>

            <div className="flex items-center gap-6 mb-8">
              <div className="flex items-center gap-2">
                <div className="w-14 h-14 rounded-full border-4 border-green-500 flex items-center justify-center bg-[#081c22] font-bold text-lg">
                  {Math.round(movie.vote_average * 10)}%
                </div>
                <span className="text-sm font-bold w-10 leading-tight">User Score</span>
              </div>
              <div className="flex gap-3">
                <button onClick={() => alert("Added to List")} className="bg-[#032541] p-3 rounded-full hover:scale-110 transition-all"><FaList size={14} /></button>
                <button onClick={() => alert("Marked as Favorite")} className="bg-[#032541] p-3 rounded-full hover:scale-110 transition-all"><FaHeart size={14} /></button>
                <button onClick={() => alert("Added to Watchlist")} className="bg-[#032541] p-3 rounded-full hover:scale-110 transition-all"><FaBookmark size={14} /></button>
              </div>
              <button 
                onClick={() => setShowTrailer(true)}
                className="flex items-center gap-2 font-bold hover:text-[#01b4e4] transition-colors"
              >
                <FaPlay /> Play Trailer
              </button>
            </div>
            <p className="italic opacity-80 text-lg mb-4">{movie.tagline}</p>
            <h3 className="text-xl font-bold mb-2">Overview</h3>
            <p className="leading-relaxed max-w-3xl">{movie.overview}</p>
          </div>
        </div>
      </div>

      {/* 2. Main Content Grid (Two Columns) */}
      <div className="max-w-[1300px] mx-auto px-10 py-10 flex flex-col lg:flex-row gap-12">

        {/* Left Column */}
        <div className="lg:w-3/4 overflow-hidden">
          
          {/* Top Billed Cast */}
          <section className="mb-10">
            <h2 className="text-2xl font-bold mb-6 text-black">Top Billed Cast</h2>
            <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
              {cast.map(person => (
                <div key={person.id} className="min-w-[140px] border rounded-xl shadow-sm bg-white overflow-hidden hover:shadow-md transition-shadow">
                  <img src={person.profile_path ? `${IMAGE_BASE_URL}/w185${person.profile_path}` : 'https://via.placeholder.com/185x278'} className="w-full h-[175px] object-cover" alt={person.name} />
                  <div className="p-3">
                    <p className="font-bold text-[14px]">{person.name}</p>
                    <p className="text-gray-500 text-[12px]">{person.character}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Social / Review Section */}
          <section className="mb-10 border-t pt-8 font-sans">
            <div className="flex items-center gap-8 mb-6">
              <h2 className="text-2xl font-bold text-black">Social</h2>
              <div 
                className={`flex gap-6 text-[17px] font-semibold cursor-pointer pb-2 ${activeSocialTab === 'reviews' ? 'border-b-[4px] border-black text-black' : 'text-gray-500'}`}
                onClick={() => setActiveSocialTab('reviews')}
              >
                <span>Reviews <span className="text-gray-400 font-normal ml-1">{reviews ? '1' : '0'}</span></span>
              </div>
              <div 
                className={`text-[17px] font-semibold cursor-pointer pb-2 hover:text-black transition-colors ${activeSocialTab === 'discussions' ? 'border-b-[4px] border-black text-black' : 'text-gray-500'}`}
                onClick={() => setActiveSocialTab('discussions')}
              >
                Discussions <span className="text-gray-400 font-normal ml-1">0</span>
              </div>
            </div>

            {activeSocialTab === 'reviews' ? (
              reviews ? (
                <div className="border border-gray-200 rounded-xl shadow-md p-6 bg-white">
                  <div className="flex items-center gap-4 mb-5">
                    <div className="w-12 h-12 bg-[#01b4e4] rounded-full flex items-center justify-center text-white font-bold text-xl uppercase shadow-sm overflow-hidden">
                      {reviews.author_details?.avatar_path ? (
                        <img
                          src={`${IMAGE_BASE_URL}/w45${reviews.author_details.avatar_path}`}
                          className="w-full h-full object-cover"
                          alt={reviews.author}
                        />
                      ) : reviews.author[0]}
                    </div>

                    <div className="flex flex-col">
                      <div className="flex items-center gap-3 flex-wrap">
                        <h3 className="font-bold text-[1.2rem] text-black hover:text-gray-700 cursor-pointer">
                          A review by {reviews.author}
                        </h3>
                        {reviews.author_details?.rating && (
                          <div className="bg-[#032541] text-white text-[11px] px-2 py-0.5 rounded-[5px] flex items-center gap-1 font-bold">
                            <FaStar size={9} /> {reviews.author_details.rating * 10}%
                          </div>
                        )}
                      </div>
                      <p className="text-[14px] text-gray-500 mt-1">
                        Written by <span className="text-black font-semibold">{reviews.author}</span> on {new Date(reviews.created_at).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                      </p>
                    </div>
                  </div>

                  <div className="text-[15px] leading-relaxed text-gray-800 px-1">
                    <div className="line-clamp-4 italic">{reviews.content}</div>
                    <button className="text-black underline font-bold mt-3 hover:text-gray-600 block transition-colors">read the rest</button>
                  </div>
                </div>
              ) : (
                <div className="p-10 bg-gray-50 rounded-xl text-center text-gray-400 italic border-2 border-dashed">No reviews have been added yet.</div>
              )
            ) : (
              <div className="p-10 bg-gray-50 rounded-xl text-center text-gray-400 italic border-2 border-dashed">No discussions yet.</div>
            )}
          </section>

          {/* Media Section */}
          <section className="mb-10 border-t pt-8 font-sans">
            <div className="flex items-center gap-8 mb-6">
              <h2 className="text-2xl font-bold text-black">Media</h2>
              <div className="flex gap-6 text-[17px] font-semibold border-b-[4px] border-black pb-2 cursor-pointer">
                <span>Most Popular</span>
              </div>
              <div className="flex gap-6 text-[17px] font-semibold text-gray-500">
                <span className="hover:text-black cursor-pointer transition-colors">Videos <span className="text-gray-400 font-normal ml-1">{videos.length}</span></span>
                <span className="hover:text-black cursor-pointer transition-colors">Backdrops <span className="text-gray-400 font-normal ml-1">20</span></span>
                <span className="hover:text-black cursor-pointer transition-colors">Posters <span className="text-gray-400 font-normal ml-1">10</span></span>
              </div>
            </div>

            <div className="flex gap-1 overflow-x-auto pb-4 scrollbar-hide rounded-xl">
              {videos.length > 0 ? (
                videos.slice(0, 3).map((video) => (
                  <div key={video.id} onClick={() => setShowTrailer(true)} className="relative min-w-[350px] md:min-w-[530px] h-[200px] md:h-[300px] group cursor-pointer overflow-hidden bg-black">
                    <img
                      src={`https://img.youtube.com/vi/${video.key}/maxresdefault.jpg`}
                      className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity"
                      alt={video.name}
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-16 h-16 bg-black/60 rounded-full flex items-center justify-center group-hover:bg-[#01b4e4] transition-all duration-300">
                        <FaPlay className="text-white ml-1" size={25} />
                      </div>
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                      <p className="text-white font-bold">{video.name}</p>
                    </div>
                  </div>
                ))
              ) : (
                <div className="w-full h-[200px] bg-gray-100 rounded-xl flex items-center justify-center text-gray-400 italic">No videos available.</div>
              )}
            </div>
          </section>

          {/* Recommendations */}
          <section className="border-t pt-8">
            <h2 className="text-2xl font-bold mb-6 text-black">Recommendations</h2>
            <div className="flex gap-4 overflow-x-auto pb-6 scrollbar-hide">
              {recommendations.map(item => (
                <div key={item.id} className="min-w-[250px] group cursor-pointer hover:opacity-80 transition-opacity">
                  <img src={item.backdrop_path ? `${IMAGE_BASE_URL}/w500${item.backdrop_path}` : 'https://via.placeholder.com/500x281'} className="rounded-xl mb-2" alt={item.title} />
                  <div className="flex justify-between text-sm">
                    <p className="truncate font-medium w-[80%] text-black">{item.title}</p>
                    <span className="font-bold text-green-600">{Math.round(item.vote_average * 10)}%</span>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Right Column: Sidebar */}
        <div className="lg:w-1/4 flex flex-col gap-6 text-black">
          <div className="flex gap-6 mb-4 text-2xl">
             {/* جعل الأيقونة تفتح رابط IMDb الرسمي */}
            <a href={`https://www.imdb.com/title/${movie.imdb_id}`} target="_blank" rel="noreferrer">
              <FaLink className="cursor-pointer hover:text-[#01b4e4] transition-colors" />
            </a>
          </div>
          <div>
            <p className="font-bold">Status</p>
            <p className="text-gray-600">{movie.status}</p>
          </div>
          <div>
            <p className="font-bold">Original Language</p>
            <p className="text-gray-600">English</p>
          </div>
          <div>
            <p className="font-bold">Budget</p>
            <p className="text-gray-600">${movie.budget?.toLocaleString() || '-'}</p>
          </div>
          <div>
            <p className="font-bold">Revenue</p>
            <p className="text-gray-600">${movie.revenue?.toLocaleString() || '-'}</p>
          </div>
        </div>

      </div>
    </div>
  );
};

export default MovieDetails;