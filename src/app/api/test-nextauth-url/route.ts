import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    nextauth_url: process.env.NEXTAUTH_URL,
  });
}