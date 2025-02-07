import NextAuth from 'next-auth'
import Cognito from 'next-auth/providers/cognito'

export const { handlers, signIn, signOut, auth } = NextAuth({
  secret: process.env.AUTH_SECRET,
  session: {
    strategy: 'jwt',
  },
  providers: [
    Cognito({
      clientId: process.env.AUTH_CLIENT_ID,
      clientSecret: process.env.AUTH_CLIENT_SECRET,
      issuer: process.env.AUTH_CLIENT_URL,
    }),
  ],
  callbacks: {
    async session(session) {
      console.log('session callback: ', session)
      return session.session
    },
    async jwt(jwt) {
      console.log('jwt callback: ', jwt)
      return jwt.token
    },
  },
})
