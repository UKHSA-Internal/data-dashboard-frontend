import NotFound from '@/app/components/ui/ukhsa/NotFound/NotFound'

export async function generateMetadata() {
  return {
    title: 'Page not found | UKHSA data dashboard',
    description: 'Error - Page not found',
  }
}

// The pages layout already provides the header and navigation.
export default NotFound
