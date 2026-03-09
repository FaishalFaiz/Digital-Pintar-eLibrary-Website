import { usePage } from "@inertiajs/react";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";

export default function MainLayout({ children }: { children: React.ReactNode }) {
  const { auth } = usePage().props as any;

  return (
    <div className="min-h-svh flex flex-col bg-white dark:bg-zinc-950 transition-colors duration-500 overflow-x-hidden selection:bg-primary/20 selection:text-primary">
      {/* Decorative background blobs */}
      <div className="fixed top-0 left-0 -translate-y-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-primary/2 rounded-full blur-[120px] pointer-events-none z-0" />
      <div className="fixed bottom-0 right-0 translate-y-1/2 translate-x-1/2 w-[600px] h-[600px] bg-blue-600/2 rounded-full blur-[100px] pointer-events-none z-0" />

      <Navbar user={auth?.user} />

      <main className="flex-1 relative z-10">
        {children}
      </main>

      <Footer />
    </div>
  );
}
