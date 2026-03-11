import { Link } from "@inertiajs/react";
import { Instagram, Github, Linkedin } from "lucide-react";
import Logo from "./logo";

export default function Footer() {

  return (
    <footer className="bg-white border-t border-zinc-100 py-12 md:py-16 px-6 overflow-hidden">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between gap-10">
        <Link href="/" className="flex flex-col md:flex-row items-center gap-6 text-center md:text-left">
          <Logo isScrolled={true} />
          <p className="text-zinc-500 text-sm font-medium leading-relaxed max-w-xs md:border-l md:border-zinc-100 md:pl-6">
            Empowering digital literacy through free access to premium e-books for everyone.
          </p>
        </Link>

        <div className="flex items-center gap-3">
          <a target="_blank" rel="noopener noreferrer" href="https://www.linkedin.com/in/faishalfn/" className="size-12 rounded-2xl p-0 text-zinc-400 hover:text-primary hover:bg-primary/5 transition-all"><Linkedin size={20} /></a>
          <a target="_blank" rel="noopener noreferrer" href="https://www.instagram.com/faishalfn1/" className="size-12 rounded-2xl p-0 text-zinc-400 hover:text-primary hover:bg-primary/5 transition-all"><Instagram size={20} /></a>
          <a target="_blank" rel="noopener noreferrer" href="https://github.com/FaishalFaiz" className="size-12 rounded-2xl p-0 text-zinc-400 hover:text-primary hover:bg-primary/5 transition-all"><Github size={20} /></a>
        </div>
      </div>
    </footer>
  );
}
