import { Head } from "@inertiajs/react";
import { useState } from "react";
import type { BookProps } from "@/components/book-card";
import BookCard from "@/components/book-card";
import { Button } from "@/components/ui/button";
import { BOOKS } from "@/constants/dummy";
import DashboardLayout from "@/layouts/dashboard-layout";

export default function Dashboard() {
    const [books, setBooks] = useState<BookProps[]>(BOOKS as BookProps[]);
    const [isLoading, setIsLoading] = useState(false);
    const [isSearchActive, setIsSearchActive] = useState(false);
    const [emptyState, setEmptyState] = useState(false);

    const handleSearch = async (query: string) => {
        if (!query.trim()) {
            setBooks([]);
            setEmptyState(true);
            setIsSearchActive(true);
            return;
        }

        setIsLoading(true);
        setIsSearchActive(true);
        setEmptyState(false);

        try {
            const res = await fetch(`/api/books/search?q=${encodeURIComponent(query)}`);
            const data = await res.json();

            if (data.items && data.items.length > 0) {
                const mappedBooks = data.items.map((item: { id: string; volumeInfo: { title: string; authors: string[]; categories: string[]; imageLinks: { thumbnail?: string }; averageRating: number } }) => ({
                    id: item.id,
                    title: item.volumeInfo.title || 'Untitled',
                    author: item.volumeInfo.authors ? item.volumeInfo.authors.join(", ") : 'Unknown Author',
                    category: item.volumeInfo.categories ? item.volumeInfo.categories[0] : 'General',
                    cover: item.volumeInfo.imageLinks?.thumbnail?.replace('http:', 'https:') || 'https://placehold.co/300x400/png?text=No+Cover',
                    rating: item.volumeInfo.averageRating || 0,
                }));
                setBooks(mappedBooks);
            } else {
                setBooks([]);
                setEmptyState(true);
            }
        } catch (error) {
            console.error("Error fetching books:", error);
            setBooks([]);
            setEmptyState(true);
        } finally {
            setIsLoading(false);
        }
    };

    const resetSearch = () => {
        setBooks(BOOKS as BookProps[]);
        setIsSearchActive(false);
        setEmptyState(false);
    };

    return (
        <DashboardLayout title="Discover" onSearch={handleSearch}>
            <Head title="Discover - Digital Pintar" />

            <div className="flex flex-col gap-12">
                {/* Main Content Area */}
                <div className="w-full mt-5">
                    {/* States Rendering */}
                    {isLoading ? (
                        <div className="flex justify-center items-center h-64">
                            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
                        </div>
                    ) : emptyState || books.length === 0 ? (
                        <div className="flex flex-col items-center justify-center h-64 space-y-4">
                            <h3 className="text-xl font-bold text-zinc-500">Hasil tidak ditemukan atau input kosong</h3>
                            <p className="text-zinc-400 text-sm">Silakan masukkan kata kunci yang valid.</p>
                            <Button onClick={resetSearch} variant="outline" className="mt-2">
                                Kembali ke Awal
                            </Button>
                        </div>
                    ) : (
                        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 2xl:grid-cols-5 gap-4 md:gap-10">
                            {books.map((book) => (
                                <BookCard key={book.id} {...book} />
                            ))}
                        </div>
                    )}

                    {/* Load More */}
                    {!isSearchActive && !isLoading && !emptyState && (
                        <div className="mt-16 flex justify-center">
                            <Button variant="outline" className="h-16 px-12 rounded-full font-black text-xs uppercase tracking-widest border-zinc-100 hover:bg-zinc-50 transition-all">
                                Explore More Books
                            </Button>
                        </div>
                    )}
                </div>
            </div>
        </DashboardLayout>
    );
}
