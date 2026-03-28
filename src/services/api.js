import axios from 'axios'

const API_KEY = import.meta.env.VITE_TMDB_API_KEY
const BASE_URL = 'https://api.themoviedb.org/3'

export const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500'

const api = axios.create({
  baseURL: BASE_URL,
  params: {
    api_key: API_KEY,
  },
})

export const getTMDBLanguage = (lang) => {
  switch (lang) {
    case 'ar': return 'ar-SA';
    case 'fr': return 'fr-FR';
    case 'it': return 'it-IT';
    case 'es': return 'es-ES';
    case 'de': return 'de-DE';
    default: return 'en-US';
  }
};

export const getMovieDetails = (id, language) => api.get(`/movie/${id}`, { params: { language: getTMDBLanguage(language) } })
export const getMovieRecommendations = (id, language) => api.get(`/movie/${id}/recommendations`, { params: { language: getTMDBLanguage(language) } })
export const getMovieVideos = (id, language) => api.get(`/movie/${id}/videos`, { params: { language: getTMDBLanguage(language) } })
export const getMovieCredits = (id, language) => api.get(`/movie/${id}/credits`, { params: { language: getTMDBLanguage(language) } })
export const getMovieReviews = (id, language) => api.get(`/movie/${id}/reviews`, { params: { language: getTMDBLanguage(language) } })
export const discoverMovies = (params) => {
  const { language, ...rest } = params;
  return api.get('/discover/movie', { params: { ...rest, language: getTMDBLanguage(language) } });
}
export const searchMovies = (query, page, language) =>
  api.get("/search/movie", {
    params: { query, page, language: getTMDBLanguage(language) }
  })

export const getGenres = (language) =>
  api.get("/genre/movie/list", { params: { language: getTMDBLanguage(language) } })
export const getNowPlaying = (language) => api.get('/movie/now_playing', { params: { language: getTMDBLanguage(language) } });
export const getPopular = (language) => api.get('/movie/popular', { params: { language: getTMDBLanguage(language) } });
export const getFreeToWatch = (language) => api.get('/movie/upcoming', { params: { language: getTMDBLanguage(language) } });
export default api