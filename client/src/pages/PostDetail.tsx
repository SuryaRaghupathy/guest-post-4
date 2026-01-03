import { usePost } from "@/hooks/use-blog";
import { Loader2, Calendar, Clock, ArrowLeft } from "lucide-react";
import { useRoute, Link } from "wouter";
import ReactMarkdown from "react-markdown";
import { format } from "date-fns";
import { motion } from "framer-motion";

export default function PostDetail() {
  const [, params] = useRoute("/post/:slug");
  const slug = params?.slug;
  
  const { data: post, isLoading, isError } = usePost(slug || "");

  if (isLoading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (isError || !post) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4">
        <h2 className="text-2xl font-bold mb-4">Post Not Found</h2>
        <Link href="/" className="text-primary hover:underline flex items-center">
          <ArrowLeft className="mr-2 h-4 w-4" /> Return Home
        </Link>
      </div>
    );
  }

  // Calculate read time (approx 200 words per minute)
  const wordCount = post.content.split(/\s+/).length;
  const readTime = Math.ceil(wordCount / 200);

  return (
    <article className="min-h-screen pb-40">
      {/* Header Image */}
      <div className="h-[70vh] w-full relative overflow-hidden bg-primary border-b-8 border-primary">
        <img 
          src={post.featuredImage} 
          alt={post.title}
          className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000"
        />
        
        <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-transparent to-transparent flex items-end">
          <div className="container mx-auto px-4 pb-24">
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="max-w-5xl"
            >
              <Link href={`/category/${post.category}`} className="inline-block bg-accent text-white px-6 py-2 text-xs font-black uppercase tracking-widest mb-12">
                {post.category}
              </Link>
              <h1 className="text-5xl md:text-8xl lg:text-[10rem] font-serif font-black text-white leading-[0.8] uppercase italic tracking-tighter">
                {post.title}
              </h1>
            </motion.div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 pt-24 relative z-30">
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="max-w-5xl mx-auto"
        >
          {/* Metadata */}
          <div className="grid md:grid-cols-4 gap-12 mb-24 border-y-4 border-primary py-12">
              <div className="flex items-center gap-6">
              <div className="w-16 h-16 rounded-none bg-primary flex items-center justify-center font-black text-2xl text-white">
                {post.author?.charAt(0) || "S"}
              </div>
              <div className="flex flex-col">
                <span className="text-xs font-black uppercase tracking-widest text-muted-foreground">Written By</span>
                <span className="text-2xl font-black uppercase tracking-tight">{post.author || "Vanguard Editorial"}</span>
              </div>
            </div>
            <div className="flex flex-col">
              <span className="text-xs font-black uppercase tracking-widest text-muted-foreground">Published</span>
              <span className="text-xl font-bold">{format(new Date(post.date), "MMM d, yyyy")}</span>
            </div>
            <div className="flex flex-col">
              <span className="text-xs font-black uppercase tracking-widest text-muted-foreground">Reading Time</span>
              <span className="text-xl font-bold">{readTime} MINUTES</span>
            </div>
          </div>

          {/* Content */}
          <div className="prose prose-lg md:prose-xl dark:prose-invert max-w-none">
            <ReactMarkdown>
              {post.content}
            </ReactMarkdown>
          </div>

          {/* Tags / Footer of post */}
          <div className="mt-16 pt-8 border-t border-border flex justify-between items-center">
             <Link href="/" className="text-primary font-medium hover:underline flex items-center group">
               <ArrowLeft className="mr-2 h-4 w-4 group-hover:-translate-x-1 transition-transform" />
               Back to all articles
             </Link>
          </div>
        </motion.div>
      </div>
    </article>
  );
}
