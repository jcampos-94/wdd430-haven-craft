import NextAuth from "next-auth"
import GitHub from "next-auth/providers/github"
import type { NextAuthConfig } from "next-auth"
import { sql } from "@vercel/postgres"
import type { Seller } from "@/app/lib/data";

export const authConfig: NextAuthConfig = {
  providers: [
    GitHub({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
  ],
  pages: {
    signIn: "/login",
  },
  callbacks: {
     // Runs when a user signs in
    async signIn({ user }) {
      if (!user?.email) return false;

      try {
        const { rows } = await sql`
          SELECT * FROM sellers WHERE email = ${user.email};
        `;

        // If no seller exists, create one
        if (rows.length === 0) {
          await sql`
            INSERT INTO sellers (name, email, profile_image)
            VALUES (${user.name || "Unnamed Seller"}, ${user.email}, ${user.image});
          `;
          console.log("✅ New seller created:", user.email);
        }

        // Either way, sign-in succeeds
        return true;
      } catch (error) {
        console.error("❌ Error during sign-in:", error);
        return false;
      }
    },

    // Add seller info to the session (available via useSession / getServerSession)
    async session({ session }) {
      if (!session?.user?.email) return session;

      try {
        const { rows } = await sql`
          SELECT * FROM sellers WHERE email = ${session.user.email};
        `;

        if (rows.length > 0) {
          const seller = rows[0] as Seller;
          session.user.seller = seller;
        }
        
      } catch (error) {
        console.error("Error attaching seller info to session:", error);
      }

      return session;
    },
    
    // authorized({ auth, request: { nextUrl } }) {
    //   const isLoggedIn = !!auth?.user
    //   const isOnDashboard = nextUrl.pathname.startsWith("/sellerDashboard")
    //   const isOnOrders = nextUrl.pathname.startsWith("/orders")
    //   const isOnProfileSettings = nextUrl.pathname.startsWith("/profileSettings")
      
  
    //   if (isOnDashboard || isOnOrders || isOnProfileSettings) {
    //     if (isLoggedIn) return true
    //     return false 
    //   }
      
    //   return true
    // },
  },
  session: {
    strategy: "jwt",
  },
}

export const { handlers, auth, signIn, signOut } = NextAuth(authConfig)
