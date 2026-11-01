"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}

export interface BorrowRecord {
  bookId: string;
  userEmail: string;
  borrowedAt: string;
  returnDate: string;
}

interface AuthContextType {
  user: AuthUser | null;
  loading: boolean;
  login: (user: AuthUser, token?: string) => void;
  logout: () => void;
  borrowedBooks: string[]; // List of book IDs currently borrowed by active user
  userBorrows: BorrowRecord[]; // List of borrow records for active user
  recordBorrow: (bookId: string, returnDate: string) => boolean;
  returnBook: (bookId: string) => boolean;
  hasBorrowed: (bookId: string) => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const AUTH_USER_KEY = "booknook_active_user";
const AUTH_TOKEN_KEY = "booknook_auth_token";
const BORROW_RECORDS_KEY = "booknook_borrow_records";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [allBorrows, setAllBorrows] = useState<BorrowRecord[]>([]);

  useEffect(() => {
    try {
      const storedUser = localStorage.getItem(AUTH_USER_KEY);
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }

      const storedBorrows = localStorage.getItem(BORROW_RECORDS_KEY);
      if (storedBorrows) {
        setAllBorrows(JSON.parse(storedBorrows));
      }
    } catch (e) {
      console.error("Failed to load auth/borrow state:", e);
    } finally {
      setLoading(false);
    }
  }, []);

  const login = (newUser: AuthUser, token?: string) => {
    setUser(newUser);
    try {
      localStorage.setItem(AUTH_USER_KEY, JSON.stringify(newUser));
      if (token) {
        localStorage.setItem(AUTH_TOKEN_KEY, token);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const logout = () => {
    setUser(null);
    try {
      localStorage.removeItem(AUTH_USER_KEY);
      localStorage.removeItem(AUTH_TOKEN_KEY);
    } catch (e) {
      console.error(e);
    }
  };

  const recordBorrow = (bookId: string, returnDate: string): boolean => {
    if (!user) return false;

    // Check if already borrowed
    const exists = allBorrows.some(
      (b) => b.bookId === bookId && b.userEmail.toLowerCase() === user.email.toLowerCase()
    );
    if (exists) return false;

    const newRecord: BorrowRecord = {
      bookId,
      userEmail: user.email,
      borrowedAt: new Date().toISOString(),
      returnDate,
    };

    const updated = [...allBorrows, newRecord];
    setAllBorrows(updated);
    try {
      localStorage.setItem(BORROW_RECORDS_KEY, JSON.stringify(updated));
    } catch (e) {
      console.error(e);
    }
    return true;
  };

  const returnBook = (bookId: string): boolean => {
    if (!user) return false;

    const updated = allBorrows.filter(
      (b) => !(b.bookId === bookId && b.userEmail.toLowerCase() === user.email.toLowerCase())
    );

    setAllBorrows(updated);
    try {
      localStorage.setItem(BORROW_RECORDS_KEY, JSON.stringify(updated));
    } catch (e) {
      console.error(e);
    }
    return true;
  };

  const hasBorrowed = (bookId: string): boolean => {
    if (!user) return false;
    return allBorrows.some(
      (b) => b.bookId === bookId && b.userEmail.toLowerCase() === user.email.toLowerCase()
    );
  };

  const userBorrows = user
    ? allBorrows.filter((b) => b.userEmail.toLowerCase() === user.email.toLowerCase())
    : [];

  const borrowedBooks = userBorrows.map((b) => b.bookId);

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        logout,
        borrowedBooks,
        userBorrows,
        recordBorrow,
        returnBook,
        hasBorrowed,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

