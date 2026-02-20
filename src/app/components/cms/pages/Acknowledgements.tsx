import { View } from '@/app/components/ui/ukhsa'
import { Heading } from '@/app/components/ui/ukhsa/View/Heading/Heading'
import { getAcknowledgementsPage } from '@/app/utils/cms'

import AcknowledgementsForm from './AcknowledgementsForm'

export default async function DataAcknowledgement() {
  const { title, body } = await getAcknowledgementsPage()

  return (
    <View>
      <Heading heading={title} />
      <div className="my-6 border-b border-[#b1b4b6]"></div>
      <h2 className="govuk-heading-l govuk-!-margin-bottom-5">Acknowledgement</h2>
      <div dangerouslySetInnerHTML={{ __html: body }} />
      <AcknowledgementsForm />
    </View>
  )
}
