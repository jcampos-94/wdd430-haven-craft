import NextAuth from "next-auth";
import type { Seller } from "@/app/lib/data";

declare module "next-auth" {
  interface Session {
    user: {
      id: number;
      name: string;
      email: string;
      seller?: Seller;
    };
  }
}