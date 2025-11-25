'use client'
import { kebabCase } from 'lodash'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import { Suspense } from 'react'

import { About } from '@/app/components/cms/About/About'
import DropdownTab from '@/app/components/ui/ukhsa/Tabs/DropdownTab'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/app/components/ui/ukhsa/Tabs/Tabs'

const MapCard = dynamic(() => import('./MapCard'), { ssr: false })

export function MapCardTabWrapper({ id, about }: { id: string; about: string | null }) {
  const title = `filter-linked-map-${id}`

  if (about) {
    return (
      <Tabs defaultValue={`${kebabCase(title)}-map`} className="govuk-!-margin-bottom-0">
        <TabsList className="hidden no-js:block sm:block">
          <TabsTrigger asChild value={`${kebabCase(title)}-map`} aria-controls={`${kebabCase(title)}-content`}>
            <Link href={`#map-${kebabCase(title)}`}>
              <span>Map</span>
            </Link>
          </TabsTrigger>
          {about && (
            <TabsTrigger
              asChild
              value={`${kebabCase(title)}-about`}
              aria-controls={`about-${kebabCase(title)}-content`}
            >
              <Link href={`#about-${kebabCase(title)}`}>
                <span>About</span>
              </Link>
            </TabsTrigger>
          )}
        </TabsList>
        <DropdownTab
          className="govuk-select relative mb-[-1px] block min-w-[7em] rounded-none border border-b-0 border-mid-grey py-0 pl-2 no-js:hidden sm:hidden"
          tabGroupTitle={kebabCase(title)}
          defaultValue={`${kebabCase(title)}-map`}
          showMap={true}
          showChart={false}
          showTable={false}
          showAbout={about ? true : false}
          showDownload={false}
        />
        <TabsContent
          value={`${kebabCase(title)}-map`}
          className="min-h-[var(--ukhsa-chart-card-tab-min-height)] no-js:mb-7"
          data-type="chart"
          id={`map-${kebabCase(title)}`}
        >
          <Suspense fallback={null}>
            <MapCard />
          </Suspense>
        </TabsContent>
        {about && (
          <TabsContent
            value={`${kebabCase(title)}-about`}
            className="min-h-[var(--ukhsa-chart-card-tab-min-height)]"
            id={`about-${kebabCase(title)}-content`}
          >
            <span className="govuk-heading-m govuk-!-margin-top-3 js:hidden" id={`about-${kebabCase(title)}`}>
              About
            </span>
            <About content={about} />
          </TabsContent>
        )}
      </Tabs>
    )
  }
  return (
    <Suspense fallback={null}>
      <MapCard />
    </Suspense>
  )
}
