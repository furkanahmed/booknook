import Link from "next/link";
import { BookOpen, Home, Compass, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="min-h-[75vh] flex items-center justify-center px-4 py-16">
      <div className="max-w-lg w-full text-center space-y-8 p-8 rounded-3xl bg-neutral-900/50 border border-neutral-800/80 backdrop-blur-sm shadow-2xl relative overflow-hidden">
        {/* Subtle background glow */}
        <div className="absolute top-0 right-1/2 translate-x-1/2 -mt-16 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* 404 Visual Icon */}
        <div className="relative">
          <div className="w-20 h-20 rounded-3xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mx-auto text-emerald-400 shadow-xl shadow-emerald-500/5">
            <BookOpen className="w-10 h-10" />
          </div>
          <span className="absolute -bottom-3 left-1/2 -translate-x-1/2 bg-neutral-950 px-3 py-0.5 rounded-full border border-neutral-800 text-xs font-mono font-bold text-neutral-400">
            Error 404
          </span>
        </div>

        {/* Text Details */}
        <div className="space-y-3">
          <h1 className="text-4xl sm:text-5xl font-serif font-bold text-neutral-100 tracking-tight">
            Page Not Found
          </h1>
          <p className="text-xs sm:text-sm text-neutral-400 max-w-sm mx-auto leading-relaxed">
            The page or chapter you are looking for does not exist in our library archives. It might have been relocated or removed.
          </p>
        </div>

        {/* Action Buttons (Assignment requirement: Back to Home button) */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <Link href="/" className="w-full sm:w-auto">
            <Button className="w-full sm:w-auto bg-emerald-500 hover:bg-emerald-600 text-neutral-950 font-semibold px-6 h-11 rounded-xl shadow-lg shadow-emerald-500/20 flex items-center justify-center gap-2">
              <Home className="w-4 h-4" />
              <span>Back to Home</span>
            </Button>
          </Link>
          <Link href="/books" className="w-full sm:w-auto">
            <Button
              variant="ghost"
              className="w-full sm:w-auto text-neutral-300 hover:text-emerald-400 hover:bg-neutral-800/80 border border-neutral-800 h-11 rounded-xl px-5 flex items-center justify-center gap-2"
            >
              <Compass className="w-4 h-4" />
              <span>Browse Catalog</span>
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

