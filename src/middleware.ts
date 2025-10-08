export { auth as middleware } from "@/auth"

export const config = {
  matcher: [
    "/sellerDashboard/:path*",
    "/orders/:path*",
    "/profileSettings/:path*",
  ],
}
