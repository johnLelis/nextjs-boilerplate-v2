import arcjet, {
  BotOptions,
  detectBot,
  EmailOptions,
  protectSignup,
  shield,
  slidingWindow,
  SlidingWindowRateLimitOptions,
} from '@arcjet/next';
import { auth } from '@/lib/auth';
import { findIp } from '@arcjet/ip';

const botSettings = { mode: 'LIVE', allow: [] } satisfies BotOptions;
const restrictiveRateLimitSettings = {
  mode: 'LIVE',
  max: 10,
  interval: '10m',
} as SlidingWindowRateLimitOptions<[]>;
const laxRateLimitSettings = {
  mode: 'LIVE',
  max: 60,
  interval: '1m',
} as SlidingWindowRateLimitOptions<[]>;

const emailSettings = {
  mode: 'LIVE',
  block: ['DISPOSABLE', 'INVALID', 'NO_MX_RECORDS'],
} satisfies EmailOptions;

const aj = arcjet({
  key: process.env.ARCJET_KEY!, // Get your site key from https://app.arcjet.com
  characteristics: ['userIdOrIp'],
  rules: [
    // Shield protects your app from common attacks e.g. SQL injection
    shield({ mode: 'LIVE' }),
    // Create a bot detection rule
    detectBot({
      mode: 'LIVE', // Blocks requests. Use "DRY_RUN" to log only
      // Block all bots except the following
      allow: [
        // 'CATEGORY:SEARCH_ENGINE', // Google, Bing, etc
        // Uncomment to allow these other common bot categories
        // See the full list at https://arcjet.com/bot-list
        //"CATEGORY:MONITOR", // Uptime monitoring services
        //"CATEGORY:PREVIEW", // Link previews e.g. Slack, Discord
      ],
    }),
  ],
});

export const checkArcjet = async (request: Request) => {
  const body = (await request.json()) as unknown;
  const session = await auth.api.getSession({ headers: request.headers });
  const userIdOrIp = (session?.user.id ?? findIp(request)) || '127.0.0.1';

  if (request.url.endsWith('auth/sign-up/email')) {
    if (
      body &&
      typeof body === 'object' &&
      'email' in body &&
      typeof body.email === 'string'
    ) {
      return aj
        .withRule(
          protectSignup({
            email: emailSettings,
            bots: botSettings,
            rateLimit: restrictiveRateLimitSettings,
          })
        )
        .protect(request, { email: body.email, userIdOrIp });
    } else {
      return aj
        .withRule(detectBot(botSettings))
        .withRule(slidingWindow(restrictiveRateLimitSettings))
        .protect(request, { userIdOrIp });
    }
  }

  return aj
    .withRule(detectBot(botSettings))
    .withRule(slidingWindow(laxRateLimitSettings))
    .protect(request, { userIdOrIp });
};
