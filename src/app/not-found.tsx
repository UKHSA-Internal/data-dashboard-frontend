import NotFound from './(fullWidth)/(notFound)/NotFound'
import LayoutBlackBanner from './components/ui/ukhsa/Layout/LayoutBlackBanner'

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
