type RelatedLink = {
  title: string
  description: string
  link: string
}

export type RelatedLinksResponse = RelatedLink[]

export const data: RelatedLinksResponse = [
  {
    title:
      'National flu and COVID-19 surveillance reports: 2022 to 2023 season',
    description:
      'National influenza and COVID-19 report, monitoring COVID-19 activity, seasonal flu and other seasonal respiratory illnesses.',
    link: 'https://www.gov.uk/government/statistics/national-flu-and-covid-19-surveillance-reports-2022-to-2023-season',
  },
  {
    title: 'Respiratory syncytial virus (RSV): guidance, data and analysis',
    description:
      'These documents provide advice on the symptoms, diagnosis, treatment, management and epidemiology of respiratory syncytial virus.',
    link: 'https://www.gov.uk/government/collections/respiratory-syncytial-virus-rsv-guidance-data-and-analysis',
  },
  {
    title:
      'National norovirus and rotavirus report, week 1 report: data up to week 51 (25 December 2022)',
    description:
      'Data reported here provide a summary of norovirus and rotavirus activity (including enteric virus (EV) outbreaks) in England up to reporting week 51 of the 2022/2023 season.',
    link: 'https://www.gov.uk/government/statistics/national-norovirus-and-rotavirus-surveillance-reports-2022-to-2023-season/national-norovirus-and-rotavirus-report-week-1-report-data-up-to-week-51-25-december-2022',
  },
  {
    title: 'Hepatitis (liver inflammation) cases in children – latest updates',
    description:
      'Regular UKHSA updates on the ongoing investigation into higher than usual rates of liver inflammation (hepatitis) in children across the UK.',
    link: 'https://www.gov.uk/government/news/hepatitis-liver-inflammation-cases-in-children-latest-updates',
  },
  {
    title: 'Human parainfluenza viruses: guidance and data',
    description:
      'The symptoms, diagnosis, management and epidemiology of human parainfluenza viruses (HPIVs).',
    link: 'Human parainfluenza viruses: guidance and data',
  },
]
