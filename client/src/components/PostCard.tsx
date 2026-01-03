import { Link } from "wouter";
import { type BlogPostSummary } from "@shared/routes";
import { format } from "date-fns";
import { ArrowRight } from "lucide-react";

interface PostCardProps {
  post: BlogPostSummary;
  featured?: boolean;
}

export function PostCard({ post, featured = false }: PostCardProps) {
  // Use first image if multiple, or a fallback.
  // In a real app, this would be a proper image optimization component.
  const imageUrl = post.featuredImage || "https://images.unsplash.com/photo-1499750310159-52f0f83463dd?q=80&w=2070&auto=format&fit=crop"; 
  // above: beautiful desk setup for fallback

  if (featured) {
    return (
      <Link href={`/post/${post.slug}`} className="group block col-span-full mb-24">
        <div className="grid md:grid-cols-12 gap-0 border-8 border-primary overflow-hidden">
          <div className="md:col-span-7 aspect-[16/10] md:aspect-auto md:h-[600px] overflow-hidden border-b-8 md:border-b-0 md:border-r-8 border-primary">
            <img 
              src={imageUrl} 
              alt={post.title} 
              className="w-full h-full object-cover transition-transform duration-700 grayscale group-hover:grayscale-0 group-hover:scale-110"
            />
          </div>
          <div className="md:col-span-5 p-8 md:p-12 flex flex-col justify-center bg-background">
            <div className="flex items-center gap-4 mb-8">
              <span className="bg-accent text-white px-4 py-1 text-xs font-black uppercase tracking-widest">
                {post.category}
              </span>
              <span className="font-sans font-bold text-xs uppercase tracking-widest text-muted-foreground">
                {format(new Date(post.date), "MMMM d, yyyy")}
              </span>
            </div>
            
            <h2 className="text-4xl md:text-6xl font-serif font-black text-foreground mb-8 leading-[0.9] group-hover:text-accent transition-colors uppercase italic">
              {post.title}
            </h2>
            
            <p className="text-foreground text-xl mb-12 line-clamp-4 font-sans leading-relaxed">
              {post.description}
            </p>
            
            <div className="flex items-center text-primary font-black uppercase tracking-tighter text-2xl group-hover:text-accent transition-colors">
              Read the Feature <ArrowRight className="ml-2 h-8 w-8 stroke-[3]" />
            </div>
          </div>
        </div>
      </Link>
    );
  }

  return (
    <Link href={`/post/${post.slug}`} className="group flex flex-col h-full border-4 border-primary hover:bg-primary hover:text-white transition-all duration-500">
      <div className="aspect-[1/1] overflow-hidden border-b-4 border-primary">
        <img 
          src={imageUrl} 
          alt={post.title} 
          className="w-full h-full object-cover transition-transform duration-700 grayscale group-hover:grayscale-0 group-hover:scale-110"
        />
      </div>
      
      <div className="flex-1 p-8 flex flex-col">
        <div className="flex items-center justify-between mb-6">
          <span className="text-xs font-black text-accent tracking-widest uppercase">
            {post.category}
          </span>
          <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground group-hover:text-white/70">
            {format(new Date(post.date), "MMM d, yyyy")}
          </span>
        </div>
        
        <h3 className="text-2xl font-serif font-black text-foreground mb-4 leading-none group-hover:text-white transition-colors uppercase">
          {post.title}
        </h3>
        
        <p className="text-foreground/80 text-base line-clamp-3 mb-8 flex-1 group-hover:text-white/90">
          {post.description}
        </p>

        <div className="flex items-center gap-4 mt-auto pt-6 border-t-2 border-primary group-hover:border-white/20">
          <div className="w-8 h-8 rounded-none bg-primary group-hover:bg-accent flex items-center justify-center text-xs font-black text-white transition-colors">
            {post.author.charAt(0)}
          </div>
          <span className="text-xs font-black uppercase tracking-widest group-hover:text-white">
            {post.author}
          </span>
        </div>
      </div>
    </Link>
  );
}
