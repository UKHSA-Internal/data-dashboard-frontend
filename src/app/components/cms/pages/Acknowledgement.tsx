import Link from 'next/link'

import { getAcknowledgementPage } from '@/app/utils/cms'

import Form from '../../../features/Acknowledgement/Form'
import { Announcements, View } from '../../ui/ukhsa'
import { Heading } from '../../ui/ukhsa/View/Heading/Heading'

export default async function AcknowledgementPage() {
  const {
    title,
    body,
    terms_of_service_link_text,
    terms_of_service_link,
    i_agree_checkbox,
    disagree_button,
    agree_button,
    active_announcements,
  } = await getAcknowledgementPage()

  return (
    <View>
      <Heading heading={title} />
      <Announcements announcements={active_announcements} />
      <div className="govuk-!-margin-bottom-6">
        <div dangerouslySetInnerHTML={{ __html: body }} />
        <Link href={terms_of_service_link} className="govuk-link">
          {terms_of_service_link_text}
        </Link>
      </div>
      <Form
        iAgreeCheckboxLabel={i_agree_checkbox}
        disagreeButtonText={disagree_button}
        agreeButtonText={agree_button}
      />
    </View>
  )
}
