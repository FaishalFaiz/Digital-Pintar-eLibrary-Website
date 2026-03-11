import { Head } from "@inertiajs/react";
import { Heart, ArrowRight } from "lucide-react";
import BookCard, { BookProps } from "@/components/book-card";
import { Button } from "@/components/ui/button";
import DashboardLayout from "@/layouts/dashboard-layout";
import { useState, useEffect } from "react";

export default function Bookmarks({ bookIds }: { bookIds: string[] }) {
    const [bookmarkedBooks, setBookmarkedBooks] = useState<BookProps[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchBookmarks = async () => {
            if (!bookIds || bookIds.length === 0) {
                setBookmarkedBooks([]);
                setIsLoading(false);
                return;
            }

            try {
                const fetchedBooks = await Promise.all(
                    bookIds.map(async (id) => {
                        try {
                            const res = await fetch(`/api/books/${id}`);
                            if (!res.ok) return null;
                            const data = await res.json();
                            const volumeInfo = data.volumeInfo;
                            return {
                                id: data.id,
                                title: volumeInfo.title || 'Untitled',
                                author: volumeInfo.authors ? volumeInfo.authors.join(", ") : 'Unknown Author',
                                category: volumeInfo.categories ? volumeInfo.categories[0] : 'General',
                                cover: volumeInfo.imageLinks?.thumbnail?.replace('http:', 'https:') || 'https://placehold.co/300x400/png?text=No+Cover',
                                rating: volumeInfo.averageRating || 0,
                            };
                        } catch (err) {
                            console.error(`Error fetching book ${id}:`, err);
                            return null;
                        }
                    })
                );

                setBookmarkedBooks(fetchedBooks.filter((b): b is BookProps => b !== null));
            } catch (error) {
                console.error("Error fetching bookmarks:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchBookmarks();
    }, [bookIds]);

    return (
        <DashboardLayout title="Bookmarks">
            <Head title="Bookmarks - Digital Pintar" />

            {/* Header Info */}
            <div className="flex flex-col md:flex-row items-center justify-between gap-8 mb-16">
                <div className="flex flex-col gap-1">
                    <h1 className="text-4xl font-black text-zinc-900 tracking-tighter">Your Saved Books</h1>
                    <p className="text-zinc-400 font-medium">You have {bookmarkedBooks.length} books in your private collection.</p>
                </div>

                <div className="flex items-center gap-4">
                    <Button variant="ghost" className="h-14 px-8 rounded-2xl text-xs font-black uppercase tracking-widest text-zinc-400 border border-zinc-100 hover:bg-zinc-900 hover:text-white transition-all">
                        Remove All
                    </Button>
                </div>
            </div>

            {isLoading ? (
                <div className="flex justify-center items-center py-20">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
                </div>
            ) : bookmarkedBooks.length > 0 ? (
                <>
                    {/* Featured Bookmark - Aesthetic Highlight */}
                    <section className="mb-16">
                        <div className="bg-primary rounded-[50px] p-12 flex flex-col lg:flex-row items-center gap-16 text-white relative group overflow-hidden shadow-2xl shadow-primary/20">
                            <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2" />
                            <div className="relative shrink-0 perspective-1000">
                                <img
                                    src={bookmarkedBooks[0].cover}
                                    alt={bookmarkedBooks[0].title}
                                    className="w-[200px] h-[280px] object-cover rounded-[30px] shadow-2xl rotate-2 group-hover:rotate-0 transition-transform duration-700"
                                />
                            </div>
                            <div className="flex-1 flex flex-col gap-6 text-center lg:text-left relative z-10">
                                <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] border-b border-white/20 w-fit pb-1 self-center lg:self-start opacity-70">
                                    Last Saved
                                </div>
                                <h2 className="text-4xl md:text-5xl font-black tracking-tight leading-tight">{bookmarkedBooks[0].title}</h2>
                                <p className="text-blue-100 max-w-xl font-medium leading-relaxed">
                                    Continue your reading journey where you left off.
                                </p>
                                <div className="flex flex-col sm:flex-row items-center gap-4 mt-4 justify-center lg:justify-start">
                                    <Button className="bg-white text-zinc-900 rounded-2xl h-14 px-10 text-sm font-black hover:scale-105 active:scale-95 transition-all shadow-xl shadow-black/10">
                                        Keep Reading
                                    </Button>
                                    <Button variant="ghost" className="h-14 px-8 text-sm font-black text-white hover:bg-white/10 rounded-2xl uppercase tracking-widest">
                                        Book Details
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Grid Display */}
                    <div className="flex items-center justify-between mb-8">
                        <h3 className="text-xl font-black text-zinc-900 tracking-tight flex items-center gap-3">
                            Recent Saves
                        </h3>
                        <button className="text-xs font-black text-primary uppercase tracking-widest hover:translate-x-1 transition-transform flex items-center gap-2">
                            View All <ArrowRight size={14} />
                        </button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-12">
                        {bookmarkedBooks.map((book) => (
                            <BookCard key={book.id} {...book} />
                        ))}
                    </div>
                </>
            ) : (
                <div className="flex flex-col items-center justify-center py-20 text-center">
                    <div className="size-24 bg-zinc-50 rounded-full flex items-center justify-center text-zinc-300 mb-6">
                        <Heart size={40} />
                    </div>
                    <h3 className="text-2xl font-black text-zinc-900 mb-2">Empty Collection</h3>
                    <p className="text-zinc-400 font-medium max-w-sm mx-auto">
                        Your bookmarks will appear here after you save your favorite books.
                    </p>
                    <Button className="mt-8 rounded-2xl px-10 h-14 font-black text-xs uppercase tracking-widest bg-zinc-900 text-white">
                        Explore Library
                    </Button>
                </div>
            )}
        </DashboardLayout>
    );
}
