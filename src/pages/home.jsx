import { useEffect } from "react";
import MovieCard from "../components/movieCard";
import {
  IMAGE_BASE_URL,
} from "../services/tmdbAPI";
import { Hero } from "../components";
import { Skeleton } from "@/components/ui/skeleton";
import { ArrowRight } from "lucide-react";
import useLanguage from "@/hooks/useLanguage";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchPopularMovies,
  fetchTopRatedMovies,
  fetchTrendingMovies,
} from "@/redux/moviesSlice";

const Home = () => {
  const movies = useSelector((state) => state.movies.movies);
  const popularMovies = useSelector((state) => state.movies.popularMovies);
  const topRatedMovies = useSelector((state) => state.movies.topRatedMovies);
  const loading = useSelector((state) => state.movies.loading.trending);

  const featuredMovie = movies[3];

  const { t } = useLanguage();
  const dispatch = useDispatch();

  useEffect(() => {
          dispatch(fetchTrendingMovies());
          dispatch(fetchPopularMovies())
          dispatch(fetchTopRatedMovies())

  }, []);

  return (
    <main>
      <section className="relative min-h-[600px] overflow-hidden">
        <Hero movie={featuredMovie} />
      </section>
      <section className="mx-auto max-w-7xl px-5 py-8 md:px-8 md:py-10">
        <h2 className="text-2xl font-bold text-foreground mb-4">
          {t("trendingMovies")}
        </h2>
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
            {movies.map((movie) => (
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
        )}
      </section>

      <section className="mx-auto max-w-7xl px-5 py-8 md:px-8 md:py-10">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-2xl font-bold text-foreground">
            {t("popularMovies")}
          </h2>
          <button
            className="flex items-center justify-between gap-1.5 
        text-sm text-gray-400 transition-colors hover:text-purple-400 cursor-pointer"
          >
            {t("viewAll")} <ArrowRight size={18} />
          </button>
        </div>

        <div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6 lg:grid-cols-5">
          {popularMovies.map((movie) => (
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

      <section className="mx-auto max-w-7xl px-5 py-8 md:px-8 md:py-10">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-2xl font-bold text-foreground">
            {t("topRated")}
          </h2>
          <button
            className="flex items-center  gap-1.5 
        text-sm text-gray-400 transition-colors hover:text-purple-400 cursor-pointer"
          >
            {t("viewAll")} <ArrowRight size={18} />
          </button>
        </div>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6 lg:grid-cols-5">
          {topRatedMovies.map((movie) => (
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
  );
};

export default Home;
