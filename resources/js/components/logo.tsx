import { Link } from "@inertiajs/react";

// Tambahkan isScrolled di props
export default function Logo({ className = "", isScrolled = false }: { className?: string, isScrolled?: boolean }) {
  return (
    <div className={`flex items-center gap-2 group ${className}`}>
      <span className={`text-3xl font-black tracking-tighter transition-colors duration-300 ${
        isScrolled ? 'text-zinc-800' : 'text-primary dark:text-white'
      }`}>
        Digital
        <span className={`italic font-serif transition-colors duration-300 ${
          isScrolled ? 'text-zinc-600' : 'text-primary'
        }`}>
          Pintar
        </span>
        <span className="text-primary text-5xl leading-[0]">.</span>
      </span>
    </div>
  );
}