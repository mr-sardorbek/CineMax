import { Info, Play, Star } from "lucide-react";
import { Button } from "./ui/button";
import genreMap from "@/constants/genreMap";

const Hero = ({ movie }) => {
  console.log("GENRES:", movie?.genre_ids)
  
  const genres = movie?.genre_ids?.map((id) => genreMap[id]).filter(Boolean)
  return (
    <section
      className="relative h-[600px] bg-cover bg-center"
      style={{
        backgroundImage: `url(https://image.tmdb.org/t/p/original${movie?.backdrop_path})`,
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-black via-black/60 to-transparent">
      
        <div className="relative z-10 mx-auto flex h-full max-w-7xl items-center px-8 pt-25">
          <div>
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-purple-400">
  {genres?.join(" • ")}
</p>
          <h1 className="mb-4 max-w-2xl text-4xl font-bold leading-tight text-white sm:text-5xl md:text-6xl">
            {movie?.title}
          </h1>
          <div className=" flex items-center gap-3 text-sm text-gray-300">
            <span className="flex items-center gap-1.5">
              <Star size={16} className="fill-current text-yellow-400"/>
              <span className="font-medium text-white">
                {movie?.vote_average?.toFixed(1)}
                </span>
              </span>
             
             <span className="text-gray-500">•</span>
            <span>{movie?.release_date?.slice(0, 4)}</span>
          </div>
          <p className="mt-5 line-clamp-4 max-w-xl text-sm leading-7 text-gray-300 md:line-clamp-none md:text-base">{movie?.overview}</p>
          <div className="mt-7 flex items-center gap-3">
            <Button className={`gap-2 rounded-full px-6 cursor-pointer`}>
              <Play size={18}/>
              Watch Now
            </Button>
            <Button variant="outline" className={`gap-2 rounded-full border-white/30 bg-white/10 px-6 text-white
              backdrop-blur-sm hover:bg-white/20 cursor-pointer`}>
              <Info size={18}/>
              More Info
              </Button>
          </div>
          </div>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 h-32 w-full bg-gradient-to-t from-black to-transparent" />
    </section>
  );
};

export default Hero;
