import { MovieCard } from "@/components";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import useLanguage from "@/hooks/useLanguage";
import { setLoading, setSearchResults } from "@/redux/moviesSlice";
import { IMAGE_BASE_URL, searchMulti } from "@/services/tmdbAPI";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";

const Search = () => {
  const [query, setQuery] = useState("");
  const searchResults = useSelector((state) => state.movies.searchResults);
  const loading = useSelector((state) => state.movies.loading);

  const { t } = useLanguage();
  const dispatch = useDispatch();

  const handleSearch = async () => {
    if (!query.trim()) return;
    dispatch(setLoading(true));

    try {
      const data = await searchMulti(query);

      const filteredResults = data.results.filter((item) => {
        return item.media_type === "movie" || item.media_type === "tv";
      });
      dispatch(setSearchResults(filteredResults));
    } catch (error) {
      toast.error(t("errorTitle"), {
        description: t("errorDescription"),
        className: "border-red-500/30 bg-red-950 text-white",
        position: "top-center",
      });
    } finally {
      dispatch(setLoading(false));
    }
  };

  let resultsContent;

  if (loading) {
    resultsContent = (
      <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-4 md:gap-6 lg:grid-cols-5">
        {Array.from({ length: 5 }).map((_, index) => (
          <div key={index} className="space-y-3">
            <Skeleton className="aspect-[2/3] w-full rounded-xl" />
            <Skeleton className="h-5 w-3/4" />
            <Skeleton className="h-4 w-1/2" />
          </div>
        ))}
      </div>
    );
  } else if (searchResults.length > 0) {
    resultsContent = (
      <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-4 md:gap-6 lg:grid-cols-5">
        {searchResults.map((item) => (
          <MovieCard
            key={item.id}
            id={item.id}
            title={item.media_type === "movie" ? item.title : item.name}
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
      <section className="mx-auto mt-20 w-full max-w-7xl px-4 py-8 sm:px-5 md:mt-22 md:px-8 md:py-10 mt-28">
        <div className="mb-6 sm:mb-8">
          <h1 className="text-2xl font-bold text-foreground sm:text-3xl">
            {t("searchMovies")}
          </h1>

          <p className="mt-2 text-sm text-muted-foreground sm:text-base">
            {t("findFavorite")}
          </p>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row">
          <input
            type="text"
            value={query}
            placeholder={`${t("searchMovies")}...`}
            className="min-w-0 flex-1 rounded-lg border border-input bg-background px-4 py-3 text-sm text-foreground outline-none placeholder:text-muted-foreground sm:text-base"
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
          />

          <Button
            className="h-auto w-full cursor-pointer rounded-lg bg-purple-600 px-6 py-3 font-medium text-white hover:bg-purple-700 sm:w-auto"
            onClick={handleSearch}
          >
            {t("search")}
          </Button>
        </div>

        <div className="mt-8 sm:mt-10">
          <h2 className="mb-5 text-xl font-bold text-muted-foreground sm:mb-6 sm:text-2xl">
            {t("searchResults")}
          </h2>

          {resultsContent}
        </div>
      </section>
    </main>
  );
};

export default Search;