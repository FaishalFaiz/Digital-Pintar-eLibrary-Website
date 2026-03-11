import { Link } from "@inertiajs/react";

// Jangan lupa kasih tipe data kalau pakai TypeScript biar gak merah!
export default function ProfileCard({ user }: { user: { name: string, email: string, avatar?: string } | null }) {
    if (!user) return null;

    return (
        <Link
            href="/dashboard"
            className="items-center gap-3 bg-zinc-100 p-1 rounded-full pr-4 hover:bg-zinc-200 transition-all hidden lg:flex border border-zinc-200"
        >
            <div className="size-9 rounded-full overflow-hidden border-2 border-white shadow-sm">
                <img
                    src={user.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}&background=0D8ABC&color=fff`}
                    alt={user.name}
                    className="w-full h-full object-cover"
                />
            </div>
            <span className="text-sm font-bold text-zinc-900 line-clamp-1">
                {user.name}
            </span>
        </Link>
    );
}