import { MovieCard } from "@/components"
import { Button } from "@/components/ui/button"
import { getMovieCredits, getMovieDetails, getMovieVideos, getSimilarMovies, IMAGE_BASE_URL } from "@/services/tmdbAPI"
import { Star, X } from "lucide-react"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { toast } from "sonner"


const MovieDetails = () => {
    const [movie, setMovie] = useState(null)
    const [trailer, setTrailer] = useState(null)
    const [credits, setCredits] = useState(null)
    const [similarMovies, setSimilarMovies] = useState([])
    const [isTrailerOpen, setIsTrailerOpen] = useState(false)

    const {id} = useParams()
    
    
    useEffect(() => {
    
         const loadMovie = async () => {
            try {
                const movieDetailsData = await getMovieDetails(id)
                
                
                setMovie(movieDetailsData)
            console.log("Movie data", movieDetailsData)
            } catch (error) {
                console.log(error);
                toast.error("Failed to load movies", {
          description: "Please check your internet connection and try again!",
          className: "border-red-500/30 bg-red-950 text-white",
          position: "top-center",
        })
            }
         }
         loadMovie()
    },[id])

    useEffect(() => {
          const trailerMovie = async () => {
            try {
              const trailerData = await getMovieVideos(id)

              const officialTrailer = trailerData.results.find(
                (video) => 
                  video.site === "YouTube" &&
                  video.type === "Trailer" &&
                  video.official === true
              )

              const trailer = officialTrailer || trailerData.results.find(
                (video) =>
                  video.site === "YouTube" &&
                  video.type === "Trailer"
              )

              setTrailer(trailer || null)
             console.log("TRAILER:", trailer)
            } catch (error) {
              console.log(error);
                toast.error("Failed to load movies", {
          description: "Please check your internet connection and try again!",
          className: "border-red-500/30 bg-red-950 text-white",
          position: "top-center",
        })
              
            }
          }
          trailerMovie()
    },[id])


    useEffect(() => {
          const loadCredits = async () => {
            try {
              const movieCredits = await getMovieCredits(id)

              setCredits(movieCredits)
              console.log(movieCredits)
            } catch (error) {
                 console.log(error);
                toast.error("Failed to load movies", {
          description: "Please check your internet connection and try again!",
          className: "border-red-500/30 bg-red-950 text-white",
          position: "top-center",
        })
            }
          }
          loadCredits()
    },[id])


    useEffect(() => {
  const loadSimilarMovies = async () => {
    try {
      const similarMoviesData = await getSimilarMovies(id)

      setSimilarMovies(similarMoviesData.results)
    } catch (error) {
      console.log(error);
                toast.error("Failed to load movies", {
          description: "Please check your internet connection and try again!",
          className: "border-red-500/30 bg-red-950 text-white",
          position: "top-center",
        })
    }
  }

  loadSimilarMovies()
}, [id])

    if (!movie) {
  return <div className="loading">Loading movie details...</div>;
}

  return (
    <main className="bg-white">
        <section className="relative min-h-[700px] overflow-hidden ">
        <div className="absolute inset-x-0 top-0 h-[650px] overflow-hidden">
          <img src={`${IMAGE_BASE_URL}${movie.backdrop_path}`} alt={movie.title}
          className="w-full h-full object-cover"/>
          <div className="absolute inset-0 bg-black/60"></div>
        </div>

        <div className="mx-auto -mt-64 max-w-7xl px-5 md:px-8">
            <div className="relative z-10 mx-auto flex max-w-7xl items-end gap-8 px-5 pt-[380px] pb-16 md:px-8">
                <div className="hidden w-64 shrink-0 md:block">
                    <img src={`${IMAGE_BASE_URL}${movie.poster_path}`} alt={movie.title} 
                    className="w-full rounded-2xl shadow-2xl"/>
                </div>
                <div className="flex-1 pb-4 mt-2 text-white">
                  <h1 className="text-4xl font-bold md:text-5xl">{movie.title}</h1>

                  <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-gray-300">
                    <span className="flex items-center gap-1">
                      <Star size={14} className="fill-current text-yellow-400"/>
                      {movie.vote_average?.toFixed(1)}
                    </span>
                      <span>{movie.release_date}</span>
                      <span>{movie.runtime} min</span>
                  </div>

                  <div className="mt-5 flex flex-wrap gap-2">
                    {movie.genres.map((genre) => (
                      <span
                      key={genre.id}
                       className="rounded-full bg-purple-100 px-3 py-1 text-sm text-purple-600">
                        {genre.name}
                      </span>
                    ))}
                  </div>

                  <div className="mt-8 max-w-3xl">
                      <h2 className="text-2xl font-bold">Overview</h2>
                      <p className="mt-3 leading-7 text-gray-300">{movie.overview}</p>
                  </div>

                  <div className="mt-8">
                    <Button className="bg-purple-600 px-6 py-5 cursor-pointer font-medium text-white hover:bg-purple-700"
                    onClick={() => setIsTrailerOpen(true)}>Watch Trailer</Button>
                  </div>
                </div>
            </div>
        </div>
      </section>

      {isTrailerOpen && trailer && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 p-5">
          <div className="relative w-full max-w-4xl">
            <div className="aspect-video overflow-hidden rounded-xl">
               <iframe 
               className="h-full w-full"
               src={`https://www.youtube.com/embed/${trailer.key}?autoplay=1`}
               title={`${movie.title} Trailer`}
               allow="autoplay; encrypted-media"
               allowFullScreen/>
            </div>

             <Button className="absolute -right-3 -top-9 flex h-8 w-8 items-center justify-center rounded-full text-xl
             cursor-pointer text-black hover:bg-gray-200 bg-white"
             onClick={() => setIsTrailerOpen(false)}  variant="ghost" size="icon">
              <X size={20}/>
             </Button>
          </div>

        </div>
      )}

      <section className="mx-auto max-w-7xl px-5 py-12 md:px-8">
        <h2 className="mb-6 text-2xl font-bold text-black">
          Cast
        </h2>

        <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
          {credits?.cast?.slice(0,6).map((actor) => (
            <div key={actor.id}>
                 <img src={actor.profile_path ? `${IMAGE_BASE_URL}${actor.profile_path}` : "/placeholder-person.png"} alt={actor.name} 
                 className="aspect-[2/3] w-full rounded-3xl object-cover"/>
                 <h3 className="mt-3 font-semibold text-black">
                  {actor.name}
                 </h3>
                 <p className="mt-1 text-sm text-gray-500">
                  {actor.character}
                 </p>
            </div>
          ))}

        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-10 md:px-8">
  <h2 className="mb-6 text-2xl font-bold text-black">
    Similar Movies
  </h2>

  <div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6 lg:grid-cols-5">
    {similarMovies.slice(0, 10).map((movie) => (
      <MovieCard
        key={movie.id}
        id={movie.id}
        title={movie.title}
        rating={movie.vote_average}
        year={movie.release_date?.slice(0, 4)}
        image={`${IMAGE_BASE_URL}${movie.poster_path}`}
      />
    ))}
  </div>
</section>
    </main>
  )
}

export default MovieDetails
