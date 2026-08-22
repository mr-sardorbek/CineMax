import genres from "@/constants/genres";
import { Button } from "./ui/button";

const GenreFilter = ({ selectedGenre, onGenreChange }) => {
  return (
      <div className="flex flex-wrap gap-2 overflow-x-auto pb-2 mb-3">
        <Button onClick={() => onGenreChange(null)} 
          variant={selectedGenre === null ? "default" : "outline"}>All</Button>

        {genres.map((genre) => (
          <Button key={genre.id} 
          variant={selectedGenre === genre.id ? "default" : "outline"}
          onClick={() => onGenreChange(genre.id)
          }>
            {genre.name}
          </Button>
        ))}
      </div>
  );
};

export default GenreFilter;
