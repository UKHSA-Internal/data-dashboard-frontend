import { isWellKnownEnvironment } from '@/app/utils/app.utils'

export default async function Layout({ children }: { children: React.ReactNode }) {
  // Switchboard shouldn't be accessible in deployed environments
  if (isWellKnownEnvironment(process.env.API_URL)) return null

  return children
}
