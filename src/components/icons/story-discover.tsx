import React from "react";

export function StoryDiscoverIcon({ className = "w-full h-full" }: { className?: string }) {
  return (
    <svg viewBox="0 0 240 200" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      {/* Background Soft Glow circle */}
      <circle cx="120" cy="100" r="85" fill="currentColor" className="text-amber-500/10 dark:text-amber-500/15" />

      {/* 1. Catalog Device Screen on Left (Tablet / Digital Shelf) */}
      <rect x="24" y="24" width="94" height="136" rx="12" fill="#1E293B" stroke="#0D9488" strokeWidth="2.5" />
      <rect x="32" y="32" width="78" height="120" rx="8" fill="#0F172A" />

      {/* Books grid inside tablet */}
      <rect x="38" y="40" width="30" height="22" rx="4" fill="#D97706" />
      <rect x="74" y="40" width="30" height="22" rx="4" fill="#10B981" />
      <rect x="38" y="68" width="30" height="22" rx="4" fill="#3B82F6" />
      <rect x="74" y="68" width="30" height="22" rx="4" fill="#EC4899" />
      <rect x="38" y="96" width="30" height="22" rx="4" fill="#8B5CF6" />
      <rect x="74" y="96" width="30" height="22" rx="4" fill="#14B8A6" />
      
      {/* Navigation pill inside tablet */}
      <rect x="38" y="126" width="66" height="14" rx="4" fill="#0D9488" />

      {/* Cursor selecting book #1 */}
      <path d="M 58 56 L 68 70 L 63 71 L 67 80 L 62 82 L 58 73 L 53 77 Z" fill="#FFFFFF" stroke="#0F172A" strokeWidth="1.5" />

      {/* 2. Character Interacting With Screen (Storytelling Figure from Reference 1) */}
      {/* Long dark wavy hair */}
      <path d="M 136 44 C 126 30, 160 18, 178 32 C 194 45, 192 78, 178 92 C 168 96, 148 94, 138 68 Z" fill="#0F172A" />
      
      {/* Head/Face */}
      <ellipse cx="152" cy="46" rx="11" ry="13" fill="#FDE047" />

      {/* Front bangs */}
      <path d="M 142 38 C 146 30, 160 32, 164 38 C 164 42, 154 44, 144 44 Z" fill="#0F172A" />

      {/* Reaching Out Arm (Touching screen) */}
      <path d="M 150 64 C 134 62, 116 54, 104 58 C 100 60, 100 66, 105 68 C 118 72, 136 80, 148 84 Z" fill="#F59E0B" />
      {/* Hand finger touch */}
      <ellipse cx="102" cy="60" rx="4" ry="4" fill="#FDE047" />

      {/* Torso - Yellow Oversized Sweater (Matching reference #1) */}
      <path d="M 140 58 C 146 54, 164 54, 170 59 L 175 106 C 164 110, 144 110, 135 106 Z" fill="#F59E0B" />

      {/* Other arm resting on side */}
      <path d="M 166 62 C 174 68, 180 78, 177 92 C 175 98, 168 100, 165 94 Z" fill="#D97706" />

      {/* Dark Navy Trousers (Matching reference #1) */}
      <path d="M 135 106 L 175 106 L 178 168 C 178 172, 168 174, 165 170 L 157 128 L 149 170 C 146 174, 136 172, 136 168 Z" fill="#1E293B" />

      {/* White Sneakers */}
      <ellipse cx="140" cy="174" rx="8" ry="4" fill="#F1F5F9" />
      <ellipse cx="170" cy="176" rx="8" ry="4" fill="#F1F5F9" />

      {/* Magic Sparkle above selection */}
      <path d="M 112 30 L 115 37 L 122 40 L 115 43 L 112 50 L 109 43 L 102 40 L 109 37 Z" fill="#F59E0B" />
      <circle cx="126" cy="24" r="2.5" fill="#10B981" />
    </svg>
  );
}
