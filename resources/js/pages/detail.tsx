import { Head, Link, useForm } from "@inertiajs/react";
import {
   Bookmark,
   ArrowLeft,
   Star,
   BookOpen,
   Clock,
   Globe,
   ShieldCheck,
   ChevronRight,
} from "lucide-react";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import DashboardLayout from "@/layouts/dashboard-layout";

interface BookDetailData {
   id: string;
   title: string;
   author: string;
   category: string;
   cover: string;
   rating: number;
   pages: number;
   year: string;
   isbn: string;
   description: string;
}

export default function Detail({ id, isBookmarked }: { id: string, isBookmarked: boolean }) {
   const { post, processing } = useForm({
      book_id: id,
   });

   const handleBookmark = () => {
      post("/bookmarks/toggle", {
         preserveScroll: true,
      });
   };
   const [book, setBook] = useState<BookDetailData | null>(null);
   const [isLoading, setIsLoading] = useState(true);
   const [error, setError] = useState<string | null>(null);

   useEffect(() => {
      const fetchBookDetail = async () => {
         setIsLoading(true);
         try {
            const res = await fetch(`/api/books/${id}`);
            if (!res.ok) throw new Error("Gagal mengambil data buku");
            const data = await res.json();

            const volumeInfo = data.volumeInfo;
            setBook({
               id: data.id,
               title: volumeInfo.title || 'Untitled',
               author: volumeInfo.authors ? volumeInfo.authors.join(", ") : 'Unknown Author',
               category: volumeInfo.categories ? volumeInfo.categories[0] : 'General',
               cover: volumeInfo.imageLinks?.extraLarge || volumeInfo.imageLinks?.large || volumeInfo.imageLinks?.medium || volumeInfo.imageLinks?.thumbnail?.replace('http:', 'https:') || 'https://placehold.co/300x400/png?text=No+Cover',
               rating: volumeInfo.averageRating || 0,
               pages: volumeInfo.pageCount || 0,
               year: volumeInfo.publishedDate ? volumeInfo.publishedDate.split('-')[0] : 'N/A',
               isbn: volumeInfo.industryIdentifiers ? volumeInfo.industryIdentifiers[0].identifier : 'N/A',
               description: volumeInfo.description ? volumeInfo.description.replace(/<[^>]*>?/gm, '') : 'Tidak ada deskripsi tersedia untuk buku ini.',
            });
         } catch (err: Error | unknown) {
            const errorMessage = err instanceof Error ? err.message : "Unknown error occurred";
            console.error("Error fetching book:", err);
            setError(errorMessage);
         } finally {
            setIsLoading(false);
         }
      };

      fetchBookDetail();
   }, [id]);

   // No need to set title/thumbnail anymore as we only store id
   useEffect(() => {
      // Logic for title/thumbnail removed at user request to only store id
   }, [book]);

   if (isLoading) {
      return (
         <DashboardLayout title="Memuat Buku...">
            <div className="flex justify-center items-center h-screen -mt-24">
               <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-primary"></div>
            </div>
         </DashboardLayout>
      );
   }

   if (error || !book) {
      return (
         <DashboardLayout title="Error">
            <div className="max-w-6xl mx-auto flex flex-col items-center justify-center h-96 gap-6">
               <h2 className="text-3xl font-black text-zinc-900">Oops! Buku tidak ditemukan.</h2>
               <p className="text-zinc-500 font-medium">{error || "Data buku yang Anda cari mungkin telah dihapus."}</p>
               <Link href="/dashboard">
                  <Button variant="outline" className="h-12 px-8 rounded-full font-black uppercase tracking-widest">
                     Kembali ke Dashboard
                  </Button>
               </Link>
            </div>
         </DashboardLayout>
      );
   }

   return (
      <DashboardLayout title={`Detail: ${book.title}`}>
         <Head title={`${book.title} - Digital Pintar`} />

         <div className="max-w-6xl mx-auto flex flex-col gap-10">
            {/* Navigation Header */}
            <div className="flex items-center justify-between">
               <Link href="/dashboard">
                  <div className="group flex items-center gap-3 text-zinc-400 hover:text-zinc-900 transition-colors">
                     <div className="w-10 h-10 rounded-xl bg-white border border-zinc-100 flex items-center justify-center shadow-sm group-hover:bg-zinc-50">
                        <ArrowLeft size={18} />
                     </div>
                     <span className="text-xs font-black uppercase tracking-widest">Kembali ke Koleksi</span>
                  </div>
               </Link>
               <div className="flex items-center gap-2">
                  <Button
                     onClick={handleBookmark}
                     disabled={processing || isLoading}
                     className={`h-11 px-6 rounded-2xl gap-3 transition-all duration-300 font-bold uppercase tracking-widest text-[11px] shadow-sm
                        ${isBookmarked
                           ? "bg-zinc-100 text-zinc-900 border border-zinc-200 hover:bg-zinc-200"
                           : "bg-primary text-white hover:bg-primary/90 hover:shadow-lg hover:shadow-primary/20"
                        }`}
                  >
                     {isBookmarked ? (
                        <Star size={16} className="fill-yellow-400 text-yellow-400" />
                     ) : (
                        <Bookmark size={16} />
                     )}
                     <span>{isBookmarked ? "Saved" : "Bookmark"}</span>
                  </Button>
               </div>
            </div>

            {/* Main Content Section */}
            <div className="flex flex-col lg:flex-row gap-12 items-start">
               {/* Product Image Section */}
               <div className="w-full lg:w-1/3 lg:sticky lg:top-32">
                  <div className="relative group max-w-70 sm:max-w-[320px] lg:max-w-none mx-auto lg:mx-0">
                     <div className="absolute -inset-4 bg-primary/5 rounded-[50px] blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
                     <img
                        src={book.cover}
                        alt={book.title}
                        className="relative z-10 w-full aspect-3/4 object-cover rounded-[30px] md:rounded-[40px] shadow-2xl shadow-zinc-200 group-hover:scale-[1.02] transition-transform duration-500"
                     />
                     <div className="absolute top-4 left-4 z-20">
                        <div className="glass-effect px-3 py-1.5 rounded-xl text-[9px] font-black text-primary uppercase tracking-widest flex items-center gap-2">
                           <Globe size={12} />
                           {book.category}
                        </div>
                     </div>
                  </div>
               </div>

               {/* Details Content Section */}
               <div className="flex-1 flex flex-col gap-8">
                  <div className="flex flex-col gap-4">
                     <div className="flex items-center gap-2">
                        {[1, 2, 3, 4, 5].map((s) => (
                           <Star key={s} className={`size-4 ${s <= Math.floor(book.rating) ? 'fill-yellow-400 text-yellow-400' : 'text-zinc-200'}`} />
                        ))}
                        <span className="text-sm font-black text-zinc-900 ml-2 mt-0.5">{book.rating} / 5.0</span>
                     </div>
                     <h1 className="text-5xl md:text-6xl font-black text-zinc-900 tracking-tighter leading-[1.1]">
                        {book.title}
                     </h1>
                     <p className="text-xl font-bold text-zinc-400 uppercase tracking-widest italic">
                        By {book.author}
                     </p>
                  </div>

                  {/* Stats Grid */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-6 bg-zinc-50 rounded-[30px] border border-zinc-100">
                     <div className="flex flex-col gap-1">
                        <span className="text-[9px] font-black text-zinc-400 uppercase tracking-widest">Halaman</span>
                        <div className="flex items-center gap-2 text-zinc-900 font-black">
                           <BookOpen size={16} className="text-primary" />
                           {book.pages} hlm
                        </div>
                     </div>
                     <div className="flex flex-col gap-1">
                        <span className="text-[9px] font-black text-zinc-400 uppercase tracking-widest">Waktu Baca</span>
                        <div className="flex items-center gap-2 text-zinc-900 font-black">
                           <Clock size={16} className="text-yellow-500" />
                           ~{Math.round(book.pages / 2) || 0} mnt
                        </div>
                     </div>
                     <div className="flex flex-col gap-1">
                        <span className="text-[9px] font-black text-zinc-400 uppercase tracking-widest">Tahun Terbit</span>
                        <div className="flex items-center gap-2 text-zinc-900 font-black">
                           <ShieldCheck size={16} className="text-green-500" />
                           {book.year}
                        </div>
                     </div>
                     <div className="flex flex-col gap-1">
                        <span className="text-[9px] font-black text-zinc-400 uppercase tracking-widest">ISBN</span>
                        <div className="flex items-center gap-2 text-zinc-900 font-black truncate">
                           {book.isbn}
                        </div>
                     </div>
                  </div>

                  {/* Synopsis */}
                  <div className="flex flex-col gap-4">
                     <h3 className="text-xl font-black text-zinc-900 tracking-tight uppercase">Sinopsis Buku</h3>
                     <div className="relative">
                        <p className="text-lg text-zinc-500 leading-relaxed font-medium">
                           {book.description}
                        </p>
                     </div>
                  </div>

                  <hr className="border-zinc-100" />

                  {/* Pricing and Action */}
                  <div className="flex flex-col sm:flex-row items-center gap-6 mt-4">
                     <Link href="#" className="w-full sm:flex-1">
                        <Button className="h-16 w-full rounded-2xl bg-primary text-white font-black text-lg shadow-2xl hover:bg-primary/80 hover:scale-[1.02] transition-all group">
                           Mulai Membaca Sekarang
                           <ChevronRight size={20} className="ml-3 group-hover:translate-x-1 transition-transform" />
                        </Button>
                     </Link>
                  </div>
               </div>
            </div>

         </div>
      </DashboardLayout>
   );
}