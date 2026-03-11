import { Head, Link, useForm } from "@inertiajs/react";
import { Loader2 } from "lucide-react";
import Logo from "@/components/logo";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function Register() {
   const { data, setData, post, processing, errors } = useForm({
      name: '',
      email: '',
      password: '',
      password_confirmation: '',
   });

   const submit = (e: React.FormEvent) => {
      e.preventDefault();
      post('/register');
   };

   return (
      <div className="min-h-svh flex flex-col lg:flex-row bg-white selection:bg-primary/20 overflow-hidden relative">
         <Head title="Sign Up - Digital Pintar" />

         {/* Left Panel - Modern Minimalist Visual */}
         <div className="relative hidden lg:flex flex-[1.2] flex-col justify-between p-20 overflow-hidden">
            <div className="blob-shape top-0 left-0 w-[600px] h-[600px] bg-primary/5 -translate-x-1/4 -translate-y-1/4" />
            <div className="blob-shape bottom-0 right-0 w-[400px] h-[400px] bg-blue-600/5 translate-x-1/4 translate-y-1/4" />

            <Link href="/" className="relative z-20">
               <Logo isScrolled={true} />
            </Link>

            <div className="relative z-20 max-w-lg mb-20 animate-in fade-in slide-in-from-left-10 duration-1000">
               <h1 className="text-7xl font-black text-zinc-900 leading-[1.1] tracking-tighter mb-8">
                  Start your <br />smart <span className="text-primary italic font-serif lowercase">journey</span> now.
               </h1>
               <p className="text-xl text-zinc-500 font-medium leading-relaxed">
                  Join 12,000+ other users who have improved their digital literacy for free.
               </p>
            </div>

            <div className="relative z-20 flex items-center gap-4 text-sm font-black text-zinc-300 uppercase tracking-widest italic opacity-50">
               DigitalPintar © 2026
            </div>
         </div>

         {/* Right Panel - Clean Form Area */}
         <div className="flex-1 flex flex-col justify-center items-center p-8 lg:p-24 relative z-10 animate-in fade-in duration-1000">
            <div className="w-full max-w-sm flex flex-col gap-10">
               {/* Mobile Logo */}
               <div className="lg:hidden flex justify-center mb-4">
                  <Link href="/"><Logo /></Link>
               </div>

               <div className="flex flex-col gap-2 text-center lg:text-left">
                  <h2 className="text-4xl font-black text-zinc-900 tracking-tight">Create Account</h2>
                  <p className="text-zinc-500 font-medium">Join us and explore thousands of books.</p>
               </div>

               {errors.name && (
                  <p className="text-red-500 text-sm mt-1 animate-pulse">
                     {errors.name}
                  </p>
               )}

               <form onSubmit={submit} className="flex flex-col gap-5">
                  <div className="flex flex-col gap-2 group">
                     <Label htmlFor="name" className="text-[11px] font-black uppercase tracking-[0.2em] text-zinc-400 group-focus-within:text-primary transition-colors ml-1">Full Name</Label>
                     <Input
                        id="name"
                        type="text"
                        placeholder="John Doe"
                        className="h-16 px-6 rounded-2xl bg-zinc-50 border-none focus:ring-4 focus:ring-primary/10 transition-all outline-none font-bold text-zinc-900"
                        value={data.name}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setData('name', e.target.value)}
                        required
                     />
                  </div>

                  <div className="flex flex-col gap-2 group">
                     <Label htmlFor="email" className="text-[11px] font-black uppercase tracking-[0.2em] text-zinc-400 group-focus-within:text-primary transition-colors ml-1">Email Address</Label>
                     <Input
                        id="email"
                        type="email"
                        placeholder="name@email.com"
                        className="h-16 px-6 rounded-2xl bg-zinc-50 border-none focus:ring-4 focus:ring-primary/10 transition-all outline-none font-bold text-zinc-900"
                        value={data.email}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setData('email', e.target.value)}
                        required
                     />
                  </div>

                  <div className="flex flex-col gap-2 group">
                     <Label htmlFor="password" className="text-[11px] font-black uppercase tracking-[0.2em] text-zinc-400 group-focus-within:text-primary transition-colors ml-1">Password</Label>
                     <Input
                        id="password"
                        type="password"
                        placeholder="••••••••"
                        className="h-16 px-6 rounded-2xl bg-zinc-50 border-none focus:ring-4 focus:ring-primary/10 transition-all outline-none font-bold text-zinc-900"
                        value={data.password}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setData('password', e.target.value)}
                        required
                     />
                  </div>

                  <div className="flex items-center gap-3 px-1 mt-2">
                     <Checkbox id="terms" className="rounded-lg size-5 h-5 w-5 border-zinc-200 data-[state=checked]:bg-primary transition-all" required />
                     <Label htmlFor="terms" className="text-xs font-bold text-zinc-500 cursor-pointer">
                        I agree to the <span className="text-primary">Terms & Conditions</span> of Digital Pintar.
                     </Label>
                  </div>

                  <Button type="submit" className="h-16 rounded-[20px] bg-primary text-white text-lg font-black shadow-2xl shadow-primary/20 hover:scale-105 active:scale-95 transition-all mt-4" disabled={processing}>
                     {processing ? <Loader2 size={24} className="animate-spin mr-3" /> : "Sign Up"}
                  </Button>
               </form>

               <p className="text-center text-sm font-bold text-zinc-400">
                  Already have an account? <Link href="/login" className="text-primary hover:underline underline-offset-4">Log In</Link>
               </p>
            </div>
         </div>
      </div>
   );
}
