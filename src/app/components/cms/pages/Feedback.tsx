import { getFeedbackPage } from '@/app/utils/cms'

import { View } from '../../ui/ukhsa'
import { Heading } from '../../ui/ukhsa/View/Heading/Heading'
import Feedback from '../Feedback/Feedback'

export default async function FeedbackPage() {
  const { title, form_fields: formFields } = await getFeedbackPage()

  return (
    <View>
      <Heading heading={title} />
      <Feedback formFields={formFields} />
    </View>
  )
}
