import { getAcknowledgementPage } from '@/app/utils/cms'

import Form from '../../../features/Acknowledgement/Form'
import { Announcements, View } from '../../ui/ukhsa'
import ClassificationBanner from '../../ui/ukhsa/ClassificationBanner/ClassificationBanner'
import { Heading } from '../../ui/ukhsa/View/Heading/Heading'

export default async function AcknowledgementPage() {
  const {
    title,
    active_announcements,
    body,
    terms_of_service_link_text,
    terms_of_service_link,
    i_agree_checkbox,
    terms_of_service_error,
    disagree_button,
    agree_button,
  } = await getAcknowledgementPage()

  return (
    <View>
      <ClassificationBanner size="large" level="official_sensitive" />
      <Heading heading={title} />
      <Announcements announcements={active_announcements} />
      <hr className="govuk-section-break govuk-section-break--m govuk-section-break--visible" />

      <Form
        iAgreeCheckboxLabel={i_agree_checkbox}
        termsOfServiceError={terms_of_service_error}
        disagreeButtonText={disagree_button}
        agreeButtonText={agree_button}
        body={body}
        terms_of_service_link={terms_of_service_link}
        terms_of_service_link_text={terms_of_service_link_text}
      />
    </View>
  )
}
