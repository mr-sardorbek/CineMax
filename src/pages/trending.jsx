import { MovieCard } from "@/components"
import { Skeleton } from "@/components/ui/skeleton"
import { getTrendingMovies, getTrendingTVShows, IMAGE_BASE_URL } from "@/services/tmdbAPI"
import { useEffect, useState } from "react"
import { toast } from "sonner"


const Trending = () => {
  const [trendingMovies, setTrendingMovies] = useState([])
  const [trendingTVShows, setTrendingTVShows] = useState([])
   const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadTrending = async() => {
      try {
       const trendingMoviesData = await getTrendingMovies()
       const trendingTVShowsData = await getTrendingTVShows()

       setTrendingMovies(trendingMoviesData.results)
       setTrendingTVShows(trendingTVShowsData.results)

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
    loadTrending()
  },[])
  return (
    <main>
       <section className="mx-auto max-w-7xl px-5 py-8 md:px-8 md:py-10">
    <div>
      <h1 className="mb-6 text-3xl font-bold text-foreground mt-22">Trending Movies</h1>
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
          {trendingMovies.map((movie) => (
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
      <h2 className="mb-6 text-3xl font-bold text-foreground">Trending TV Shows</h2>
    </div>
    <div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6 lg:grid-cols-5">
          {trendingTVShows.map((show) => (
            <MovieCard
             key={show.id}
             id={show.id}
            title={show.name}
            rating={show.vote_average}
            year={show.first_air_date?.slice(0, 4)}
            image={`${IMAGE_BASE_URL}${show.poster_path}`}/>
          ))}
        </div>
    </section>
    </main>
  )
}

export default Trending
