import { PageResponse } from '@/api/requests/cms/getPage'
import { PageType } from '@/api/requests/cms/getPages'

export const acknowledgementPageMock: PageResponse<PageType.Acknowledgement> = {
  id: 27,
  meta: {
    type: 'acknowledgement.AcknowledgementPage',
    detail_url: 'http://localhost/api/pages/27/',
    html_url: 'http://localhost/acknowledgement/',
    slug: 'acknowledgement',
    show_in_menus: false,
    seo_title: 'Accessing official sensitive data | UKHSA data dashboard',
    search_description: 'Acknowledgement required to access the dashboard',
    first_published_at: '2023-05-12T16:51:07.555450+01:00',
    alias_of: null,
    parent: {
      id: 3,
      meta: {
        type: 'home.LandingPage',
        detail_url: 'http://localhost:8000/api/pages/27/',
        html_url: null,
      },
      title: 'UKHSA Dashboard Root',
    },
  },
  title: 'Accessing official sensitive data',
  body: `
    <div class="bg-gray-50 mb-6 rounded">
      <p class="mb-4">By accessing this dashboard you agree to:</p>
      <ul class="govuk-list govuk-list--bullet text-xl">
        <li>Not share any content with persons that do not have permission to access the none public dashboard</li>
        <li>Not distribute or share any content from the none public dashboard online</li>
        <li>Not leave your workstation un-attended whilst logged into the dashboard</li>
        <li>Only connect using secure networks whilst accessing the none public dashboard</li>
        <li>Ensure the environment you are working in is secure and your screen is not visible to others</li>
      </ul>
      <a href="#terms" class="govuk-link text-xl">
        Read full terms of service here
      </a>
    </div>
  `,
  terms_of_service_link_text: 'Read full terms of service here',
  terms_of_service_link: '#terms',
  i_agree_checkbox: 'I agree to the terms of service',
  disagree_button: 'Disagree',
  agree_button: 'Agree',

  // These exist on SharedPageData, but your acknowledgement schema allows fallbacks/optionals
  last_published_at: '2023-05-12T16:53:51.464146+01:00',
  last_updated_at: '2024-07-02T12:44:54.461914+01:00',
  seo_change_frequency: 5,
  seo_priority: 0.5,
}
