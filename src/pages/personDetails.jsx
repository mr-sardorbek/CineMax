import { MovieCard } from "@/components";
import { Button } from "@/components/ui/button";
import useLanguage from "@/hooks/useLanguage";
import {
  getPersonCredits,
  getPersonDetails,
  IMAGE_BASE_URL,
} from "@/services/tmdbAPI";
import { Loader } from "lucide-react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const PersonDetails = () => {
  const { id } = useParams();

  const [person, setPerson] = useState(null);
  const [credits, setCredits] = useState([]);
  const [visibleCount, setVisibleCount] = useState(15);
  const [showFullBio, setShowFullBio] = useState(false);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  const { t } = useLanguage();

  const knownFor = credits
    .filter((item) => item.poster_path)
    .sort((a, b) => b.vote_average - a.vote_average)
    .slice(0, visibleCount);

  useEffect(() => {
    const loadPerson = async () => {
      const data = await getPersonDetails(id);
      const creditsData = await getPersonCredits(id);

      setPerson(data);
      setCredits(creditsData.cast);
    };

    loadPerson();
  }, [id]);

  const biography = person?.biography || "";

  return (
    <main className="mx-auto mt-8 max-w-7xl px-5 py-24 md:px-8">
      <div className="flex flex-col gap-8 md:flex-row md:items-start md:gap-10">
        <img
          className="w-48 shrink-0 rounded-2xl object-cover shadow-xl md:w-64"
          src={
            person?.profile_path
              ? `${IMAGE_BASE_URL}${person.profile_path}`
              : "/placeholder-person.png"
          }
          alt={person?.name || "Person"}
        />

        <div>
          <h1 className="text-3xl font-bold text-foreground">
            {person?.name}
          </h1>

          <p className="mt-2 text-purple-400">
            {t("knownForDepartment")}:{" "}
            {person?.known_for_department}
          </p>

          <p className="mt-4 text-muted-foreground">
            {showFullBio
              ? biography
              : biography.slice(0, 300)}{" "}

            {biography.length > 300 && (
              <button
                onClick={() => setShowFullBio((prev) => !prev)}
                className="mt-2 text-sm text-purple-400 hover:text-purple-300"
              >
                {showFullBio
                  ? t("showLess")
                  : t("readMore")}
              </button>
            )}
          </p>

          <div className="mt-5 space-y-2">
            <p className="text-sm text-muted-foreground">
              {t("birthday")}:{" "}
              <span className="text-foreground">
                {person?.birthday}
              </span>
            </p>

            <p className="text-sm text-muted-foreground">
              {t("placeOfBirth")}:{" "}
              <span className="text-foreground">
                {person?.place_of_birth}
              </span>
            </p>
          </div>
        </div>
      </div>

      <div className="mt-10">
        <h2 className="text-2xl font-bold text-foreground">
          {t("knownFor")}
        </h2>

        <div className="mt-5">
          <div className="mt-5 grid grid-cols-2 gap-4 md:grid-cols-4 lg:grid-cols-5">
            {knownFor.map((item) => (
              <MovieCard
                key={`${item.id}-${item.credit_id}`}
                id={item.id}
                title={item.title || item.name}
                rating={item.vote_average}
                year={
                  item.release_date?.slice(0, 4) ||
                  item.first_air_date?.slice(0, 4)
                }
                image={
                  item.poster_path
                    ? `${IMAGE_BASE_URL}${item.poster_path}`
                    : "/placeholder-movie.png"
                }
              />
            ))}
          </div>

          <div className="mt-8 flex justify-center">
            {visibleCount <
              credits.filter((item) => item.poster_path).length && (
              <Button
                className="cursor-pointer rounded-full bg-purple-600 px-7 py-3 font-medium text-white transition-all duration-200 hover:bg-purple-700 hover:shadow-lg hover:shadow-500/20 disabled:cursor-not-allowed disabled:opacity-70"
                onClick={() => {
                  setIsLoadingMore(true);

                  setTimeout(() => {
                    setVisibleCount((prev) => prev + 15);
                    setIsLoadingMore(false);
                  }, 500);
                }}
                disabled={isLoadingMore}
              >
                {isLoadingMore ? (
                  <Loader
                    size={18}
                    className="animate-spin"
                  />
                ) : (
                  "Load More"
                )}
              </Button>
            )}
          </div>
        </div>
      </div>
    </main>
  );
};

export default PersonDetails;