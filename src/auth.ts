import NextAuth from "next-auth"
import GitHub from "next-auth/providers/github"
import type { NextAuthConfig } from "next-auth"

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
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user
      const isOnDashboard = nextUrl.pathname.startsWith("/sellerDashboard")
      const isOnOrders = nextUrl.pathname.startsWith("/orders")
      const isOnProfileSettings = nextUrl.pathname.startsWith("/profileSettings")
      
  
      if (isOnDashboard || isOnOrders || isOnProfileSettings) {
        if (isLoggedIn) return true
        return false 
      }
      
      return true
    },
  },
  session: {
    strategy: "jwt",
  },
}

export const { handlers, auth, signIn, signOut } = NextAuth(authConfig)
