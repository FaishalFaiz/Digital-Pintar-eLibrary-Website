import { Head, Link, useForm } from "@inertiajs/react";
import Logo from "@/components/logo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Loader2, Mail, Lock, ArrowRight, Github, Chrome } from "lucide-react";

export default function Login() {
   const { data, setData, post, processing, errors } = useForm({
      email: '',
      password: '',
      remember: false,
   });

   const submit = (e: React.FormEvent) => {
      e.preventDefault();
      console.log("Login attempt", data);
   };

   return (
      <div className="min-h-svh flex flex-col lg:flex-row bg-white selection:bg-primary/20 overflow-hidden relative">
         <Head title="Sign In - Digital Pintar" />

         {/* Left Panel - Modern Minimalist Visual */}
         <div className="relative hidden lg:flex flex-[1.2] flex-col justify-between p-20 overflow-hidden">
            <div className="blob-shape top-0 left-0 w-[600px] h-[600px] bg-primary/5 -translate-x-1/4 -translate-y-1/4" />
            <div className="blob-shape bottom-0 right-0 w-[400px] h-[400px] bg-blue-600/5 translate-x-1/4 translate-y-1/4" />

            <Link href="/" className="relative z-20">
               <Logo />
            </Link>

            <div className="relative z-20 max-w-lg mb-20 animate-in fade-in slide-in-from-left-10 duration-1000">
               <h1 className="text-7xl font-black text-zinc-900 leading-[1.1] tracking-tighter mb-8">
                  Welcome <br />Back to <span className="text-primary italic font-serif lowercase">digital</span> intelligence.
               </h1>
               <p className="text-xl text-zinc-500 font-medium leading-relaxed">
                  Continue your learning journey today. Log in to access your favorite book collection.
               </p>
            </div>

            <div className="relative z-20 flex items-center gap-4 text-sm font-black text-zinc-300 uppercase tracking-widest italic opacity-50">
               DigitalPintar © 2024
            </div>
         </div>

         {/* Right Panel - Clean Form Area */}
         <div className="flex-1 flex flex-col justify-center items-center p-8 lg:p-24 relative z-10 animate-in fade-in duration-1000">
            <div className="w-full max-w-sm flex flex-col gap-12">
               {/* Mobile Logo */}
               <div className="lg:hidden flex justify-center mb-4">
                  <Link href="/"><Logo /></Link>
               </div>

               <div className="flex flex-col gap-2 text-center lg:text-left">
                  <h2 className="text-4xl font-black text-zinc-900 tracking-tight">Sign In</h2>
                  <p className="text-zinc-500 font-medium">Please enter your details below.</p>
               </div>

               <form onSubmit={submit} className="flex flex-col gap-6">
                  <div className="flex flex-col gap-2 group">
                     <Label htmlFor="email" className="text-[11px] font-black uppercase tracking-[0.2em] text-zinc-400 group-focus-within:text-primary transition-colors ml-1">Email Address</Label>
                     <div className="relative">
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
                  </div>

                  <div className="flex flex-col gap-2 group">
                     <div className="flex justify-between items-center px-1">
                        <Label htmlFor="password" className="text-[11px] font-black uppercase tracking-[0.2em] text-zinc-400 group-focus-within:text-primary transition-colors">Password</Label>
                        <Link href="#" className="text-[11px] font-black uppercase tracking-widest text-primary hover:text-blue-700 transition-colors">Forgot?</Link>
                     </div>
                     <div className="relative">
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
                  </div>

                  <div className="flex items-center gap-3 px-1">
                     <Checkbox
                        id="remember"
                        className="rounded-lg size-5 h-5 w-5 border-zinc-200 data-[state=checked]:bg-primary transition-all"
                        checked={data.remember}
                        onCheckedChange={(v: boolean) => setData('remember', v)}
                     />
                     <Label htmlFor="remember" className="text-sm font-bold text-zinc-500 cursor-pointer">Remember me</Label>
                  </div>

                  <Button type="submit" className="h-16 rounded-[20px] bg-primary text-white text-lg font-black shadow-2xl shadow-primary/20 hover:scale-105 active:scale-95 transition-all mt-4" disabled={processing}>
                     {processing ? <Loader2 size={24} className="animate-spin mr-3" /> : "Sign In"}
                  </Button>
               </form>

               <div className="relative">
                  <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-zinc-100" /></div>
                  <div className="relative flex justify-center text-[10px] font-black uppercase tracking-[0.3em] bg-white px-6 text-zinc-300">Or continue with</div>
               </div>

               <div className="flex gap-4">
                  <Button variant="outline" className="flex-1 h-16 rounded-2xl border-zinc-100 font-black text-xs uppercase tracking-widest hover:bg-zinc-50 transition-all">
                     <Chrome size={18} className="mr-3" />
                     Google
                  </Button>
                  <Button variant="outline" className="flex-1 h-16 rounded-2xl border-zinc-100 font-black text-xs uppercase tracking-widest hover:bg-zinc-50 transition-all">
                     <Github size={18} className="mr-3" />
                     Github
                  </Button>
               </div>

               <p className="text-center text-sm font-bold text-zinc-400">
                  Don't have an account? <Link href="/register" className="text-primary hover:underline underline-offset-4">Sign up for free</Link>
               </p>
            </div>
         </div>
      </div>
   );
}
