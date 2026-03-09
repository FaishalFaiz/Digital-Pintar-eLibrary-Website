import { Star, BookOpen, Clock, Tag } from "lucide-react";
import { Link } from "@inertiajs/react";
import { Button } from "./ui/button";

export type BookProps = {
  id: number | string;
  title: string;
  author: string;
  category: string;
  cover: string;
  rating: number;
  pages?: number;
};

export default function BookCard({ id, title, author, category, cover, rating, pages }: BookProps) {
  return (
    <div className="group flex flex-col gap-4 pointer-events-auto transition-all duration-500 hover:scale-[1.02]">
      {/* Book cover wrapper */}
      <div className="relative aspect-[3/4] overflow-hidden rounded-[20px] md:rounded-[30px] shadow-sm group-hover:shadow-2xl group-hover:shadow-primary/10 transition-all duration-700">
        <Link href={`/detail/${id}`} className="block h-full">
          <img
            src={cover}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
        </Link>
        <div className="absolute top-2 left-2 md:top-4 md:left-4">
            <div className="glass-effect px-2 md:px-3 py-0.5 md:py-1 rounded-full text-[8px] md:text-[10px] font-black text-primary uppercase tracking-wider">
                {category}
            </div>
        </div>
      </div>

      {/* Book details */}
      <div className="flex flex-col gap-1 px-2">
        <div className="flex items-center gap-1 mb-1">
            {[1, 2, 3, 4, 5].map((s) => (
                <Star key={s} className={`size-3.5 ${s <= Math.floor(rating) ? 'fill-yellow-400 text-yellow-400' : 'text-zinc-200'}`} />
            ))}
            <span className="text-[10px] font-black text-zinc-400 ml-1 mt-0.5">{rating}</span>
        </div>

        <Link href={`/detail/${id}`}>
          <h3 className="text-sm md:text-lg font-black text-zinc-900 group-hover:text-primary transition-colors leading-tight line-clamp-1">
            {title}
          </h3>
        </Link>
        <p className="text-[10px] md:text-xs font-bold text-zinc-400 uppercase tracking-widest mb-1 md:mb-2">{author}</p>
      </div>
    </div>
  );
}
