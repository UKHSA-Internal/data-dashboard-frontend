import LayoutBlackBanner from './components/ui/ukhsa/Layout/LayoutBlackBanner'
import NotFound from './components/ui/ukhsa/NotFound/NotFound'

export async function generateMetadata() {
  return {
    title: 'Page not found | UKHSA data dashboard',
    description: 'Error - Page not found',
  }
}

export default async function NotFoundPage() {
  return (
    <LayoutBlackBanner>
      <NotFound />
    </LayoutBlackBanner>
  )
}
