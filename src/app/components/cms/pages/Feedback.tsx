import { getFeedbackPage } from '@/app/utils/cms'

import { View } from '../../ui/ukhsa'
import Feedback from '../Feedback/Feedback'

export default async function FeedbackPage() {
  const { title, form_fields } = await getFeedbackPage()

  return (
    <View heading={title}>
      <Feedback formFields={form_fields} />
    </View>
  )
}
