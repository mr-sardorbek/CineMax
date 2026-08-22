import { MovieCard } from "@/components";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import useLanguage from "@/hooks/useLanguage";
import {
  getMovieCredits,
  getMovieDetails,
  getMovieVideos,
  getSimilarMovies,
  IMAGE_BASE_URL,
} from "@/services/tmdbAPI";
import { Star, X } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { toast } from "sonner";

const MovieDetails = () => {
  const [movie, setMovie] = useState(null);
  const [trailer, setTrailer] = useState(null);
  const [credits, setCredits] = useState(null);
  const [similarMovies, setSimilarMovies] = useState([]);
  const [isTrailerOpen, setIsTrailerOpen] = useState(false);

  const { t } = useLanguage();

  const { id } = useParams();

  useEffect(() => {
    const loadMovie = async () => {
      try {
        const movieDetailsData = await getMovieDetails(id);

        setMovie(movieDetailsData);
        console.log("Movie data", movieDetailsData);
      } catch (error) {
        console.log(error);
        toast.error(t("errorTitle"), {
          description: t("errorDescription"),
          className: "border-red-500/30 bg-red-950 text-white",
          position: "top-center",
        });
      }
    };
    loadMovie();
  }, [id]);

  useEffect(() => {
    const trailerMovie = async () => {
      try {
        const trailerData = await getMovieVideos(id);

        const officialTrailer = trailerData.results.find(
          (video) =>
            video.site === "YouTube" &&
            video.type === "Trailer" &&
            video.official === true,
        );

        const trailer =
          officialTrailer ||
          trailerData.results.find(
            (video) => video.site === "YouTube" && video.type === "Trailer",
          );

        setTrailer(trailer || null);
        console.log("TRAILER:", trailer);
      } catch (error) {
        console.log(error);
        toast.error(t("errorTitle"), {
          description: t("errorDescription"),
          className: "border-red-500/30 bg-red-950 text-white",
          position: "top-center",
        });
      }
    };
    trailerMovie();
  }, [id]);

  useEffect(() => {
    const loadCredits = async () => {
      try {
        const movieCredits = await getMovieCredits(id);

        setCredits(movieCredits);
        console.log(movieCredits);
      } catch (error) {
        console.log(error);
        toast.error(t("errorTitle"), {
          description: t("errorDescription"),
          className: "border-red-500/30 bg-red-950 text-white",
          position: "top-center",
        });
      }
    };
    loadCredits();
  }, [id]);

  useEffect(() => {
    const loadSimilarMovies = async () => {
      try {
        const similarMoviesData = await getSimilarMovies(id);

        setSimilarMovies(similarMoviesData.results);
      } catch (error) {
        console.log(error);
        toast.error(t("errorTitle"), {
          description: t("errorDescription"),
          className: "border-red-500/30 bg-red-950 text-white",
          position: "top-center",
        });
      }
    };

    loadSimilarMovies();
  }, [id]);

  if (!movie) {
    return <div className="loading">{t("loadingMovie")}</div>;
  }

  return (
    <main className="bg-background text-foreground">
      <section className="relative overflow-hidden bg-black md:min-h-[500px]">
        <div className="absolute inset-x-0 top-0 h-[360px] overflow-hidden sm:h-[420px] md:h-[650px]">
          <img
            src={`${IMAGE_BASE_URL}${movie.backdrop_path}`}
            alt={movie.title}
            className="h-full w-full object-cover"
          />
        </div>

        <div className="relative z-10 mx-auto max-w-7xl px-5 pt-[190px] pb-12 sm:pt-[220px] md:-mt-64 md:px-8 md:pt-[380px] md:pb-16">
          <div className="flex flex-col items-center gap-8 md:flex-row md:items-end md:gap-8">
            <div className="w-44 shrink-0 sm:w-52 md:w-64">
              <img
                src={`${IMAGE_BASE_URL}${movie.poster_path}`}
                alt={movie.title}
                className="w-full rounded-2xl shadow-2xl"
              />
            </div>

            <div className="w-full flex-1 pb-2 text-center text-white md:pb-4 md:text-left">
              <h1 className="text-3xl font-bold sm:text-4xl md:text-5xl">
                {movie.title}
              </h1>

              <div className="mt-4 flex flex-wrap items-center justify-center gap-3 text-sm text-gray-300 md:justify-start md:gap-4">
                <span className="flex items-center gap-1">
                  <Star size={14} className="fill-current text-yellow-400" />
                  {movie.vote_average?.toFixed(1)}
                </span>

                <span>{movie.release_date}</span>

                <span>{movie.runtime} min</span>
              </div>

              <div className="mt-5 flex flex-wrap justify-center gap-2 md:justify-start">
                {movie.genres.map((genre) => (
                  <span
                    key={genre.id}
                    className="rounded-full bg-purple-100 px-3 py-1 text-sm text-purple-600"
                  >
                    {genre.name}
                  </span>
                ))}
              </div>

              <div className="mx-auto mt-8 max-w-3xl md:mx-0">
                <h2 className="text-2xl font-bold"> {t("overview")}</h2>

                <p className="mt-3 leading-7 text-gray-300">{movie.overview}</p>
              </div>

              <div className="mt-8 flex justify-center md:justify-start">
                <Button
                  className="cursor-pointer bg-purple-600 px-6 py-5 font-medium text-white hover:bg-purple-700"
                  onClick={() => setIsTrailerOpen(true)}
                >
                  {t("watchTrailer")}
                </Button>
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
                allowFullScreen
              />
            </div>

            <Button
              className="absolute -right-3 -top-9 flex h-8 w-8 items-center justify-center rounded-full text-xl
             cursor-pointer text-black hover:bg-gray-200 bg-white"
              onClick={() => setIsTrailerOpen(false)}
              variant="ghost"
              size="icon"
            >
              <X size={20} />
            </Button>
          </div>
        </div>
      )}

      <section className="mx-auto max-w-7xl px-5 py-12 md:px-8">
        <h2 className="mb-6 text-2xl font-bold text-foreground">{t("cast")}</h2>

        <Carousel
          opts={{
            align: "start",
          }}
          className="w-full"
        >
          <CarouselContent className="-ml-4">
            {credits?.cast?.slice(0, 10).map((actor) => (
              <CarouselItem
                key={actor.id}
                className="basis-1/2 pl-4 sm:basis-1/3 md:basis-1/4 lg:basis-1/6"
              >
                <Link to={`/person/${actor.id}`} className="group block">
                  <img
                    src={
                      actor.profile_path
                        ? `${IMAGE_BASE_URL}${actor.profile_path}`
                        : "/placeholder-person.png"
                    }
                    alt={actor.name}
                    className="aspect-[2/3] w-full rounded-2xl object-cover"
                  />

                  <h3 className="mt-3 truncate font-semibold text-foreground">
                    {actor.name}
                  </h3>

                  <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">
                    {actor.character}
                  </p>
                </Link>
              </CarouselItem>
            ))}
          </CarouselContent>

          <CarouselPrevious className="hidden md:flex" />
          <CarouselNext className="hidden md:flex" />
        </Carousel>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-10 md:px-8">
        <h2 className="mb-6 text-2xl font-bold text-black text-foreground">
          {t("similarMovies")}
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

      <section className="mx-auto max-w-7xl px-5 py-10 md:px-8">
        <h2 className="mb-6 text-2xl font-bold text-foreground">
          {t("movieInformation")}
        </h2>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-xl bg-muted p-5">
            <p className="text-sm text-muted-foreground"><p>{t("status")}</p></p>

            <p className="mt-2 font-semibold text-foreground">{movie.status}</p>
          </div>

          <div className="rounded-xl bg-muted p-5">
            <p className="text-sm text-muted-foreground">{t("originalLanguage")}</p>

            <p className="mt-2 font-semibold uppercase text-foreground">
              {movie.original_language}
            </p>
          </div>

          <div className="rounded-xl bg-muted p-5">
            <p className="text-sm text-muted-foreground">{t("budget")}</p>

            <p className="mt-2 font-semibold text-foreground">
              ${movie.budget?.toLocaleString()}
            </p>
          </div>

          <div className="rounded-xl bg-muted p-5">
            <p className="text-sm text-muted-foreground">{t("revenue")}</p>

            <p className="mt-2 font-semibold text-foreground">
              ${movie.revenue?.toLocaleString()}
            </p>
          </div>
        </div>
      </section>
    </main>
  );
};

export default MovieDetails;
