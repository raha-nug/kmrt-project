// src/middleware.ts
import { withAuth } from "next-auth/middleware";

export default withAuth({
  pages: {
    signIn: "/auth/sign-in", // Arahkan ke halaman sign-in khusus
  },
});

// Tentukan folder mana saja yang wajib login
export const config = {
  matcher: [
    "/dashboard/:path*", // Melindungi semua route yang diawali /dashboard
  ],
};
