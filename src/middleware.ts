import { NextRequest } from 'next/server';
import { authMiddleware } from './lib/middlewares/auth-middleware';
export const middleware = async (request: NextRequest) => {
  //use imported middlewares here
  //Require auth for protected routes
  const authResponse = await authMiddleware(request);
  return authResponse;
};

export const config = {
  runtime: 'nodejs',
  // Apply middleware to specific routes
  matcher: [
    '/(about|dashboard)/:path*',
    // This regex says: match /api/ followed by anything that's NOT "auth"
    '/api/((?!auth).*)/:path*',
  ],
};
