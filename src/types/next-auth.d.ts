export {} // Forces TS to extend types with the existing NextAuth types

/**
 * Extend the default NextAuth.js types
 */
declare module 'next-auth' {
  interface User {
    email: string
  }

  interface Session {
    user: User
  }
}
