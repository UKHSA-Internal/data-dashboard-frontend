import 'next-auth/jwt'

import NextAuth from 'next-auth'
import Cognito from 'next-auth/providers/cognito'

export const { handlers, signIn, signOut, auth } = NextAuth({
  secret: process.env.AUTH_SECRET,
  session: {
    strategy: 'jwt',
  },
  trustHost: true,
  useSecureCookies: process.env.NEXTAUTH_URL?.startsWith('https://'),
  providers: [
    Cognito({
      clientId: process.env.AUTH_CLIENT_ID,
      clientSecret: process.env.AUTH_CLIENT_SECRET,
      issuer: process.env.AUTH_CLIENT_URL,
      profile(profile) {
        return {
          id: profile.sub,
          name: profile.name ?? profile.preferred_username,
          email: profile.email,
          image: profile.picture ?? null,
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, account }) {
      //   console.log('user', user)
      if (account) {
        // First-time login, save the `access_token`, its expiry and the `refresh_token`
        return {
          ...token,
          access_token: account.access_token,
          expires_at: account.expires_at,
          refresh_token: account.refresh_token,
        }
      }
      // This is where we'd usually check for expired tokens but to next-auth incompatibility with app router read only cookies, we cannot modify the JWT with the refreshed token.
      // A workaround is implemented in middleware.ts
      return token
    },

    async session({ session, token }) {
      session.error = token.error
      session.refreshToken = token.refresh_token
      return session
    },
  },
})

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
