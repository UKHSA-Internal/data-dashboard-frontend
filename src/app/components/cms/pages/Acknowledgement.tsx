import Link from 'next/link'

import { RichText } from '@/app/components/cms'
import { getAcknowledgementPage } from '@/app/utils/cms'

import Form from '../../../features/Acknowledgement/Form'
import { Announcements, View } from '../../ui/ukhsa'
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
      <Heading heading={title} />
      <Announcements announcements={active_announcements} />
      <hr className="govuk-section-break govuk-section-break--m govuk-section-break--visible" />
      <div className="govuk-!-margin-bottom-6">
        <RichText>{body}</RichText>
        <Link href={terms_of_service_link} className="govuk-link">
          {terms_of_service_link_text}
        </Link>
      </div>
      <Form
        iAgreeCheckboxLabel={i_agree_checkbox}
        termsOfServiceError={terms_of_service_error}
        disagreeButtonText={disagree_button}
        agreeButtonText={agree_button}
      />
    </View>
  )
}
