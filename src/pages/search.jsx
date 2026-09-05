import { MovieCard } from "@/components";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import useLanguage from "@/hooks/useLanguage";
import { fetchSearchMovies } from "@/redux/moviesSlice";
import { IMAGE_BASE_URL } from "@/services/tmdbAPI";
import { useState } from "react";
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

const Search = () => {
  const [query, setQuery] = useState("");

  const searchResults = useSelector(
    (state) => state.movies.searchResults,
  );

  const loading = useSelector(
    (state) => state.movies.loading.search,
  );

  const { t } = useLanguage();
  const dispatch = useDispatch();

  const handleSearch = () => {
    if (!query.trim()) return;

    dispatch(fetchSearchMovies(query));
  };

  let resultsContent;

  if (loading) {
    resultsContent = <MovieSkeletons />;
  } else if (searchResults.length > 0) {
    resultsContent = (
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6 lg:grid-cols-5">
        {searchResults.map((item) => (
          <MovieCard
            key={`${item.media_type}-${item.id}`}
            id={item.id}
            title={
              item.media_type === "movie"
                ? item.title
                : item.name
            }
            rating={item.vote_average}
            year={
              item.media_type === "movie"
                ? item.release_date?.slice(0, 4)
                : item.first_air_date?.slice(0, 4)
            }
            image={`${IMAGE_BASE_URL}${item.poster_path}`}
          />
        ))}
      </div>
    );
  } else if (query) {
    resultsContent = <p>{t("noResults")}</p>;
  } else {
    resultsContent = null;
  }

  return (
    <main>
      <section className="mx-auto mt-22 max-w-7xl px-5 py-8 md:px-8 md:py-10">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground">
            {t("searchMovies")}
          </h1>

          <p className="mt-2 text-sm text-muted-foreground">
            {t("findFavorite")}
          </p>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row">
          <input
            type="text"
            value={query}
            placeholder={`${t("searchMovies")}...`}
            className="min-w-0 flex-1 rounded-lg border border-input bg-background px-4 py-3 text-foreground outline-none placeholder:text-muted-foreground"
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) =>
              e.key === "Enter" && handleSearch()
            }
          />

          <Button
            className="h-auto w-full cursor-pointer rounded-lg bg-purple-600 px-6 py-3 font-medium text-white hover:bg-purple-700 sm:w-auto"
            onClick={handleSearch}
          >
            {t("search")}
          </Button>
        </div>

        <div className="mt-10">
          <h2 className="mb-6 text-2xl font-bold text-muted-foreground">
            {t("searchResults")}
          </h2>

          {resultsContent}
        </div>
      </section>
    </main>
  );
};

export default Search;