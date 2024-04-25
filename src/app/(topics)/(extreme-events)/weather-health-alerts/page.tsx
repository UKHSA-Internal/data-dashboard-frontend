import Link from 'next/link'

import { View } from '@/app/components/ui/ukhsa/View/View'

export default async function Page() {
  return (
    <View heading="Weather health alerts">
      <p>This will be the root topic page for weather health alerts</p>

      <Link
        className="govuk-button govuk-button--secondary inline-flex gap-2 no-js:hidden"
        href={'/weather-health-alerts?view=map'}
      >
        <svg focusable="false" width="15" height="20" viewBox="0 0 15 20">
          <path
            d="M15,7.5c0.009,3.778 -4.229,9.665 -7.5,12.5c-3.271,-2.835 -7.509,-8.722 -7.5,-12.5c0,-4.142 3.358,-7.5 7.5,-7.5c4.142,0 7.5,3.358 7.5,7.5Zm-7.5,5.461c3.016,0 5.461,-2.445 5.461,-5.461c0,-3.016 -2.445,-5.461 -5.461,-5.461c-3.016,0 -5.461,2.445 -5.461,5.461c0,3.016 2.445,5.461 5.461,5.461Z"
            fill="currentColor"
          ></path>
        </svg>
        View map of weather health alerts
      </Link>

      {/* 

      {/* <Map>
        <BaseLayer
          variant="Default"
          options={{ attribution: '', url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png' }}
        /> */}

      {/* <ChoroplethRenderer /> */}
      {/* <WeatherHealthAlertsProvider>
          <Drawer>
            <WeatherHealthAlertDrawerContent />
          </Drawer>

          <WeatherHealthAlertStateConnector>
            <Choropleth />
          </WeatherHealthAlertStateConnector>

        </WeatherHealthAlertsProvider> */}

      {/* <Choropleth onClick={(feature) => console.log('Clicked feature: ', feature)} /> */}
      {/* </Map> */}
    </View>
  )
}
