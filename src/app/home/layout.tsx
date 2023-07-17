import { BackToTop } from '../components/ui/ukhsa'

export default async function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <BackToTop />
    </>
  )
}
