import { Head, Link, useForm } from "@inertiajs/react";
import Logo from "@/components/logo";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2, Github, Chrome } from "lucide-react";

export default function Login() {
   const { data, setData, post, processing, errors } = useForm({
      email: '',
      password: '',
   });

   const submit = (e: React.FormEvent) => {
      e.preventDefault();
      // Pakai string URL langsung biar aman dari error kalau nggak pake Ziggy 🚀
      post('/login', {
         preserveScroll: true,
      });
   };

   return (
      <div className="min-h-svh flex flex-col lg:flex-row bg-white selection:bg-primary/20 overflow-hidden relative">
         <Head title="Sign In - Digital Pintar" />

         {/* Left Panel */}
         <div className="relative hidden lg:flex flex-[1.2] flex-col justify-between p-20 overflow-hidden">
            <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-primary/5 -translate-x-1/4 -translate-y-1/4 rounded-full blur-3xl" />
            <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-blue-600/5 translate-x-1/4 translate-y-1/4 rounded-full blur-3xl" />

            <Link href="/" className="relative z-20">
               <Logo isScrolled={true} />
            </Link>

            <div className="relative z-20 max-w-lg mb-20">
               <h1 className="text-7xl font-black text-zinc-900 leading-[1.1] tracking-tighter mb-8">
                  Welcome <br />Back to <span className="text-primary italic font-serif lowercase">digital</span> intelligence.
               </h1>
               <p className="text-xl text-zinc-500 font-medium leading-relaxed">
                  Continue your learning journey today. Log in to access your favorite book collection.
               </p>
            </div>

            <div className="relative z-20 flex items-center gap-4 text-sm font-black text-zinc-300 uppercase tracking-widest italic opacity-50">
               DigitalPintar © 2026
            </div>
         </div>

         {/* Right Panel */}
         <div className="flex-1 flex flex-col justify-center items-center p-8 lg:p-24 relative z-10">
            <div className="w-full max-w-sm flex flex-col gap-12">
               <div className="flex flex-col gap-2 text-center lg:text-left">
                  <h2 className="text-4xl font-black text-zinc-900 tracking-tight">Log In</h2>
                  <p className="text-zinc-500 font-medium">Please enter your details below.</p>
               </div>

               <form onSubmit={submit} className="flex flex-col gap-6">
                  <div className="flex flex-col gap-2 group">
                     <Label htmlFor="email" className="text-[11px] font-black uppercase tracking-[0.2em] text-zinc-400 group-focus-within:text-primary transition-colors ml-1">Email Address</Label>
                     <Input
                        id="email"
                        type="email"
                        placeholder="name@email.com"
                        className="h-16 px-6 rounded-2xl bg-zinc-50 border-none focus:ring-4 focus:ring-primary/10 transition-all font-bold text-zinc-900"
                        value={data.email}
                        onChange={(e) => setData('email', e.target.value)}
                        required
                     />
                     {/* Tambah styling dikit biar error messagenya cakep */}
                     {errors.email && <span className="text-red-500 text-xs mt-1 ml-1 font-semibold">{errors.email}</span>}
                  </div>

                  <div className="flex flex-col gap-2 group">
                     <div className="flex justify-between items-center px-1">
                        <Label htmlFor="password" className="text-[11px] font-black uppercase tracking-[0.2em] text-zinc-400 group-focus-within:text-primary transition-colors">Password</Label>
                        <Link href="#" className="text-[11px] font-black uppercase tracking-widest text-primary hover:text-blue-700 transition-colors">Forgot?</Link>
                     </div>
                     <Input
                        id="password"
                        type="password"
                        placeholder="••••••••"
                        className="h-16 px-6 rounded-2xl bg-zinc-50 border-none focus:ring-4 focus:ring-primary/10 transition-all font-bold text-zinc-900"
                        value={data.password}
                        onChange={(e) => setData('password', e.target.value)}
                        required
                     />
                     {/* Jaga-jaga kalau backend ngirim error buat password juga */}
                     {errors.password && <span className="text-red-500 text-xs mt-1 ml-1 font-semibold">{errors.password}</span>}
                  </div>



                  <Button type="submit" className="h-16 rounded-[20px] bg-primary text-white text-lg font-black shadow-2xl shadow-primary/20 hover:scale-105 active:scale-95 transition-all mt-4" disabled={processing}>
                     {processing ? <Loader2 size={24} className="animate-spin" /> : "Login"}
                  </Button>
                  <p className="text-center text-sm font-bold text-zinc-400">
                     Don't have an account? <Link href="/register" className="text-primary hover:underline underline-offset-4">Register</Link>
                  </p>
               </form>


            </div>
         </div>
      </div>
   );
}