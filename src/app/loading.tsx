import { BookOpen } from "lucide-react";

export default function Loading() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center px-4 py-16">
      <div className="relative flex flex-col items-center gap-4 text-center">
        {/* Animated Pulsing Book Icon with Spinner Ring */}
        <div className="relative flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20">
          <div className="absolute inset-0 rounded-full border-2 border-emerald-500/20 border-t-emerald-500 animate-spin" />
          <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
            <BookOpen className="w-6 h-6 animate-pulse" />
          </div>
        </div>

        {/* Text */}
        <div className="space-y-1">
          <h3 className="font-serif text-lg font-bold text-neutral-100">
            Loading BookNook...
          </h3>
          <p className="text-xs text-neutral-400">
            Fetching archives from the library database
          </p>
        </div>
      </div>
    </div>
  );
}
