import { GenreFilter, MovieCard } from "@/components";
import { Skeleton } from "@/components/ui/skeleton";
import useLanguage from "@/hooks/useLanguage";
import {
  fetchMoviesByGenre,
  fetchNowPlayingMovies,
  fetchPopularMovies,
  fetchTopRatedMovies,
  fetchUpcomingMovies,
} from "@/redux/moviesSlice";
import { IMAGE_BASE_URL } from "@/services/tmdbAPI";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const MovieSkeletons = () => {
  return (
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
};

const Movies = () => {
  const [selectedGenre, setSelectedGenre] = useState(null);

  const popularMovies = useSelector(
    (state) => state.movies.popularMovies,
  );
  const topRatedMovies = useSelector(
    (state) => state.movies.topRatedMovies,
  );
  const nowPlayingMovies = useSelector(
    (state) => state.movies.nowPlayingMovies,
  );
  const upcomingMovies = useSelector(
    (state) => state.movies.upcomingMovies,
  );
  const genreMovies = useSelector(
    (state) => state.movies.genreMovies,
  );

  const popularLoading = useSelector(
    (state) => state.movies.loading.popular,
  );
  const genreLoading = useSelector(
    (state) => state.movies.loading.genre,
  );
  const topRatedLoading = useSelector(
    (state) => state.movies.loading.topRated,
  );
  const nowPlayingLoading = useSelector(
    (state) => state.movies.loading.nowPlaying,
  );
  const upcomingLoading = useSelector(
    (state) => state.movies.loading.upcoming,
  );

  const currentLoading =
    selectedGenre !== null ? genreLoading : popularLoading;

  const { t } = useLanguage();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchPopularMovies());
    dispatch(fetchTopRatedMovies());
    dispatch(fetchNowPlayingMovies());
    dispatch(fetchUpcomingMovies());
  }, [dispatch]);

  useEffect(() => {
    if (selectedGenre === null) return;

    dispatch(fetchMoviesByGenre(selectedGenre));
  }, [selectedGenre, dispatch]);

  return (
    <main>
      <section className="mx-auto max-w-7xl px-5 py-8 md:px-8 md:py-10">
        <h1 className="mb-6 mt-22 text-3xl font-bold text-foreground">
          {t("movies")}
        </h1>

        <GenreFilter
          selectedGenre={selectedGenre}
          onGenreChange={setSelectedGenre}
        />

        {currentLoading ? (
          <MovieSkeletons />
        ) : (
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6 lg:grid-cols-5">
            {(selectedGenre !== null
              ? genreMovies
              : popularMovies
            ).map((movie) => (
              <MovieCard
                key={movie.id}
                id={movie.id}
                title={movie.title}
                rating={movie.vote_average}
                year={movie.release_date?.slice(0, 4)}
                image={`${IMAGE_BASE_URL}${movie.poster_path}`}
                adult={movie.adult}
              />
            ))}
          </div>
        )}
      </section>

      <section className="mx-auto max-w-7xl px-5 py-8 md:px-8 md:py-10">
        <h2 className="mb-6 text-3xl font-bold text-foreground">
          {t("topRated")}
        </h2>

        {topRatedLoading ? (
          <MovieSkeletons />
        ) : (
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6 lg:grid-cols-5">
            {topRatedMovies.map((movie) => (
              <MovieCard
                key={movie.id}
                id={movie.id}
                title={movie.title}
                rating={movie.vote_average}
                year={movie.release_date?.slice(0, 4)}
                image={`${IMAGE_BASE_URL}${movie.poster_path}`}
                adult={movie.adult}
              />
            ))}
          </div>
        )}
      </section>

      <section className="mx-auto max-w-7xl px-5 py-8 md:px-8 md:py-10">
        <h2 className="mb-6 text-3xl font-bold text-foreground">
          {t("nowPlaying")}
        </h2>

        {nowPlayingLoading ? (
          <MovieSkeletons />
        ) : (
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6 lg:grid-cols-5">
            {nowPlayingMovies.map((movie) => (
              <MovieCard
                key={movie.id}
                id={movie.id}
                title={movie.title}
                rating={movie.vote_average}
                year={movie.release_date?.slice(0, 4)}
                image={`${IMAGE_BASE_URL}${movie.poster_path}`}
                adult={movie.adult}
              />
            ))}
          </div>
        )}
      </section>

      <section className="mx-auto max-w-7xl px-5 py-8 md:px-8 md:py-10">
        <h2 className="mb-6 text-3xl font-bold text-foreground">
          {t("upcoming")}
        </h2>

        {upcomingLoading ? (
          <MovieSkeletons />
        ) : (
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6 lg:grid-cols-5">
            {upcomingMovies.map((movie) => (
              <MovieCard
                key={movie.id}
                id={movie.id}
                title={movie.title}
                rating={movie.vote_average}
                year={movie.release_date?.slice(0, 4)}
                image={`${IMAGE_BASE_URL}${movie.poster_path}`}
                adult={movie.adult}
              />
            ))}
          </div>
        )}
      </section>
    </main>
  );
};

export default Movies;