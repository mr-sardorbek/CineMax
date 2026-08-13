const API_KEY = import.meta.env.VITE_TMDB_API_KEY
const BASE_URL = "https://api.themoviedb.org/3"
const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500"

const getTrendingMovies = async ()=> {
    const response = await fetch(`${BASE_URL}/trending/movie/week?api_key=${API_KEY}`)
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


export  {
    IMAGE_BASE_URL,
    getTrendingMovies,
    getPopularMovies,
    getTopRatedMovies
}