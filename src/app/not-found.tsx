import NotFound from './(fullWidth)/(notFound)/NotFound'

export async function generateMetadata() {
  return {
    title: 'Page not found | UKHSA data dashboard',
    description: 'Error - Page not found',
  }
}

export default async function NotFoundPage() {
  return <NotFound />
}
