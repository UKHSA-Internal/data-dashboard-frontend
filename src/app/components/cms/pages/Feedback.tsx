import { getFeedbackPage } from '@/app/utils/cms'

import { Announcements, View } from '../../ui/ukhsa'
import Feedback from '../../ui/ukhsa/Feedback/Feedback'
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
