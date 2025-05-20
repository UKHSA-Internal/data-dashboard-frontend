import { getFeedbackPage } from '@/app/utils/cms'

import { Announcements, View } from '../../ui/ukhsa'
import { Heading } from '../../ui/ukhsa/View/Heading/Heading'
import Feedback from '../Feedback/Feedback'

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
