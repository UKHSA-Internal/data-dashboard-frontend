import { getFeedbackPage } from '@/app/utils/cms'

import Feedback from '../../../features/Feedback/Feedback'
import { Announcements, View } from '../../ui/ukhsa'
import { Heading } from '../../ui/ukhsa/View/Heading/Heading'

export default async function FeedbackPage() {
  const { title, form_fields: formFields, active_announcements: activeAnnouncements } = await getFeedbackPage()

  return (
    <View>
      <Heading heading={title} />
      <Announcements announcements={activeAnnouncements} />
      <Feedback formFields={formFields} />
    </View>
  )
}
