// Ref: https://next-auth.js.org/configuration/nextjs#advanced-usage
import { NextRequestWithAuth, withAuth } from "next-auth/middleware";
import NextAuth from "next-auth/next";
import { NextResponse } from "next/server";

export default withAuth(
  // `withAuth` augments your `Request` with the user's token.
  function middleware(request: NextRequestWithAuth) {
    if (
      request.nextUrl.pathname.startsWith("/login-register") &&
      request.nextauth?.token
    ) {
      return NextResponse.rewrite(new URL("/", request.url));
    }

    if (request.nextUrl.pathname.startsWith("/tools/pokemon-sleep")) {
      return NextResponse.next();
    }
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
  }
);

// Applies next-auth only to matching routes - can be regex
// Ref: https://nextjs.org/docs/app/building-your-application/routing/middleware#matcher
export const config = { matcher: ["/tools/pokemon-sleep"] };
