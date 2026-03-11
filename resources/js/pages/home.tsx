import { Head, Link } from "@inertiajs/react";
import { Sparkles, ArrowRight, Star } from "lucide-react";
import BookCard from "@/components/book-card";
import { Button } from "@/components/ui/button";
import { BOOKS } from "@/constants/dummy";
import MainLayout from "@/layouts/main-layout";

export default function Home() {
    const featuredBooks = BOOKS.slice(0, 5);
    const ebookOfWeek = BOOKS[2];

    return (
        <MainLayout>
            <Head title="Digital Pintar - Teman Belajar Setiamu" />

            {/* Hero Section - Inspired by Image 2 */}
            <section className="relative pt-32 pb-20 md:pt-44 md:pb-32 overflow-hidden px-6">
                {/* Decorative Blobs */}
                <div className="blob-shape top-0 left-0 w-125 h-125 bg-blue-400/10 -translate-x-1/4 -translate-y-1/4" />
                <div className="blob-shape bottom-0 right-0 w-150 h-150 bg-indigo-500/10 translate-x-1/4 translate-y-1/4" />
                <div className="absolute top-1/4 right-1/4 w-32 h-32 bg-yellow-400/20 rounded-full blur-[60px]" />

                <div className="container mx-auto">
                    <div className="flex flex-col lg:flex-row items-center gap-16   ">
                        <div className="flex-1 text-center lg:text-left z-10 animate-in fade-in slide-in-from-left-10 duration-1000">
                            <div className="inline-flex items-center gap-2 bg-secondary px-4 py-2 rounded-full text-[13px] font-bold text-primary mb-6 ring-1 ring-primary/10">
                                <Sparkles className="size-4" />
                                Let's make the best investments
                            </div>

                            <h1 className="text-5xl sm:text-6xl md:text-8xl font-black text-white leading-[1.05] tracking-tight mb-8">
                                There is no <Link href="#" className="relative inline-block"><span className="relative z-10 text-primary italic font-medium">friend</span></Link> as loyal as a <span className="text-primary italic font-serif">book.</span>
                            </h1>

                            <p className="text-lg md:text-xl text-zinc-500 max-w-xl mb-10 leading-relaxed font-medium">
                                Read. Listen. Learn. Repeat. Akses ribuan buku digital berkualitas untuk mencerdaskan masa depanmu.
                            </p>



                            <div className="mt-12 flex items-center gap-6 justify-center lg:justify-start">
                                <div className="flex -space-x-3">
                                    {[1, 2, 3, 4].map(i => (
                                        <img key={i} src={`https://i.pravatar.cc/150?u=${i}`} className="size-12 rounded-full border-4 border-white shadow-sm" alt="user" />
                                    ))}
                                </div>
                                <div className="text-sm font-bold text-primary">
                                    12k+ People joined us.
                                </div>
                            </div>
                        </div>

                        <div className="flex-1 relative z-10 animate-in fade-in zoom-in-95 duration-1000 hidden lg:block">
                            {/* The Person with Books Image - Inspired by Image 2 */}
                            <div className="relative">
                                <div className="absolute inset-0 bg-primary/5 rounded-[60px] -rotate-6 scale-105" />
                                <div className="absolute inset-0 bg-blue-600/5 rounded-[60px] rotate-3" />
                                <img
                                    src="/images/master-image.webp"
                                    className="relative z-20 w-full h-75 md:h-125 object-cover rounded-[40px] md:rounded-[50px] shadow-2xl"
                                    alt="Learning is fun"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* E-book of the Week - Inspired by Image 1 */}
            <section className="py-20 md:py-32 bg-zinc-50 relative overflow-hidden">
                <div className="container mx-auto px-6">
                    <div className="text-center mb-12 md:mb-16">
                        <h2 className="text-3xl md:text-5xl font-black text-zinc-900 mb-4 tracking-tight">E-book of the week</h2>
                        <p className="text-zinc-500 font-medium">Discover the story everyone's talking about.</p>
                    </div>

                    <div className="flex flex-col lg:flex-row items-center gap-10 md:gap-16 glass-effect p-6 md:p-12 rounded-[40px] md:rounded-[50px] border-none shadow-2xl shadow-primary/5">
                        <div className="flex-1 grid grid-cols-3 md:grid-cols-5 gap-3 md:gap-4">
                            {featuredBooks.map((book, i) => (
                                <div
                                    key={i}
                                    className={`relative aspect-3/4 rounded-xl md:rounded-2xl overflow-hidden shadow-lg transition-all duration-500 cursor-pointer ${i === 2 ? 'scale-110 ring-4 ring-primary ring-offset-4 md:ring-offset-8 z-20' : i > 2 ? 'hidden md:block opacity-40 grayscale hover:opacity-100 hover:grayscale-0' : 'opacity-40 grayscale hover:opacity-100 hover:grayscale-0'}`}
                                >
                                    <img src={book.cover} className="w-full h-full object-cover" alt={book.title} />
                                </div>
                            ))}
                        </div>

                        <div className="flex-1 text-center lg:text-left flex flex-col gap-6">
                            <div className="flex items-center gap-2 justify-center lg:justify-start">
                                {[1, 2, 3, 4, 5].map(i => <Star key={i} className="size-5 fill-yellow-400 text-yellow-400" />)}
                                <span className="font-black ml-2 mt-1">4.9 / 5.0</span>
                            </div>
                            <h3 className="text-3xl md:text-5xl font-black text-zinc-900 uppercase italic tracking-tighter">{ebookOfWeek.title}</h3>
                            <p className="text-zinc-500 text-base md:text-lg leading-relaxed font-medium">
                                "The story is a powerful reminder of why we read. It challenges our perspective and leaves a lasting impact on how we view digital literacy in the modern era."
                            </p>
                            <div className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start w-full">
                                <Button className="h-14 md:h-16 w-full sm:w-auto px-10 rounded-2xl bg-primary text-white font-black text-lg shadow-xl shadow-primary/20 hover:scale-105 transition-all">
                                    Read Now <ArrowRight className="size-5 ml-3" />
                                </Button>
                                <Button variant="outline" className="h-14 md:h-16 w-full sm:w-auto px-10 rounded-2xl font-bold border-zinc-200">
                                    View Synopsis
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Collection Grid Section - Inspired by Image 1 & 4 */}
            <section className="py-20 md:py-32 px-4 md:px-6">
                <div className="container mx-auto">
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12 md:mb-16">
                        <div className="flex flex-col gap-2 text-center md:text-left">
                            <span className="text-primary font-black uppercase tracking-[0.2em] text-xs">Explore New Worlds</span>
                            <h2 className="text-3xl md:text-6xl font-black text-white">Trending <span className="text-primary italic font-serif">Literasi</span></h2>
                        </div>
                        <div className="flex items-center gap-2 md:gap-3 bg-zinc-100 p-1 md:p-1.5 rounded-2xl overflow-x-auto no-scrollbar">
                            {["All", "Romance", "Fantasy", "Self-Help"].map((cat, i) => (
                                <button key={i} className={`whitespace-nowrap px-4 md:px-6 py-2.5 md:py-3 rounded-xl text-xs md:text-sm font-bold transition-all ${i === 0 ? 'bg-white shadow-sm text-primary' : 'text-zinc-400 hover:text-zinc-600'}`}>{cat}</button>
                            ))}
                        </div>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-5 gap-4 md:gap-8">
                        {BOOKS.slice(0, 10).map((book) => (
                            <BookCard key={book.id} {...book} />
                        ))}
                    </div>

                    <div className="mt-20 flex justify-center">
                        <Button variant="outline" className="h-16 px-12 rounded-full font-black text-lg border-zinc-200 hover:border-primary hover:text-primary transition-all">
                            Load More Books
                        </Button>
                    </div>
                </div>
            </section>

            {/* Newsletter CTA - Inspired by Image 4 Footer Style */}
            <section className="py-20 md:py-32 sm:px-6">
                <div className="container mx-auto px-6">
                    <div className="bg-zinc-900 rounded-[40px] md:rounded-[60px] p-8 sm:p-20 text-center relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-100 h-100 bg-primary/20 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2" />

                        <h2 className="text-4xl md:text-7xl font-black text-white mb-6 md:mb-8 tracking-tight">Stay ahead with <br /><span className="text-primary italic font-serif lowercase">digital</span> intelligence</h2>
                        <p className="text-zinc-400 text-lg md:text-xl max-w-2xl mx-auto mb-10 md:mb-12">
                            Dapatkan update koleksi buku eksklusif dan tips literasi digital langsung di kotak masukmu setiap minggu.
                        </p>

                        <div className="flex flex-col lg:flex-row items-center justify-center gap-4">
                            <input
                                type="text"
                                placeholder="Your Name"
                                className="h-14 md:h-16 px-8 rounded-2xl bg-white/5 border-white/10 text-white outline-none focus:ring-2 focus:ring-primary w-full lg:max-w-xs"
                            />
                            <input
                                type="email"
                                placeholder="E-mail"
                                className="h-14 md:h-16 px-8 rounded-2xl bg-white/5 border-white/10 text-white outline-none focus:ring-2 focus:ring-primary w-full lg:max-w-xs"
                            />
                            <Button className="h-14 md:h-16 w-full lg:w-auto px-12 rounded-2xl bg-primary text-white font-black hover:scale-105 transition-all">
                                Subscribe Now
                            </Button>
                        </div>
                    </div>
                </div>
            </section>
        </MainLayout>
    );
}

