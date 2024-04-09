import dynamic from 'next/dynamic'

import { View } from '../components/ui/ukhsa'

export default async function Page() {
  const MapWithNoSSR = dynamic(() => import('./components/Map'), {
    ssr: false,
  })

  return (
    <View heading="React Leaflet">
      <MapWithNoSSR />
    </View>
  )
}
