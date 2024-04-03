import { Metadata } from 'next'

import { View } from '@/app/components/ui/ukhsa'

import Form from './form'

export const metadata: Metadata = {
  title: 'Feedback | UKHSA data dashboard',
}

export default function Feedback() {
  return (
    <View heading="UKHSA data dashboard feedback">
      <div className="govuk-grid-row">
        <Form />
      </div>
    </View>
  )
}
