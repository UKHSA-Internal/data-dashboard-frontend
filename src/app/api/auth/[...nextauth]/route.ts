import NextAuth from 'next-auth'

import { config } from '@/app/utils/auth.utils'

const handler = NextAuth(config)

export { handler as GET, handler as POST }
