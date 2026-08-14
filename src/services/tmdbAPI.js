const API_KEY = import.meta.env.VITE_TMDB_API_KEY
const BASE_URL = "https://api.themoviedb.org/3"
const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500"

const getTrendingMovies = async ()=> {
    const response = await fetch(`${BASE_URL}/trending/movie/week?api_key=${API_KEY}`)
    const data = await response.json()
    return data
}

const getTrendingTVShows = async ()=> {
    const response = await fetch(`${BASE_URL}/trending/tv/week?api_key=${API_KEY}`)
    const data = await response.json()
    return data
}


const getPopularMovies = async () => {
    const response = await fetch(`${BASE_URL}/movie/popular?api_key=${API_KEY}`)
    const data = await response.json()
    return data
}


const getTopRatedMovies = async () => {
    const response = await fetch(`${BASE_URL}/movie/top_rated?api_key=${API_KEY}`)
    const data = await response.json()
    return data
}

const getNowPlayingMovies = async() => {
    const response = await fetch(`${BASE_URL}/movie/now_playing?api_key=${API_KEY}`)
    const data = await response.json()
    return data
}

const getUpcomingMovies = async () => {
    const response = await fetch(`${BASE_URL}/movie/upcoming?api_key=${API_KEY}`)
    const data = await response.json()
    return data
}

const getPopularTVShows = async () => {
    const response = await fetch(`${BASE_URL}/tv/popular?api_key=${API_KEY}`)
    const data = await response.json()
    return data
}

const getTopRatedTVShows = async () => {
    const response = await fetch(`${BASE_URL}/tv/top_rated?api_key=${API_KEY}`)
    const data = await response.json()
    return data
}

const getAiringToday = async () => {
    const response = await fetch(`${BASE_URL}/tv/airing_today?api_key=${API_KEY}`)
    const data = await response.json()
    return data
}

const getOnTheAir = async () => {
    const response = await fetch(`${BASE_URL}/tv/on_the_air?api_key=${API_KEY}`)
    const data = await response.json()
    return data
}

const searchMulti = async (query) => {
    const response = await fetch(`${BASE_URL}/search/multi?api_key=${API_KEY}&query=${encodeURIComponent(query)}`)
    const data = await response.json()
    return data
}

const getMovieDetails = async (id) => {
    const response = await fetch(`${BASE_URL}/movie/${id}?api_key=${API_KEY}`)
    const data = await response.json()
    return data
}

const getMovieVideos = async (id) => {
    const response = await fetch(`${BASE_URL}/movie/${id}/videos?api_key=${API_KEY}`)
    const data = await response.json()
    return data
}
export  {
    IMAGE_BASE_URL,
    getTrendingMovies,
    getPopularMovies,
    getTopRatedMovies,
    getNowPlayingMovies,
    getUpcomingMovies,
    getPopularTVShows,
    getTopRatedTVShows,
    getAiringToday,
    getOnTheAir,
    getTrendingTVShows,
    searchMulti,
    getMovieDetails,
    getMovieVideos
}