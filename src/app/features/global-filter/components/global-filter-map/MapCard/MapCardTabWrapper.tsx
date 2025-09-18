import { kebabCase } from 'lodash'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import { Suspense } from 'react'

import About from '@/app/components/cms/About/About'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/app/components/ui/ukhsa/Tabs/Tabs'

const MapCard = dynamic(() => import('./MapCard'), { ssr: false })

export async function MapCardTabWrapper({ id, about }: { id: string; about: string | null }) {
  const title = `filter-linked-map-${id}`

  console.log('about param value: ', about)
  if (about) {
    return (
      <Tabs defaultValue={`${kebabCase(title)}`} className="govuk-!-margin-bottom-0">
        <TabsList className="hidden no-js:block sm:block">
          <TabsTrigger asChild value={`${kebabCase(title)}`} aria-controls={`${kebabCase(title)}-content`}>
            <Link href={`#map-${kebabCase(title)}`}>
              <span>Chart</span>
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
        <TabsContent
          value={`${kebabCase(title)}`}
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
