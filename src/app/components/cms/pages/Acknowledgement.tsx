import { View } from '@/app/components/ui/ukhsa'
import { Heading } from '@/app/components/ui/ukhsa/View/Heading/Heading'
import { getAcknowledgementPage } from '@/app/utils/cms'

import AcknowledgementForm from './AcknowledgementForm'

export default async function DataAcknowledgement() {
  const { title, body } = await getAcknowledgementPage()

  return (
    <View>
      <Heading heading={title} />
      <div className="my-6 border-b border-[#b1b4b6]"></div>
      <h2 className="govuk-heading-l govuk-!-margin-bottom-5">Acknowledgement</h2>
      <div dangerouslySetInnerHTML={{ __html: body }} />
      <AcknowledgementForm />
    </View>
  )
}
