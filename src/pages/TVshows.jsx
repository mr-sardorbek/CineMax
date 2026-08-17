import { MovieCard } from "@/components"
import { Skeleton } from "@/components/ui/skeleton"
import { getAiringToday, getOnTheAir, getPopularTVShows, getTopRatedTVShows, IMAGE_BASE_URL } from "@/services/tmdbAPI"
import { useEffect, useState } from "react"
import { toast } from "sonner"


const TVshows = () => {
  const [popularTVShows, setPopularTVShows] = useState([])
  const [topRatedTVShows, setTopRatedTVShows] = useState([])
  const [airingToday, setAiringToday] = useState([])
  const [onTheAir, setOnTheAir] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadTVShows = async () => {
      try {
        const popularTVShowsData = await getPopularTVShows()
        const topRatedTVShowsData = await getTopRatedTVShows()
        const airingTodayData = await getAiringToday()
        const onTheAirData = await getOnTheAir()

        setPopularTVShows(popularTVShowsData.results)
        setTopRatedTVShows(topRatedTVShowsData.results)
        setAiringToday(airingTodayData.results)
        setOnTheAir(onTheAirData.results)
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
    loadTVShows()
  },[])
  return (
    <main>
      <section className="mx-auto max-w-7xl px-5 py-8 md:px-8 md:py-10">
    <div>
      <h1 className="mb-6 text-3xl font-bold text-foreground mt-22">Popular TV Shows</h1>
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
          {popularTVShows.map((show) => (
            <MovieCard
             key={show.id}
             id={show.id}
            title={show.name}
            rating={show.vote_average}
            year={show.first_air_date?.slice(0, 4)}
            image={`${IMAGE_BASE_URL}${show.poster_path}`}/>
          ))}
        </div>
    )}
    </section>

    <section className="mx-auto max-w-7xl px-5 py-8 md:px-8 md:py-10">
    <div>
      <h2 className="mb-6 text-3xl font-bold text-foreground">Top Rated TV Shows</h2>
    </div>
    <div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6 lg:grid-cols-5">
          {topRatedTVShows.map((show) => (
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

    <section className="mx-auto max-w-7xl px-5 py-8 md:px-8 md:py-10">
    <div>
      <h2 className="mb-6 text-3xl font-bold text-foreground">Airing Today</h2>
    </div>
    <div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6 lg:grid-cols-5">
          {airingToday.map((show) => (
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

    <section className="mx-auto max-w-7xl px-5 py-8 md:px-8 md:py-10">
    <div>
      <h2 className="mb-6 text-3xl font-bold text-foreground">On The Air</h2>
    </div>
    <div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6 lg:grid-cols-5">
          {onTheAir.map((show) => (
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

export default TVshows
