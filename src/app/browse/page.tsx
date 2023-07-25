'use Client'

import { BlockNav, NavLink } from '../components/ui/ukhsa/BlockNav.tsx/BlockNav'

export default function Browse() {
  return (
    <div className="w-full">
      <BlockNav>
        <NavLink
          href="/"
          name="Dashboard"
          description="The UKHSA data dashboard is for anyone interested in UK health data. Currently, the dashboard reports data for respiratory viruses."
        />
        <NavLink
          href="/topics/coronavirus"
          name="COVID-19"
          description="The UKHSA data dashboard is for anyone interested in UK health data. Currently, the dashboard reports data for respiratory viruses."
        />
        <NavLink
          href="/topics/influenza"
          name="Influenza"
          description="The UKHSA data dashboard is for anyone interested in UK health data. Currently, the dashboard reports data for respiratory viruses."
        />
        <NavLink
          href="/topics/other-respiratory-viruses"
          name="Other respiratory viruses"
          description="The UKHSA data dashboard is for anyone interested in UK health data. Currently, the dashboard reports data for respiratory viruses."
        />

        <NavLink
          href={`${process.env.PUBLIC_API_URL}/api/public/timeseries`}
          name="API"
          description="Search and download data by using the UKHSA data dashboard’s API."
        />
        <NavLink
          href="/about"
          name="About"
          description="The UKHSA data dashboard presents public health data in the UK. It’s produced by the UK Health Security Agency."
        />
        <NavLink
          href="/whats-new"
          name="What's new"
          description="The UKHSA data dashboard is regularly updated with new data and features. View a timeline of changes."
        />
      </BlockNav>
    </div>
  )
}
