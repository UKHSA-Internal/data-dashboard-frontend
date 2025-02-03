import type { GetServerSidePropsContext, NextApiRequest, NextApiResponse } from 'next'
import type { NextAuthOptions } from 'next-auth'
import { getServerSession } from 'next-auth'
import CognitoProvider from 'next-auth/providers/cognito'

export const config = {
  providers: [
    CognitoProvider({
      clientId: process.env.AUTH_CLIENT_ID,
      clientSecret: process.env.AUTH_CLIENT_SECRET,
      issuer: process.env.AUTH_ISSUER,
    }),
  ],
  callbacks: {
    async session({ session, token }) {
      console.log('session callback: ', session, token)
      // session.idToken = token.idToken
      return session
    },
    async jwt({ token, account }) {
      console.log('jwt callback: ', token, account)

      // if (account) {
      //   token.idToken = account.id_token
      // }
      return token
    },
  },
} satisfies NextAuthOptions

// Use it in server contexts
export function auth(
  ...args: [GetServerSidePropsContext['req'], GetServerSidePropsContext['res']] | [NextApiRequest, NextApiResponse] | []
) {
  return getServerSession(...args, config)
}
