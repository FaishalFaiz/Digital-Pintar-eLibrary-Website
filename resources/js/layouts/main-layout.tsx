import { usePage } from "@inertiajs/react";
import Footer from "@/components/footer";
import Navbar from "@/components/navbar";

// 1. Definisikan tipe data User-nya di sini
interface User {
  id: number;
  name: string;
  email: string;
  // tambahin field lain kalau ada, misal: avatar: string;
}

// 2. Definisikan struktur Props dari Inertia
interface PageProps {
  auth: {
    user: User | undefined; // Ganti null jadi undefined
  };
  [key: string]: unknown;
}

export default function MainLayout({ children }: { children: React.ReactNode }) {
  const { auth } = usePage().props as unknown as PageProps;

  return (
    <div className="min-h-svh flex flex-col bg-white dark:bg-zinc-950 transition-colors duration-500 overflow-x-hidden selection:bg-primary/20 selection:text-primary">
      {/* Decorative background blobs */}
      {/* Pakai ukuran Tailwind 4.2 yang valid (w-200 h-200 -> w-[800px] atau ukuran standar) */}
      <div className="fixed top-0 left-0 -translate-y-1/2 -translate-x-1/2 w-80 h-80 bg-primary/2 rounded-full blur-[120px] pointer-events-none z-0" />
      <div className="fixed bottom-0 right-0 translate-y-1/2 translate-x-1/2 w-64 h-64 bg-blue-600/2 rounded-full blur-[100px] pointer-events-none z-0" />

      {/* Sekarang data user sudah ter-type dengan baik */}
      <Navbar user={auth?.user} />

      <main className="flex-1 relative z-10">
        {children}
      </main>

      <Footer />
    </div>
  );
}