import { Head } from "@inertiajs/react";
import DashboardLayout from "@/layouts/dashboard-layout";
import BookCard from "@/components/book-card";
import { BOOKS } from "@/constants/dummy";
import { Button } from "@/components/ui/button";

export default function Dashboard() {
    return (
        <DashboardLayout title="Discover">
            <Head title="Discover - Digital Pintar" />

            <div className="flex flex-col gap-12">
                {/* Main Content Area */}
                <div className="w-full mt-5">
                    {/* Book Grid */}
                    <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 2xl:grid-cols-5 gap-4 md:gap-10">
                        {BOOKS.map((book) => (
                            <BookCard key={book.id} {...book} />
                        ))}
                    </div>

                    {/* Load More */}
                    <div className="mt-16 flex justify-center">
                        <Button variant="outline" className="h-16 px-12 rounded-full font-black text-xs uppercase tracking-widest border-zinc-100 hover:bg-zinc-50 transition-all">
                            Explore More Books
                        </Button>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
}
