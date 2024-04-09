import dynamic from 'next/dynamic'

import { Modal } from './Modal'

export default function Page() {
  const MapWithNoSSR = dynamic(() => import('@/app/weather-health-alerts/components/Map'), {
    ssr: false,
  })

  return (
    <Modal>
      <MapWithNoSSR style={{ height: '100vh' }} />
    </Modal>
  )
}
