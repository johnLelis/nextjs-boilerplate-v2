import { NextAuthOptions } from 'next-auth';
// import { DrizzleAdapter } from '@auth/drizzle-adapter';
// import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';
import GitHubProvider from 'next-auth/providers/github';
// import { db } from '@/lib/db';
// import { AuthService } from '@/services/auth.service';
// import { loginSchema } from '@/lib/validations/auth';

export const authOptions: NextAuthOptions = {
  // adapter: DrizzleAdapter(db),
  // session: {
  //   strategy: 'jwt',
  //   maxAge: 30 * 24 * 60 * 60, // 30 days
  // },
  pages: {
    signIn: '/login',
    signOut: '/login',
    error: '/login',
    verifyRequest: '/verify-email',
    newUser: '/dashboard',
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      allowDangerousEmailAccountLinking: true,
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
      allowDangerousEmailAccountLinking: true,
    }),
    // CredentialsProvider({
    //   name: 'credentials',
    //   credentials: {
    //     email: { label: 'Email', type: 'email' },
    //     password: { label: 'Password', type: 'password' },
    //   },
    //   async authorize(credentials) {
    //     try {
    //       // Validate input
    //       const { email, password } = loginSchema.parse(credentials);

    //       // Authenticate user
    //       const user = await AuthService.login(email, password);

    //       return {
    //         id: user.id,
    //         email: user.email,
    //         name: user.name,
    //         image: user.image,
    //         role: user.role,
    //       };
    //     } catch (error) {
    //       console.error('Auth error:', error);
    //       return null;
    //     }
    //   },
    // }),
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
      // Allow OAuth without email verification
      if (account?.provider !== 'credentials') {
        return true;
      }

      // For credentials, check if email is verified
      // This is handled in AuthService.login
      return true;
    },
    // async jwt({ token, user, account, trigger, session }) {
    //   // Initial sign in
    //   if (user) {
    //     token.id = user.id;
    //     token.role = user.role;
    //     token.email = user.email;
    //   }

    //   // Update token on session update
    //   if (trigger === 'update' && session) {
    //     token.name = session.name;
    //     token.email = session.email;
    //   }

    //   return token;
    // },
    // async session({ session, token }) {
    //   if (token && session.user) {
    //     session.user.id = token.id as string;
    //     session.user.role = token.role as string;
    //     session.user.email = token.email as string;
    //   }
    //   return session;
    // },
  },
  events: {
    async signIn({ user, account, isNewUser }) {
      console.log('User signed in:', user.email);
      // You can add analytics, logging, etc.
    },
    async signOut({ token }) {
      console.log('User signed out:', token?.email);
    },
  },
  debug: process.env.NODE_ENV === 'development',
};
