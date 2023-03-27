import { CommonPage, PageResponse } from '@/api/requests/cms/getPage'
import { relatedLinksMock } from '../elements'

export const aboutPageMock: PageResponse<CommonPage> = {
  id: 7,
  meta: {
    type: 'common.CommonPage',
    detail_url: 'http://localhost/api/v2/pages/6/',
    html_url: 'http://localhost/home-page/about/',
    slug: 'about',
    show_in_menus: false,
    seo_title: '',
    search_description: '',
    first_published_at: '2023-03-16T09:26:32.597358Z',
    alias_of: null,
    parent: {
      id: 4,
      meta: {
        type: 'home.HomePage',
        detail_url: 'http://localhost/api/v2/pages/4/',
        html_url: 'http://localhost/home-page/',
      },
      title: 'Home page',
    },
  },
  title: 'About',
  date_posted: '2023-03-16',
  body: '<h2 data-block-key="99gel">Respiratory viruses</h2><p data-block-key="7orta">Respiratory viruses can infect any age group. Some people (including children and the elderly) are more likely to become seriously ill or have other complications because of respiratory viruses. In the UK many of these viruses are seasonal and tend to circulate at higher levels during the winter months.</p><h2 data-block-key="d98be">Viruses</h2><p data-block-key="a49r9">The respiratory viruses we are reporting on are:</p><ul><li data-block-key="9glem">Influenza</li><li data-block-key="3n1u1">Respiratory syncytial viruses (RSV)</li><li data-block-key="3au8">Coronavirus or COVID-19 (SARS-CoV-2)</li><li data-block-key="e5d2c">Adenovirus</li><li data-block-key="2pr6p">Parainfluenza</li><li data-block-key="flik7">Rhinovirus</li><li data-block-key="3e2th">Human parainfluenza viruses (hMPV)</li></ul><p data-block-key="80g5t">On each page we give an overview of the data available on the virus, along with an explanation of the virus and the illnesses they can cause.</p><h2 data-block-key="a14a6">Cases</h2><p data-block-key="6msk6">A case is when someone is confirmed as having an illness through a positive test. We report on the case numbers for different respiratory viruses.</p><p data-block-key="1aqm1">For many of the respiratory viruses we report on, the data available on positive tests is only those which have been reported by healthcare providers (like GP surgeries and hospitals). It&#x27;s important when looking at case data to take this into consideration as it means not all cases will be show. For example, someone who becomes ill with the flu but doesn&#x27;t seek medical treatment would not be counted as a case.</p><h2 data-block-key="9umlb">Hospitalisations</h2><p data-block-key="emcgb">We report on the number of patients admitted to hospital with a type of virus. The hospitalisations data we report on is:</p><ul><li data-block-key="fn5tq">Respiratory emergency care admissions</li><li data-block-key="aat6v">Influenza hospitalisations</li><li data-block-key="28tl3">RSV hospitalisations</li><li data-block-key="7f21r">COVID-19 hospitalisations</li></ul><h2 data-block-key="fi8ap">Vaccines</h2><p data-block-key="105u2">We report on the number of vaccines given for:</p><ul><li data-block-key="f3epq">COVID-19</li><li data-block-key="6s11p">Influenza</li></ul><p data-block-key="7rdqe">People offered a vaccine is different for each virus, depending on target groups recommended by healthcare professionals.</p><h2 data-block-key="764m0">Deaths</h2><p data-block-key="acgo">We report on deaths related to COVID-19, including:</p><ul><li data-block-key="8khto">Deaths with 28 days of a positive COVID-19 test - deaths with COVID.</li><li data-block-key="27qd0">Deaths with COVID-19 on the death certificate - deaths from COVID.</li></ul><p data-block-key="cohnh">We also report on the excess deaths caused by respiratory viruses.</p><p data-block-key="59ct5"></p>',
  related_links: relatedLinksMock,
  last_published_at: '2023-03-18T10:25:34.452098Z',
}
