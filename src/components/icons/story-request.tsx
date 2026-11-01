import React from "react";

export function StoryRequestIcon({ className = "w-full h-full" }: { className?: string }) {
  return (
    <svg viewBox="0 0 240 200" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      {/* Background Soft Glow Circle */}
      <circle cx="120" cy="100" r="85" fill="currentColor" className="text-sky-500/10 dark:text-sky-500/15" />

      {/* Floating Digital Calendar Card (Behind character) */}
      <rect x="35" y="45" width="65" height="58" rx="10" fill="#1E293B" stroke="#0284C7" strokeWidth="2" />
      <rect x="35" y="45" width="65" height="18" rx="10" fill="#0284C7" />
      {/* Calendar rings */}
      <rect x="47" y="40" width="5" height="10" rx="2" fill="#E2E8F0" />
      <rect x="83" y="40" width="5" height="10" rx="2" fill="#E2E8F0" />
      {/* 7-Days badge */}
      <text x="67" y="85" fill="#38BDF8" fontSize="18" fontWeight="bold" textAnchor="middle" fontFamily="monospace">7d</text>

      {/* Checkmark Badge on Calendar */}
      <circle cx="95" cy="50" r="10" fill="#10B981" />
      <path d="M 91 50 L 94 53 L 99 47" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />

      {/* ================= CHARACTER (Reader holding tablet/device submitting borrow) ================= */}
      {/* Hair (Short styled brown/black hair matching reference #1 girl #2) */}
      <path d="M 126 38 C 122 24, 150 16, 160 26 C 170 36, 168 62, 156 70 C 148 72, 134 70, 126 50 Z" fill="#0F172A" />
      <path d="M 120 45 C 114 48, 114 55, 122 56 Z" fill="#0F172A" />

      {/* Face & Neck */}
      <ellipse cx="140" cy="46" rx="10" ry="12" fill="#FDE047" />
      <rect x="137" y="56" width="6" height="8" fill="#FACC15" />

      {/* Torso / Yellow Shirt (Matching reference #1) */}
      <path d="M 124 64 C 130 60, 150 60, 156 64 L 160 112 C 150 116, 132 116, 122 112 Z" fill="#F59E0B" />

      {/* Left Arm holding the Tablet */}
      <path d="M 125 66 C 115 75, 112 90, 126 95 L 140 95 C 135 90, 135 78, 136 70 Z" fill="#D97706" />

      {/* Digital Tablet / Book Borrow Screen in hands */}
      <rect x="128" y="78" width="38" height="26" rx="4" fill="#0284C7" stroke="#38BDF8" strokeWidth="1.5" />
      <rect x="132" y="82" width="22" height="4" rx="2" fill="#FFFFFF" />
      <rect x="132" y="89" width="16" height="3" rx="1.5" fill="#BAE6FD" />
      {/* Blue "Borrow" button on screen */}
      <rect x="150" y="88" width="12" height="12" rx="3" fill="#10B981" />
      <path d="M 154 94 L 158 94 M 156 92 L 156 96" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" />

      {/* Right Arm supporting device */}
      <path d="M 155 68 C 165 76, 168 88, 158 96 L 150 96" fill="#F59E0B" />
      <ellipse cx="166" cy="94" rx="3.5" ry="3.5" fill="#FDE047" />

      {/* Navy Blue Trousers (Matching reference #1) */}
      <path d="M 122 112 L 160 112 L 162 170 C 162 174, 154 175, 151 170 L 144 132 L 134 170 C 131 175, 123 174, 123 170 Z" fill="#1E293B" />

      {/* White Sneakers */}
      <ellipse cx="127" cy="174" rx="8" ry="4" fill="#F1F5F9" />
      <ellipse cx="156" cy="174" rx="8" ry="4" fill="#F1F5F9" />

      {/* Floating Sparkles & Digital signal */}
      <path d="M 175 45 L 177 50 L 182 52 L 177 54 L 175 59 L 173 54 L 168 52 L 173 50 Z" fill="#38BDF8" />
      <circle cx="185" cy="68" r="2.5" fill="#F59E0B" />
    </svg>
  );
}

