import { MovieCard } from "@/components";
import { Skeleton } from "@/components/ui/skeleton";
import useLanguage from "@/hooks/useLanguage";
import {
  fetchAiringToday,
  fetchOnTheAir,
  fetchPopularTVShows,
  fetchTopRatedTVShows,
} from "@/redux/moviesSlice";
import { IMAGE_BASE_URL } from "@/services/tmdbAPI";
import { useEffect } from "react";
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

const TVshows = () => {
  const popularTVShows = useSelector(
    (state) => state.movies.popularTVShows,
  );
  const topRatedTVShows = useSelector(
    (state) => state.movies.topRatedTVShows,
  );
  const airingToday = useSelector(
    (state) => state.movies.airingToday,
  );
  const onTheAir = useSelector(
    (state) => state.movies.onTheAir,
  );

  const popularTVLoading = useSelector(
    (state) => state.movies.loading.popularTV,
  );
  const topRatedTVLoading = useSelector(
    (state) => state.movies.loading.topRatedTV,
  );
  const airingTodayLoading = useSelector(
    (state) => state.movies.loading.airingToday,
  );
  const onTheAirLoading = useSelector(
    (state) => state.movies.loading.onTheAir,
  );

  const { t } = useLanguage();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchPopularTVShows());
    dispatch(fetchTopRatedTVShows());
    dispatch(fetchAiringToday());
    dispatch(fetchOnTheAir());
  }, [dispatch]);

  return (
    <main>
      <section className="mx-auto max-w-7xl px-5 py-8 md:px-8 md:py-10">
        <h1 className="mb-6 mt-22 text-3xl font-bold text-foreground">
          {t("popularTVShows")}
        </h1>

        {popularTVLoading ? (
          <MovieSkeletons />
        ) : (
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6 lg:grid-cols-5">
            {popularTVShows.map((show) => (
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

      <section className="mx-auto max-w-7xl px-5 py-8 md:px-8 md:py-10">
        <h2 className="mb-6 text-3xl font-bold text-foreground">
          {t("topRatedTVShows")}
        </h2>

        {topRatedTVLoading ? (
          <MovieSkeletons />
        ) : (
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6 lg:grid-cols-5">
            {topRatedTVShows.map((show) => (
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

      <section className="mx-auto max-w-7xl px-5 py-8 md:px-8 md:py-10">
        <h2 className="mb-6 text-3xl font-bold text-foreground">
          {t("airingToday")}
        </h2>

        {airingTodayLoading ? (
          <MovieSkeletons />
        ) : (
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6 lg:grid-cols-5">
            {airingToday.map((show) => (
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

      <section className="mx-auto max-w-7xl px-5 py-8 md:px-8 md:py-10">
        <h2 className="mb-6 text-3xl font-bold text-foreground">
          {t("onTheAir")}
        </h2>

        {onTheAirLoading ? (
          <MovieSkeletons />
        ) : (
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6 lg:grid-cols-5">
            {onTheAir.map((show) => (
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

export default TVshows;