import { Header } from '@/components/AppDir/Header/Header'
import { Metadata } from 'next'

import './globals.scss'

export const metadata: Metadata = {
  title: 'Home',
  description: 'Welcome to Next.js',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Header />
        <div className="govuk-width-container">
          <main className="govuk-main-wrapper">{children}</main>
        </div>
      </body>
    </html>
  )
}
