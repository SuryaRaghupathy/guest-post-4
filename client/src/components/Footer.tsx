import { Link } from "wouter";
import { BookOpen, Github, Twitter, Linkedin } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-primary text-white mt-40">
      <div className="container mx-auto px-4 py-24">
        <div className="grid md:grid-cols-2 gap-24 mb-24">
          <div className="flex flex-col justify-between">
            <div>
              <Link href="/" className="flex items-center gap-2 mb-12">
                <span className="font-serif font-black text-6xl tracking-tighter uppercase">Vanguard<span className="text-accent">.</span></span>
              </Link>
              <p className="text-white/60 text-2xl max-w-md font-bold uppercase leading-tight">
                An editorial powerhouse for the modern mind. Built for clarity, speed, and impact.
              </p>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-12">
            <div>
              <h4 className="font-black mb-8 text-xs uppercase tracking-[0.3em] text-accent">Discover</h4>
              <ul className="space-y-4 text-sm font-black uppercase tracking-widest">
                <li><Link href="/category/Technology" className="hover:text-accent transition-colors">Technology</Link></li>
                <li><Link href="/category/Lifestyle" className="hover:text-accent transition-colors">Lifestyle</Link></li>
                <li><Link href="/category/Business" className="hover:text-accent transition-colors">Business</Link></li>
                <li><Link href="/category/Education" className="hover:text-accent transition-colors">Education</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="font-black mb-8 text-xs uppercase tracking-[0.3em] text-accent">Connect</h4>
              <div className="flex flex-col gap-4 text-sm font-black uppercase tracking-widest">
                <a href="#" className="hover:text-accent transition-colors">Twitter</a>
                <a href="#" className="hover:text-accent transition-colors">Github</a>
                <a href="#" className="hover:text-accent transition-colors">Linkedin</a>
              </div>
            </div>
          </div>
        </div>
        
        <div className="border-t border-white/10 pt-12 flex flex-col md:flex-row justify-between items-center gap-8 text-xs font-black uppercase tracking-widest text-white/40">
          <span>© {new Date().getFullYear()} Scribe Editorial. All rights reserved.</span>
          <div className="flex gap-12">
            <a href="#" className="hover:text-white transition-colors">Privacy</a>
            <a href="#" className="hover:text-white transition-colors">Terms</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
