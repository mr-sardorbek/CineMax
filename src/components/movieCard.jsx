import { Play, Star } from "lucide-react";

const MovieCard = ({title, rating, year, image}) => {
  return (
    <article className="group overflow-hidden rounded-xl bg-gray-900">
      <div className="relative aspect-[2/3] overflow-hidden">
        <img src={image} alt={title} 
        className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"/>

        <div className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 
        transition-opacity duration-300 group-hover:opacity-100">
             <button className="flex h-12 w-12 items-center justify-center rounded-full bg-pink-600
             text-white transition-transform duration-300 hover:scale-110">
              <Play size={20} fill="currentColor"/>
             </button>
        </div>
      </div>

      <div className="p-4">
        <h3 className="truncate text-sm font-semibold text-white sm:text-base md:text-lg">{title}</h3>
        <div className="mt-2 flex items-center justify-between text-sm text-gray-400">
          <span className="flex items-center gap-1">
            <Star size={15} className="fill-current text-yellow-400"/>
            {rating?.toFixed(1)}</span>
          <span>{year}</span>
        </div>
      </div>
    </article>
  );
};

export default MovieCard;
