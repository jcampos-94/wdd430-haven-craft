// import NextAuth from 'next-auth';
// import GitHubProvider from 'next-auth/providers/github';

// export const {
//   handlers: { GET, POST },
//   auth,
// } = NextAuth({
//   providers: [
//     GitHubProvider({
//       clientId: process.env.GITHUB_ID!,
//       clientSecret: process.env.GITHUB_SECRET!,
//     }),
//   ],
//   callbacks: {
//     async redirect({ url, baseUrl }) {
//       // Forces using the production domain in Vercel
//       return url.startsWith(baseUrl) ? url : baseUrl;
//     },
//   },
// });

import { handlers } from '@/auth';

export const { GET, POST } = handlers;
