import { Link } from "@inertiajs/react";
import { Menu, X, } from "lucide-react";
import { useState, useEffect } from "react";
import type { User } from "@/types";
import Logo from "./logo";
import { Button } from "./ui/button";
import ProfileCard from "./ui/profile-card";

export default function Navbar({ user }: { user?: User }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Dashboard", href: "/dashboard" },
    { name: "Bookmark", href: "/bookmarks" },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled
          ? "bg-white py-3 shadow-md"
          : "bg-transparent py-6"
        }`}
    >
      <div className="container mx-auto px-6 flex items-center justify-between">
        <Link href="/">
          <Logo isScrolled={scrolled} />
        </Link>

        {/* Desktop Links - Centered like Image 2 */}
        <div className="hidden lg:flex items-center gap-10 absolute left-1/2 -translate-x-1/2">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className={`text-sm font-bold hover:text-primary transition-all relative group ${ scrolled ? 'text-zinc-900' : 'text-white' }`}
            >
              {link.name}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full" />
            </Link>
          ))}
        </div>

        {/* Actions */}
        <div className="hidden lg:flex items-center gap-6">
          {user ? (
            <ProfileCard user={user} />
          ) : (
            <div className="flex items-center gap-6">
              <Link href={ `/login` } className={`text-sm font-bold hover:text-primary transition-colors ${ scrolled ? 'text-zinc-900' : 'text-white' }`}>Sign in</Link>
              <Link href={ `/register` } className={`text-sm font-bold hover:text-primary transition-colors ${ scrolled ? 'text-zinc-900' : 'text-white' }`}>
                <Button className="rounded-2xl h-12 px-8 bg-primary text-white font-black shadow-xl shadow-primary/20 hover:scale-105 active:scale-95 transition-all">
                    Sign up
                </Button>
              </Link>
            </div>
          )}
        </div>

        {/* Mobile Toggle */}
        <button
          className={ `lg:hidden p-2 ${ scrolled ? 'text-zinc-900' : 'text-white' }` }
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X className="size-6" /> : <Menu className="size-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="lg:hidden absolute top-full left-0 right-0 bg-white border-b border-zinc-100 p-6 flex flex-col gap-4 animate-in slide-in-from-top duration-300 shadow-2xl">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="flex items-center gap-3 text-lg font-bold text-zinc-900"
              onClick={() => setIsMenuOpen(false)}
            >
              {link.name}
            </Link>
          ))}
          <hr className="border-zinc-100" />
          {!user && (
            <div className="flex flex-col gap-3">
              <Link href="/login">
                <Button variant="outline" className="w-full rounded-xl font-bold">Sign in</Button>
              </Link>
              <Link href="/register">
                <Button className="w-full rounded-xl font-black">Sign up</Button>
              </Link>
            </div>
          )}
        </div>
      )}
    </nav>
  );
}
