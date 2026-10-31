import React from "react";
import Link from "next/link";
import { BookOpen, Mail, Phone, MapPin } from "lucide-react";
import { XIcon } from "@/components/icons/x-icon";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="mt-auto border-t border-border bg-card/60 transition-colors">
      <div className="container mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {/* 1. Brand Logo & Tagline */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2 text-foreground">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                <BookOpen className="h-4 w-4" />
              </div>
              <span className="font-serif text-xl font-bold tracking-tight">
                BookNook
              </span>
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed">
              An elegant digital reading sanctuary where book enthusiasts can discover timeless classics, borrow curated literature, and track their reading journey.
            </p>
          </div>

          {/* 2. Quick Links */}
          <div className="space-y-4">
            <h3 className="font-serif text-sm font-semibold tracking-wider uppercase text-foreground">
              Explore Library
            </h3>
            <ul className="space-y-2.5 text-sm text-muted-foreground">
              <li>
                <Link href="/" className="hover:text-primary transition-colors">
                  Home Catalog
                </Link>
              </li>
              <li>
                <Link href="/books" className="hover:text-primary transition-colors">
                  Browse All Books
                </Link>
              </li>
              <li>
                <Link href="/add-book" className="hover:text-primary transition-colors">
                  Contribute a Book
                </Link>
              </li>
              <li>
                <Link href="/my-borrows" className="hover:text-primary transition-colors">
                  Borrow History
                </Link>
              </li>
            </ul>
          </div>

          {/* 3. Contact Information */}
          <div className="space-y-4">
            <h3 className="font-serif text-sm font-semibold tracking-wider uppercase text-foreground">
              Contact Us
            </h3>
            <ul className="space-y-2.5 text-sm text-muted-foreground">
              <li className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-primary shrink-0" />
                <span>Sanctuary Library Ave, Dhaka, Bangladesh</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-primary shrink-0" />
                <span>support@booknook.library</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-primary shrink-0" />
                <span>+880 1700-000000</span>
              </li>
            </ul>
          </div>

          {/* 4. Social Links (with NEW X Logo) */}
          <div className="space-y-4">
            <h3 className="font-serif text-sm font-semibold tracking-wider uppercase text-foreground">
              Connect With Us
            </h3>
            <p className="text-sm text-muted-foreground">
              Follow our community updates and literary discussions on social media.
            </p>
            <div className="flex items-center gap-3">
              {/* Mandatory NEW X logo as per Assignment PDF Requirement #9 */}
              <a
                href="https://x.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Follow us on X"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-muted text-foreground hover:bg-primary hover:text-primary-foreground transition-all duration-200"
              >
                <XIcon className="h-4 w-4" />
              </a>

              {/* GitHub SVG */}
              <a
                href="https://github.com/furkanahmed/booknook"
                target="_blank"
                rel="noreferrer"
                aria-label="GitHub Repository"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-muted text-foreground hover:bg-primary hover:text-primary-foreground transition-all duration-200"
              >
                <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
                  <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                </svg>
              </a>

              {/* LinkedIn SVG */}
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-muted text-foreground hover:bg-primary hover:text-primary-foreground transition-all duration-200"
              >
                <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
                  <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright Notice */}
        <div className="mt-12 border-t border-border pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
          <p>© {currentYear} BookNook Online Library. All rights reserved.</p>
          <p className="italic">
            “Add a book, borrow a book, return a book.”
          </p>
        </div>
      </div>
    </footer>
  );
}
