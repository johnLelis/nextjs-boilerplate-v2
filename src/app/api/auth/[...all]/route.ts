import { env } from '@/config/env';
import { auth } from '@/lib/auth/auth';
import { toNextJsHandler } from 'better-auth/next-js';
import { handleArcjet } from '@/lib/middlewares/auth-middleware';

const authHandlers = toNextJsHandler(auth);
export const { GET } = authHandlers;
export const POST = async (request: Request) => {
  const clonedRequest = request.clone();

  if (env.ENABLE_ARCJET === 'true') {
    const arcjetResponse = await handleArcjet(request);
    if (arcjetResponse) return arcjetResponse;
  }

  return authHandlers.POST(clonedRequest);
};
