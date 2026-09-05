import { MovieCard } from "@/components";
import { Skeleton } from "@/components/ui/skeleton";
import useLanguage from "@/hooks/useLanguage";
import {
  fetchTrendingMovies,
  fetchTrendingTVShows,
} from "@/redux/moviesSlice";
import { IMAGE_BASE_URL } from "@/services/tmdbAPI";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const MovieSkeletons = () => (
  <div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6 lg:grid-cols-5">
    {Array.from({ length: 5 }).map((_, index) => (
      <div key={index} className="space-y-3">
        <Skeleton className="aspect-[2/3] w-full rounded-xl" />
        <Skeleton className="h-5 w-3/4" />
        <Skeleton className="h-4 w-1/2" />
      </div>
    ))}
  </div>
);

const Trending = () => {
  const trendingMovies = useSelector((state) => state.movies.movies);
  const trendingTVShows = useSelector(
    (state) => state.movies.trendingTVShows,
  );

  const trending = useSelector(
    (state) => state.movies.loading.trending,
  );

  const trendingTV = useSelector(
    (state) => state.movies.loading.trendingTV,
  );

  const { t } = useLanguage();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchTrendingMovies());
    dispatch(fetchTrendingTVShows());
  }, [dispatch]);

  return (
    <main>
      {/* Trending Movies */}
      <section className="mx-auto max-w-7xl px-5 py-8 md:px-8 md:py-10">
        <h1 className="mb-6 mt-22 text-3xl font-bold text-foreground">
          {t("trendingMovies")}
        </h1>

        {trending ? (
          <MovieSkeletons />
        ) : (
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6 lg:grid-cols-5">
            {trendingMovies.map((movie) => (
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

      {/* Trending TV Shows */}
      <section className="mx-auto max-w-7xl px-5 py-8 md:px-8 md:py-10">
        <h2 className="mb-6 text-3xl font-bold text-foreground">
          {t("trendingTVShows")}
        </h2>

        {trendingTV ? (
          <MovieSkeletons />
        ) : (
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6 lg:grid-cols-5">
            {trendingTVShows.map((show) => (
              <MovieCard
                key={show.id}
                id={show.id}
                title={show.name}
                rating={show.vote_average}
                year={show.first_air_date?.slice(0, 4)}
                image={`${IMAGE_BASE_URL}${show.poster_path}`}
              />
            ))}
          </div>
        )}
      </section>
    </main>
  );
};

export default Trending;