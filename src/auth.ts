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
    //user sign-in
    async signIn({ user, account }) {
      if (!user?.email) return false;

      try {
        const githubId = account?.providerAccountId;

        const { rows } = await sql`
          SELECT * FROM sellers WHERE email = ${user.email};
        `;

        if (rows.length === 0) {
          await sql`
            INSERT INTO sellers (name, email, profile_image, github_id)
            VALUES (${user.name || "Unnamed Seller"}, ${user.email}, ${user.image}, ${githubId});
          `;
          console.log("✅ New seller created:", user.email);
        } else {
          const seller = rows[0];
          if (!seller.github_id && githubId) {
            await sql`
              UPDATE sellers
              SET github_id = ${githubId}
              WHERE email = ${user.email};
            `;
            console.log("🔄 Added missing GitHub ID for:", user.email);
          }
        }

        return true;
      } catch (error) {
        console.error("❌ Error during sign-in:", error);
        return false;
      }
    },

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
  },
  session: { strategy: "jwt" },
};

export const { handlers, auth, signIn, signOut } = NextAuth(authConfig)
