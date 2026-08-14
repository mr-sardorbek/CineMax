import { MovieCard } from "@/components"
import { Skeleton } from "@/components/ui/skeleton"
import { getNowPlayingMovies, getPopularMovies, getTopRatedMovies, getUpcomingMovies, IMAGE_BASE_URL } from "@/services/tmdbAPI"
import { useEffect, useState } from "react"
import { toast } from "sonner"


const Movies = () => {
  const [popularMovies, setPopularMovies] = useState([])
  const [topRatedMovies, setTopRatedMovies] = useState([])
  const [nowPlayingMovies, setNowPlayingMovies] = useState([])
  const [upcomingMovies, setUpcomingMovies] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadMovies = async() => {
      try {
        const popularMoviesData = await getPopularMovies()
        const topRatedMoviesData = await getTopRatedMovies()
        const nowPlayingMoviesData = await getNowPlayingMovies()
        const upcomingMoviesData = await getUpcomingMovies()

        setPopularMovies(popularMoviesData.results)
        setTopRatedMovies(topRatedMoviesData.results)
        setNowPlayingMovies(nowPlayingMoviesData.results)
        setUpcomingMovies(upcomingMoviesData.results)

      } catch (error) {
        toast.error("Failed to load movies", {
          description: "Please check your internet connection and try again!",
          className: "border-red-500/30 bg-red-950 text-white",
          position: "top-center",
        })
      } finally {
        setLoading(false)
      }
    }
    loadMovies()
  },[])
  return (
    <main>
    <section className="mx-auto max-w-7xl px-5 py-8 md:px-8 md:py-10">
    <div>
      <h1 className="mb-6 text-3xl font-bold text-black mt-22">Movies</h1>
    </div>

    {loading ? (
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6 lg:grid-cols-5">
  {Array.from({ length: 5 }).map((_, index) => (
    <div key={index} className="space-y-3">
      <Skeleton className="aspect-[2/3] w-full rounded-xl" />
      <Skeleton className="h-5 w-3/4" />
      <Skeleton className="h-4 w-1/2" />
    </div>
  ))}
</div>
    ) : (
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6 lg:grid-cols-5">
          {popularMovies.map((movie) => (
            <MovieCard
             key={movie.id}
             id={movie.id}
            title={movie.title}
            rating={movie.vote_average}
            year={movie.release_date?.slice(0,4)}
            image={`${IMAGE_BASE_URL}${movie.poster_path}`}/>
          ))}
        </div>
    )}
    </section>
    
    <section className="mx-auto max-w-7xl px-5 py-8 md:px-8 md:py-10">
    <div>
      <h2 className="mb-6 text-3xl font-bold text-black ">Top Rated</h2>
    </div>
    <div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6 lg:grid-cols-5">
          {topRatedMovies.map((movie) => (
            <MovieCard
             key={movie.id}
             id={movie.id}
            title={movie.title}
            rating={movie.vote_average}
            year={movie.release_date?.slice(0,4)}
            image={`${IMAGE_BASE_URL}${movie.poster_path}`}/>
          ))}
        </div>
    </section>

    <section className="mx-auto max-w-7xl px-5 py-8 md:px-8 md:py-10">
    <div>
      <h2 className="mb-6 text-3xl font-bold text-black ">Now Playing</h2>
    </div>
    <div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6 lg:grid-cols-5">
          {nowPlayingMovies.map((movie) => (
            <MovieCard
             key={movie.id}
             id={movie.id}
            title={movie.title}
            rating={movie.vote_average}
            year={movie.release_date?.slice(0,4)}
            image={`${IMAGE_BASE_URL}${movie.poster_path}`}/>
          ))}
        </div>
    </section>

    <section className="mx-auto max-w-7xl px-5 py-8 md:px-8 md:py-10">
    <div>
      <h2 className="mb-6 text-3xl font-bold text-black ">Upcoming</h2>
    </div>
    <div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6 lg:grid-cols-5">
          {upcomingMovies.map((movie) => (
            <MovieCard
             key={movie.id}
             id={movie.id}
            title={movie.title}
            rating={movie.vote_average}
            year={movie.release_date?.slice(0,4)}
            image={`${IMAGE_BASE_URL}${movie.poster_path}`}/>
          ))}
        </div>
    </section>
    </main>
  )
}

export default Movies
