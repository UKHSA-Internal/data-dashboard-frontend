import { PageResponse } from '@/api/requests/cms/getPage'
import { PageType } from '@/api/requests/cms/getPages'

import { relatedLinksMock } from '../elements/related-links'

export const aboutPageMock: PageResponse<PageType.Common> = {
  id: 115,
  meta: {
    type: 'common.CommonPage',
    detail_url: 'http://localhost/api/pages/115/',
    html_url: 'http://localhost/about/',
    slug: 'about',
    show_in_menus: true,
    seo_title: 'About | UKHSA data dashboard',
    search_description:
      'The UKHSA data dashboard provides presents a wide range of public health data in an easily accessible format.',
    first_published_at: '2023-05-16T11:18:41.084933+01:00',
    alias_of: null,
    parent: {
      id: 3,
      meta: {
        type: 'home.HomePage',
        detail_url: 'http://localhost:3000/api/pages/3/',
        html_url: null,
      },
      title: 'UKHSA Dashboard Root',
    },
  },
  seo_change_frequency: 5,
  seo_priority: 0.7,
  last_updated_at: '2024-07-02T12:44:54.461914+01:00',
  title: 'About',
  body: '<h2 data-block-key="rl84p">About the UKHSA data dashboard</h2><p data-block-key="agj81">The UKHSA data dashboard provides presents a wide range of public health data in an easily accessible format. It’s produced by the UK Health Security Agency. At the moment, the dashboard is focused on respiratory viruses.</p><p data-block-key="1a6r6"><br/>The UKHSA data dashboard builds on the success of the coronavirus (COVID-19) dashboard. The coronavirus dashboard was created in response to the coronavirus pandemic, to provide the UK with a trusted source of data relating to coronavirus. During the pandemic, data was a powerful tool in understanding how the pandemic was progressing, through understanding case numbers, the impact cases had on hospitals and the number of deaths, and the progress of vaccination programmes.</p><p data-block-key="eipee"><br/>The UK has now moved to a state of <a href="https://www.gov.uk/government/publications/covid-19-response-living-with-covid-19">Living with COVID-19</a>. We know interest in coronavirus data is still relevant within the UK, but demand and usage has changed over time.<br/></p><p data-block-key="bnp93">The UKHSA is committed to informing the public of current health data in an accessible and transparent way. Initially, the UKHSA data dashboard is focused on data on coronavirus and other respiratory viruses. In the future, the dashboard will grow to present a wide range of data on health topics including other infectious diseases, chemical, biological, radiological and nuclear incidents and other health threats.</p><p data-block-key="58u2p"></p><h2 data-block-key="62qnf">Using the dashboard</h2><p data-block-key="8i91o">The UKHSA data dashboard is for anyone interested in UK health data.</p><p data-block-key="el6cq">Each page provides a summary of data available for a public health threat. The publicly available dashboard can be used to:</p><ul><li data-block-key="25c46">get an overall summary of a public health threat</li><li data-block-key="3smu1">see trends and patterns in health data</li><li data-block-key="b1b3g">find out information on a specific data metric related to a public health threat</li><li data-block-key="3kfaa">reuse and download data in an API.</li></ul><p data-block-key="a522a"></p><h2 data-block-key="5rpmb">Respiratory viruses</h2><p data-block-key="7u5j">Respiratory viruses can infect any age group. Some people (including children and the elderly) are more likely to become seriously ill or have other complications because of respiratory viruses. In the UK many of these viruses are seasonal and tend to circulate at higher levels during the winter months.</p><p data-block-key="csve3">The respiratory viruses the dashboard reports on are:</p><ul><li data-block-key="e4uhv">Coronavirus or COVID-19 (SARS-CoV-2)</li><li data-block-key="84hf">Influenza</li><li data-block-key="2r4ih">Respiratory syncytial virus (RSV)</li><li data-block-key="8hsti">Adenovirus</li><li data-block-key="5crgl">Parainfluenza</li><li data-block-key="20lc6">Rhinovirus</li><li data-block-key="8famd">Human parainfluenza viruses (hMPV)</li></ul><p data-block-key="4nqs8"></p><h2 data-block-key="1a1bl">Metrics</h2><p data-block-key="2voh4">The UKHSA data dashboard reports on different data (metrics) for each virus. This is because not all metrics are available for each virus. See more in data availability.</p><p data-block-key="81k9m"></p><h3 data-block-key="dpft2">Testing</h3><p data-block-key="e9ju2">Testing data shows the number of tests taken for a virus. We report on testing data for a number of respiratory viruses. Testing positivity shows the proportion (percentage) of tests taken that were positive. Not all healthcare settings report their testing data. This means the healthcare settings that do report their data are representative of others.<br/><br/> For a number of respiratory viruses, testing only happens in healthcare settings, like GP surgeries or hospitals. This means that someone could have a respiratory virus but not seek medical treatment, and therefore not be tested for it.<br/><br/> You can read more about testing data metrics in our metrics documentation.</p><p data-block-key="se5d"></p><h3 data-block-key="egj9o">Cases</h3><p data-block-key="6p0tt">A case is when someone is confirmed as having an illness through a positive test. We report on the case numbers for:</p><ul><li data-block-key="129mm">Coronavirus (COVID-19)</li><li data-block-key="4dq8s">Influenza<br/></li></ul><p data-block-key="9bq14">The data available on positive tests is only those which have been reported by healthcare providers (like GP surgeries and hospitals). It’s important when looking at case data to take this into consideration as it means not all cases will be shown. For example, someone who becomes ill with the flu but doesn’t seek medical treatment would not be counted as a case.</p><p data-block-key="4ivsb">You can read more about cases data metrics in our metrics documentation.</p><p data-block-key="3k9rv"></p><h3 data-block-key="f3sn5">Healthcare</h3><p data-block-key="ahg0q">We report on the number of patients admitted to hospital with a type of virus. The hospitalisations data we report on is:</p><ul><li data-block-key="8t8d5">Respiratory emergency care admissions</li><li data-block-key="ehblm">Influenza hospitalisations</li><li data-block-key="bm9i0">RSV hospitalisations</li><li data-block-key="fauvu">COVID-19 hospitalisations</li></ul><p data-block-key="6ihr2">You can read more about healthcare data metrics in our metrics documentation.</p><p data-block-key="8tca8"></p><h3 data-block-key="7qvnf">Vaccines</h3><p data-block-key="avu3k">We report on the number of vaccines given for:</p><ul><li data-block-key="b98u3">COVID-19</li><li data-block-key="7fujn">Influenza</li></ul><p data-block-key="fbb4o">People offered a vaccine is different for each virus, depending on target groups recommended by healthcare professionals.</p><p data-block-key="5cd43">You can read more about vaccine data metrics in our metrics documentation.</p><p data-block-key="37fvq"></p><h3 data-block-key="bhoef">Deaths</h3><p data-block-key="e0hf0">We report on deaths from COVID-19. This is when a reported death has COVID-19 on the death certificate, meaning a doctor or physician has decided that COVID-19 was a cause of death.</p><p data-block-key="1kuud">We also report on the excess deaths caused by respiratory viruses.</p><p data-block-key="ambrk">You can read more about deaths data metrics in our metrics documentation.</p><p data-block-key="c4i1f"></p><h2 data-block-key="6aejv">Data availability</h2><p data-block-key="a41tl">Data for the UKHSA data dashboard is updated in-line with the data source. It will be clearly signposted on each page the frequency of the upload and when the data was last updated.<br/><br/>Different data is available for each virus. This could be because healthcare settings don’t report data for certain metrics for viruses, or because the data isn’t available. For example, we only report on vaccination data for coronavirus and influenza because they are the only 2 viruses with vaccine programmes.<br/><br/>Different data is shown for different geographical areas. The availability of data for different areas varies between metrics. Some metrics are not available for the whole UK because we do not have data from all nations, and so will only be shown when the area they are available for (for example, England) is selected. Healthcare data for the UK is updated to the latest date that we have data for all nations. More recent data may be available if an individual nation is selected.</p><p data-block-key="dda7a"></p><h2 data-block-key="enks3">Data sources</h2><p data-block-key="a8ilf">The data on the UKHSA data dashboard is from a number of sources.</p><p data-block-key="b3upo"><br/>The Respiratory Datamart system began during the 2009 influenza (flu) pandemic to collate all laboratory testing information in England. We use this system to monitor all major respiratory viruses in England and is referred to as a sentinel laboratory surveillance tool. This season (2022/23), 16 laboratories in England will be reporting data. The data provided by the laboratories gives us an estimate (as a percentage %) of the amount of people in England who have a respiratory disease - this is called positivity. Positivity percentages give us an idea of the prevalence and spread of respiratory diseases across England, without using mass testing.</p><p data-block-key="le0d"><br/>The COVID-19 Second Generation Surveillance System (SGSS) reports on testing data for COVID-19 in England. It shows positive test results from Pillar 1 (swab testing in PHE and NHS hospital labs), and Pillar 2 (swab testing for the wider population).</p><p data-block-key="2s7fs"><br/>The Office of National Statistics (ONS) weekly mortality report counts the number of deaths registered in England and Wales by age, sex and region. It has specific data available for deaths involving coronavirus (COVID-19).</p>',
  last_published_at: '2023-05-12T14:40:33.168212+01:00',
  related_links: relatedLinksMock,
  related_links_layout: 'Footer',
}
