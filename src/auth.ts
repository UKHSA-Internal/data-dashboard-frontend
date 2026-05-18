import 'next-auth/jwt'

import NextAuth from 'next-auth'
import type { Provider } from 'next-auth/providers'
import Cognito from 'next-auth/providers/cognito'

const providers: Provider[] = [
  Cognito({
    clientId: process.env.AUTH_CLIENT_ID,
    clientSecret: process.env.AUTH_CLIENT_SECRET,
    issuer: process.env.AUTH_CLIENT_URL,
    checks: ['pkce', 'state', 'nonce'],
    profile(profile) {
      return {
        id: profile.sub,
        name: profile.name ?? profile.preferred_username,
        email: profile.email,
        image: profile.picture ?? null,
      }
    },
  }),
]

const tenMinutes = 60 * 10

const {
  handlers,
  signIn,
  signOut,
  auth: realAuth,
} = NextAuth({
  secret: process.env.AUTH_SECRET,
  session: {
    strategy: 'jwt',
    maxAge: tenMinutes,
  },
  trustHost: true,
  useSecureCookies: process.env.NEXTAUTH_URL?.startsWith('https://'),
  providers,
  pages: {
    error: '/authentication-error',
    signOut: '/auth/signout',
    signIn: '/start',
  },
  callbacks: {
    async jwt({ token, account }) {
      if (account) {
        return {
          ...token,
          access_token: account.access_token,
          expires_at: account.expires_at,
          refresh_token: account.refresh_token,
        }
      }
      return token
    },
    async session({ session, token }) {
      session.error = token.error
      session.accessToken = token.access_token
      session.refreshToken = token.refresh_token
      return session
    },
  },
})

// Mock auth in e2e/test environment
const auth =
  process.env.MOCK_SESSION === 'true'
    ? async () => ({
        user: {
          id: 'mock-user-123',
          name: process.env.MOCK_SESSION_USERNAME ?? 'Test User',
          email: 'test@ukhsa.gov.uk',
          image: null,
        },
        accessToken: 'mock-access-token',
        refreshToken: 'mock-refresh-token',
        expires: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
      })
    : realAuth

export { auth, handlers, signIn, signOut }

declare module 'next-auth' {
  interface Session {
    accessToken?: string
    refreshToken?: string
    error?: string
    expires?: Date
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    email?: string
    sub?: string
    access_token?: string
    expires_at?: number
    refresh_token?: string
    error?: 'RefreshTokenError'
  }
}
