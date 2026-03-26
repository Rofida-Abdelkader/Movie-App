import axios from 'axios'

const API_KEY = import.meta.env.VITE_API_KEY
const BASE_URL = 'https://api.themoviedb.org/3'

export const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500'

const api = axios.create({
  baseURL: BASE_URL,
  params: {
    api_key: API_KEY,
  },
})

export const getMovieDetails = (id) => api.get(`/movie/${id}`)
export const getMovieRecommendations = (id) => api.get(`/movie/${id}/recommendations`)
export const getMovieVideos = (id) => api.get(`/movie/${id}/videos`)
export const getNowPlaying = (page = 1) => api.get('/movie/now_playing', { params: { page } })
export const searchMovies = (query, page = 1) => api.get('/search/movie', { params: { query, page } })
export const getGenres = () => api.get('/genre/movie/list')
export const getPopular = () => api.get('/movie/popular');
export const getFreeToWatch = () => api.get('/movie/upcoming');
export default api