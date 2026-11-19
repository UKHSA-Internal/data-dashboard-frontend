import NotFound from '@/app/components/ui/ukhsa/NotFound/NotFound'

export function generateMetadata() {
  return {
    title: 'Page not found | UKHSA data dashboard',
    description: 'Error - Page not found',
  }
}

// The CMS layout already supplies the header, search and phase banner.
export default NotFound
