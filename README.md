# BookNook — A Modern Online Digital Library

BookNook is an online library web application where book enthusiasts can discover curated literature, contribute new books, borrow titles with real-time copy tracking, and manage their personal reading collections.

## Live Website & Repositories
- **Live Website:** [https://booknook-nine.vercel.app](https://booknook-nine.vercel.app)
- **Client GitHub Repository:** [https://github.com/furkanahmed/booknook](https://github.com/furkanahmed/booknook)
- **Server GitHub Repository:** [https://github.com/furkanahmed/booknook-server](https://github.com/furkanahmed/booknook-server)

## Key Features
- **Interactive Home Experience:** Swiper.js dynamic carousel with 3 featured slides, real-time New Arrivals section, and informative guide sections.
- **Dynamic Book Catalog & CRUD:** Explore library books with responsive card grids, add new titles with image uploads, view in-depth details, and edit/delete your contributed books.
- **Smart Borrowing Engine:** Robust borrowing system with duplicate borrow prevention, available copy decrement/increment (`$inc`), and return management.
- **Secure Authentication & Protected Routes:** BetterAuth and JWT token verification protecting private actions (`/add-book`, `/my-books`, `/my-borrows`), preserving sessions across page refreshes, and redirecting unauthenticated users smoothly.
- **Polished UI & Accessibility:** Crafted with Tailwind CSS and modern UI components, responsive across mobile, tablet, and desktop, featuring route-specific titles, custom loading skeletons, modal alerts, and a custom 404 page.

## Tech Stack
- **Frontend:** Next.js (App Router), React, TypeScript, Tailwind CSS, Lucide Icons, Sonner Toasts, Swiper.js
- **Authentication:** BetterAuth, JWT Token Verification, Google Social Sign-in
- **Backend:** Node.js, Express.js
- **Database:** MongoDB Atlas

## Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Environment Variables
Create a `.env.local` file in the root of the client project:
```env
NEXT_PUBLIC_API_URL=http://localhost:5000
NEXT_PUBLIC_APP_URL=http://localhost:3000
BETTER_AUTH_URL=http://localhost:3000
BETTER_AUTH_SECRET=your_auth_secret_key
MONGO_URI=your_mongodb_connection_uri
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
```

### 3. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.
