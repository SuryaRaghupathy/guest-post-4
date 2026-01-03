import { Link, useLocation } from "wouter";
import { cn } from "@/lib/utils";
import { Menu, X, BookOpen } from "lucide-react";
import { useState } from "react";
import { useCategories } from "@/hooks/use-blog";

export function Header() {
  const [location] = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { data: categories = [] } = useCategories();

  // Navigation items
  const navItems = [
    { label: "Home", href: "/" },
    ...categories.map((cat) => ({ label: cat, href: `/category/${cat}` })),
    { label: "About", href: "/about" },
  ];

  return (
    <header className="w-full border-b-4 border-primary bg-background sticky top-0 z-50">
      <div className="container mx-auto px-4 h-24 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <span className="font-serif font-black text-4xl tracking-tighter text-foreground uppercase">
            Vanguard<span className="text-accent">.</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "text-xs font-black uppercase tracking-widest transition-all hover:text-accent",
                location === item.href
                  ? "text-accent border-b-2 border-accent"
                  : "text-foreground"
              )}
            >
              {item.label}
            </Link>
          ))}
          <Link
            href="/subscribe"
            className="ml-4 px-6 py-2 bg-primary text-primary-foreground text-xs font-black uppercase tracking-widest hover:bg-accent transition-colors"
          >
            Join the List
          </Link>
        </nav>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden p-2 text-muted-foreground hover:text-foreground"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t bg-background">
          <div className="container mx-auto px-4 py-4 flex flex-col gap-4">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "text-base font-medium py-2 border-b border-border/50 last:border-0",
                  location === item.href ? "text-primary" : "text-muted-foreground"
                )}
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="/subscribe"
              className="w-full mt-4 px-4 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 text-center"
              onClick={() => setMobileMenuOpen(false)}
            >
              Subscribe
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
