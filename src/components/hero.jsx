import { Info, Play, Star } from "lucide-react";
import { Button } from "./ui/button";

import useLanguage from "@/hooks/useLanguage";
import genreMap from "./constants/genreMap";

const Hero = ({ movie }) => {
  const { t } = useLanguage();

  const genres = movie?.genre_ids?.map((id) => genreMap[id]).filter(Boolean);

  return (
    <section
      className="relative h-[520px] bg-cover bg-center sm:h-[560px] md:h-[600px] "
      style={{
        backgroundImage: `url(https://image.tmdb.org/t/p/original${movie?.backdrop_path})`,
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-black via-black/60 to-transparent">
        <div className="relative z-10 mx-auto flex h-full max-w-7xl items-center px-5 pt-20 sm:px-8 sm:pt-24 md:px-8 md:pt-25">
          <div className="w-full">
            <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.15em] text-purple-400 sm:mb-4 sm:text-xs sm:tracking-[0.2em]">
              {genres?.join(" • ")}
            </p>

            <h1 className="mb-3 max-w-2xl text-3xl font-bold leading-tight text-white sm:mb-4 sm:text-5xl md:text-6xl">
              {movie?.title}
            </h1>

            <div className="flex items-center gap-2 text-xs text-gray-300 sm:gap-3 sm:text-sm">
              <span className="flex items-center gap-1.5">
                <Star
                  size={15}
                  className="fill-current text-yellow-400 sm:h-4 sm:w-4"
                />

                <span className="font-medium text-white">
                  {movie?.vote_average?.toFixed(1)}
                </span>
              </span>

              <span className="text-gray-500">•</span>

              <span>{movie?.release_date?.slice(0, 4)}</span>
            </div>

            <p className="mt-4 line-clamp-4 max-w-xl text-sm leading-6 text-gray-300 sm:mt-5 sm:leading-7 md:line-clamp-none md:text-base">
              {movie?.overview}
            </p>

            <div className="mt-6 flex flex-col gap-3 sm:mt-7 sm:flex-row sm:items-center">
              <Button className="w-full gap-2 rounded-full px-6 cursor-pointer sm:w-auto">
                <Play size={18} />
                {t("watchNow")}
              </Button>

              <Button
                variant="outline"
                className="w-full gap-2 rounded-full border-white/30 bg-white/10 px-6 text-white backdrop-blur-sm hover:bg-white/20 cursor-pointer sm:w-auto"
              >
                <Info size={18} />
                {t("moreInfo")}
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