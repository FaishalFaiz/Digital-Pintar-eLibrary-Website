import { usePage, Link } from "@inertiajs/react";
import { LayoutDashboard, BookMarked, UserCircle, Menu, X, Search, LogOut } from "lucide-react";
import { useState, useEffect } from "react";
import Logo from "@/components/logo";

export default function DashboardLayout({ children, title = "" }: { children: React.ReactNode, title?: string }) {
  const { auth } = usePage().props as any;
  const { url } = usePage();
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const sidebarLinks = [
    { name: "Home", href: "/", icon: UserCircle },
    { name: "Discover", href: "/dashboard", icon: LayoutDashboard },
    { name: "Bookmark", href: "/bookmarks", icon: BookMarked },
  ];

  const user = auth?.user || { name: "Tamu", email: "tamu@digitalpintar.id" };

  return (
    <div className="min-h-svh flex bg-white selection:bg-primary/20">
      {/* Mobile Backdrop */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-[60] lg:hidden animate-in fade-in duration-300"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Sidebar - Inspired by Image 3 */}
      <aside
        className={`fixed top-0 left-0 bottom-0 z-[70] bg-white border-r border-zinc-100 transition-all duration-500 flex flex-col pointer-events-auto ${collapsed ? "w-24" : "w-72"
          } ${mobileOpen ? "translate-x-0 shadow-2xl" : "-translate-x-full lg:translate-x-0"}`}
      >
        {/* Header */}
        <div className="h-24 flex items-center justify-between px-8">
          <Link href="/" className="overflow-hidden">
            <Logo isScrolled={true} />
          </Link>
          <button className="lg:hidden p-2 text-zinc-400" onClick={() => setMobileOpen(false)}>
            <X size={24} />
          </button>
        </div>

        {/* Links */}
        <div className="flex-1 py-4 px-6 flex flex-col gap-1 overflow-y-auto mt-4">
          {sidebarLinks.map((link) => {
            const active = url === link.href;
            return (
              <Link
                key={link.name}
                href={link.href}
                className={`flex items-center gap-4 px-5 py-4 rounded-2xl transition-all duration-300 group ${active
                  ? "bg-primary/10 text-primary"
                  : "text-zinc-500 hover:text-primary transition-all"
                  }`}
              >
                <link.icon className={`size-5 transition-transform duration-300 ${active ? "scale-110" : "group-hover:scale-110"}`} />
                <span className={`font-bold text-sm ${active ? "text-primary" : "text-zinc-500"}`}>{link.name}</span>
              </Link>
            );
          })}
        </div>

        {/* User Card at Bottom */}
        <Link
          href="/logout"
          method="post"
          as="button"
          className="flex items-center gap-2 px-6 py-3 bg-red-500 text-white font-bold rounded-2xl hover:bg-red-600 transition-colors shadow-lg shadow-red-500/30"
        >
          <LogOut size={20} />
          Logout Sekarang
        </Link>
      </aside>

      {/* Main Content */}
      <div className={`flex-1 transition-all duration-500 flex flex-col min-w-0 pointer-events-auto h-svh ${collapsed ? "lg:ml-24" : "lg:ml-72"}`}>
        {/* Top Header */}
        <header className="sticky top-0 z-50 flex h-20 items-center justify-between gap-8 bg-white/80 px-6 backdrop-blur-md lg:h-24 lg:px-12">
          {/* Left Side: Burger Menu (Mobile) & Search */}
          <div className="flex w-full items-center gap-4 lg:max-w-md">
            <button
              className="p-2 -ml-2 text-zinc-500 transition-colors hover:bg-zinc-100 rounded-lg lg:hidden"
              onClick={() => setMobileOpen(true)}
            >
              <Menu size={24} />
            </button>

            <div className="group relative w-full">
              <Search className="absolute top-1/2 left-4 size-4 -translate-y-1/2 text-zinc-400 transition-colors group-focus-within:text-blue-600" />
              <input
                type="text"
                placeholder="Search books..."
                className="w-full rounded-2xl border-none bg-zinc-100 py-3 pl-12 pr-6 text-sm text-black outline-none transition-all focus:ring-4 focus:ring-blue-600/10 placeholder:text-zinc-500"
              />
            </div>
          </div>

          {/* Right Side: User Profile / Actions (Desktop) */}
          <div className="hidden lg:flex items-center gap-4">
            {/* Lo bisa taruh Avatar atau Button Sign In di sini biar header-nya nggak kopong */}
            <div className="size-10 rounded-full bg-zinc-200" />
          </div>
        </header>

        {/* Content Area */}
        <main className="flex-1 px-6 md:px-12 pb-12 overflow-y-auto overflow-x-hidden relative">
          {children}
        </main>
      </div>
    </div>
  );
}
