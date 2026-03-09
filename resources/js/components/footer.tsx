import { Instagram, Twitter, Facebook, Github, Mail } from "lucide-react";
import Logo from "./logo";
import { Link } from "@inertiajs/react";
import { useState, useEffect } from "react";
import { Button } from "./ui/button";

export default function Footer() {

  return (
    <footer className="bg-white border-t border-zinc-100 py-12 md:py-16 px-6 overflow-hidden">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between gap-10">
        <div className="flex flex-col md:flex-row items-center gap-6 text-center md:text-left">
          <Logo isScrolled={true} />
          <p className="text-zinc-500 text-sm font-medium leading-relaxed max-w-xs md:border-l md:border-zinc-100 md:pl-6">
            Empowering digital literacy through free access to premium e-books for everyone.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Button variant="ghost" className="size-12 rounded-2xl p-0 text-zinc-400 hover:text-primary hover:bg-primary/5 transition-all"><Twitter size={20} /></Button>
          <Button variant="ghost" className="size-12 rounded-2xl p-0 text-zinc-400 hover:text-primary hover:bg-primary/5 transition-all"><Instagram size={20} /></Button>
          <Button variant="ghost" className="size-12 rounded-2xl p-0 text-zinc-400 hover:text-primary hover:bg-primary/5 transition-all"><Github size={20} /></Button>
        </div>
      </div>
    </footer>
  );
}
