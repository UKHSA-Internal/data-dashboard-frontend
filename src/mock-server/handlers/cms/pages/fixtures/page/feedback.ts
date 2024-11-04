import { PageResponse } from '@/api/requests/cms/getPage'
import { PageType } from '@/api/requests/cms/getPages'

export const feedbackMock: PageResponse<PageType.Feedback> = {
  id: 81,
  meta: {
    seo_title: 'Feedback | UKHSA Data Dashboard',
    type: 'feedback.FormPage',
    detail_url: 'https://localhost/api/pages/79/',
    html_url: 'https://localhost/feedback/',
    slug: 'feedback',
    show_in_menus: false,
    search_description: '',
    first_published_at: '2024-09-24T16:10:15.822342+01:00',
    alias_of: null,
    parent: {
      id: 3,
      meta: {
        type: 'home.UKHSARootPage',
        detail_url: 'https://localhost/api/pages/3/',
        html_url: null,
      },
      title: 'UKHSA Dashboard Root',
    },
  },
  title: 'UKHSA data dashboard feedback',
  seo_change_frequency: 5,
  seo_priority: 0.5,
  last_updated_at: '2024-09-24T16:11:13.314794+01:00',
  body: '',
  form_fields: [
    {
      id: 1,
      meta: {
        type: 'feedback.FormField',
      },
      clean_name: 'what_was_your_reason_for_visiting_the_dashboard_today',
      label: 'What was your reason for visiting the dashboard today?',
      field_type: 'multiline',
      help_text:
        'We will not be able to get in touch with you about your responses so please do not leave any personal details, such as your name or email address.',
      required: false,
      choices: '',
      default_value: '',
    },
    {
      id: 2,
      meta: {
        type: 'feedback.FormField',
      },
      clean_name: 'did_you_find_everything_you_were_looking_for',
      label: 'Did you find everything you were looking for?',
      field_type: 'radio',
      help_text: '',
      required: false,
      choices: 'Yes\r\nNo',
      default_value: '',
    },
    {
      id: 3,
      meta: {
        type: 'feedback.FormField',
      },
      clean_name: 'how_could_we_improve_your_experience_with_the_dashboard',
      label: 'How could we improve your experience with the dashboard?',
      field_type: 'multiline',
      help_text: '',
      required: false,
      choices: '',
      default_value: '',
    },
    {
      id: 4,
      meta: {
        type: 'feedback.FormField',
      },
      clean_name: 'what_would_you_like_to_see_on_the_dashboard_in_the_future',
      label: 'What would you like to see on the dashboard in the future?',
      field_type: 'multiline',
      help_text: '',
      required: false,
      choices: '',
      default_value: '',
    },
  ],
  confirmation_slug: 'confirmation',
  confirmation_panel_title: 'Form submitted',
  confirmation_panel_text: 'Thank you for your feedback',
  confirmation_body:
    '<p data-block-key="bguyf">Thank you for giving feedback on the UKHSA data dashboard. We will use your comments to help us continually improve the service. We will not be able to get in touch with you about your comments.</p><p data-block-key="2ao03">The feedback form is intended for feedback on your experience using the dashboard. If you need to get in touch with UK Health Security Agency, you can find contact information at the bottom of the <a href="https://www.gov.uk/government/organisations/uk-health-security-agency">UKHSA webpage</a></p>',
  last_published_at: '2024-03-13T11:08:26.858539Z',
}
