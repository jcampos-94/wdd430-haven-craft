import NextAuth, { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session extends DefaultSession {
    user: DefaultSession["user"] & {
      id?: number;
      email: string;
      seller?: {
        id: number;
        name: string;
        email: string;
        location?: string;
        craft?: string;
        profile_image?: string;
      };
    };
  }
}