import { getMovieDetails, getMovieVideos, IMAGE_BASE_URL } from "@/services/tmdbAPI"
import { Star } from "lucide-react"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { toast } from "sonner"


const MovieDetails = () => {
    const [movie, setMovie] = useState(null)
    const [trailer, setTrailer] = useState(null)

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
                    <button className="rounded-lg bg-purple-600 px-6 py-3 font-medium text-white transition-colors hover:bg-purple-700"
                    >Watch Trailer</button>
                  </div>
                </div>
            </div>
        </div>
      </section>
    </main>
  )
}

export default MovieDetails
