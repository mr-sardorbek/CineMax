import { MovieCard } from "@/components";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import useLanguage from "@/hooks/useLanguage";
import { IMAGE_BASE_URL, searchMulti } from "@/services/tmdbAPI";
import { useState } from "react";
import { toast } from "sonner";

const Search = () => {
  const [query, setQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const { t } = useLanguage();

  const handleSearch = async () => {
    if (!query.trim()) return;

    try {
      setLoading(true);
      const data = await searchMulti(query);

      const filteredResults = data.results.filter((item) => {
        return item.media_type === "movie" || item.media_type === "tv";
      });
      setSearchResults(filteredResults);
    } catch (error) {
      toast.error(t("errorTitle"), {
        description: t("errorDescription"),
        className: "border-red-500/30 bg-red-950 text-white",
        position: "top-center",
      });
    } finally {
      setLoading(false);
    }
  };

  let resultsContent;

  if (loading) {
    resultsContent = (
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
  } else if (searchResults.length > 0) {
    resultsContent = (
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6 lg:grid-cols-5">
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
      <section className="mx-auto max-w-7xl px-5 py-8 md:px-8 md:py-10 mt-22">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground">
            {t("searchMovies")}
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            {t("findFavorite")}
          </p>
        </div>

        <div className="flex gap-3">
          <input
            type="text"
            value={query}
            placeholder={`${t("searchMovies")}...`}
            className="flex-1 rounded-lg border  border-input placeholder:text-muted-foreground px-4 py-3 outline-none bg-background text-foreground"
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
          />
          <Button
            className="rounded-lg bg-purple-600 h-auto px-6 py-3 font-medium text-white"
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
