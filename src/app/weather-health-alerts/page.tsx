import dynamic from 'next/dynamic'

import { Skeleton, View } from '../components/ui/ukhsa'
import { ChoroplethRenderer } from '../components/ui/ukhsa/Map/WeatherHealthAlerts/ChoroplethRenderer'
import { DrawerContent } from '../components/ui/ukhsa/Map/WeatherHealthAlerts/DrawerContent'

const { Map, BaseLayer } = {
  Map: dynamic(() => import('@/app/components/ui/ukhsa/Map/Map'), {
    ssr: false,
    loading: () => <Skeleton className="h-[50vh]" />,
  }),
  BaseLayer: dynamic(() => import('@/app/components/ui/ukhsa/Map/BaseLayer'), {
    ssr: false,
  }),
}

export default async function Page() {
  return (
    <View heading="React Leaflet">
      <DrawerContent />
      <Map>
        <BaseLayer
          variant="Default"
          options={{ attribution: '', url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png' }}
        />

        <ChoroplethRenderer />
        {/* <WeatherHealthAlertsProvider>
          <Drawer>
            <WeatherHealthAlertDrawerContent />
          </Drawer>

          <WeatherHealthAlertStateConnector>
            <Choropleth />
          </WeatherHealthAlertStateConnector>

        </WeatherHealthAlertsProvider> */}

        {/* <Choropleth onClick={(feature) => console.log('Clicked feature: ', feature)} /> */}
      </Map>
    </View>
  )
}
