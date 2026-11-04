import type { Metadata } from 'next'

import Acknowledgement from '@/app/components/cms/pages/Acknowledgement'
import { NO_INDEX_ROBOTS } from '@/app/utils/seo.utils'

export const metadata: Metadata = {
  robots: NO_INDEX_ROBOTS,
}

export default function AcknowledgementPage() {
  return <Acknowledgement />
}
