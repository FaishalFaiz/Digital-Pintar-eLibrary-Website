import { Head, Link } from "@inertiajs/react";
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
import { Button } from "@/components/ui/button";
import { BOOKS } from "@/constants/dummy";
import DashboardLayout from "@/layouts/dashboard-layout";

export default function Detail({ id }: { id: string }) {
   const book = BOOKS.find(b => b.id === Number(id)) || BOOKS[0];

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
                  <Button className="h-10 px-4 rounded-xl hover:text-white/70 gap-2 transition-all">
                     <Bookmark size={16} />
                     <span className="text-[10px] font-black uppercase tracking-widest hidden sm:inline">Simpan</span>
                  </Button>
               </div>
            </div>

            {/* Main Content Section */}
            <div className="flex flex-col lg:flex-row gap-12 items-start">
               {/* Product Image Section */}
               <div className="w-full lg:w-1/3 lg:sticky lg:top-32">
                  <div className="relative group max-w-[280px] sm:max-w-[320px] lg:max-w-none mx-auto lg:mx-0">
                     <div className="absolute -inset-4 bg-primary/5 rounded-[50px] blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
                     <img
                        src={book.cover}
                        alt={book.title}
                        className="relative z-10 w-full aspect-[3/4] object-cover rounded-[30px] md:rounded-[40px] shadow-2xl shadow-zinc-200 group-hover:scale-[1.02] transition-transform duration-500"
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
                           ~{Math.round(book.pages / 2)} mnt
                        </div>
                     </div>
                     <div className="flex flex-col gap-1">
                        <span className="text-[9px] font-black text-zinc-400 uppercase tracking-widest">Tahun Terbit</span>
                        <div className="flex items-center gap-2 text-zinc-900 font-black">
                           <ShieldCheck size={16} className="text-green-500" />
                           2023
                        </div>
                     </div>
                     <div className="flex flex-col gap-1">
                        <span className="text-[9px] font-black text-zinc-400 uppercase tracking-widest">ISBN</span>
                        <div className="flex items-center gap-2 text-zinc-900 font-black truncate">
                           {book.isbn || "N/A"}
                        </div>
                     </div>
                  </div>

                  {/* Synopsis */}
                  <div className="flex flex-col gap-4">
                     <h3 className="text-xl font-black text-zinc-900 tracking-tight uppercase">Sinopsis Buku</h3>
                     <div className="relative">
                        <p className="text-lg text-zinc-500 leading-relaxed font-medium">
                           {book.description || "Tidak ada deskripsi tersedia untuk buku ini."}
                        </p>
                        <div className="mt-4 text-primary font-black text-xs uppercase cursor-pointer hover:underline underline-offset-4">
                           Baca Selengkapnya...
                        </div>
                     </div>
                  </div>

                  <hr className="border-zinc-100" />

                  {/* Pricing and Action */}
                  <div className="flex flex-col sm:flex-row items-center gap-6 mt-4">
                     <div className="flex flex-col leading-none">
                        <span className="text-[10px] font-black text-zinc-300 uppercase tracking-widest mb-1">Status Akses</span>
                        <div className="text-3xl font-black text-primary italic">Free For You</div>
                     </div>
                     <Link href="#" className="w-full sm:flex-1">
                        <Button className="h-16 w-full rounded-2xl bg-zinc-950 text-white font-black text-lg shadow-2xl hover:bg-primary hover:scale-[1.02] transition-all group">
                           Mulai Membaca Sekarang
                           <ChevronRight size={20} className="ml-3 group-hover:translate-x-1 transition-transform" />
                        </Button>
                     </Link>
                  </div>
               </div>
            </div>

            {/* Recommendations / Sidebar like section later */}
         </div>
      </DashboardLayout>
   );
}