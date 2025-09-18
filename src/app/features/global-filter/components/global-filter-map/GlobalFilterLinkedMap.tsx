import clsx from 'clsx'
import { z } from 'zod'

import { CardTypes } from '@/api/models/cms/Page'
import { ChartRowCard, ChartRowCardHeader } from '@/app/components/cms'

import { MapCardTabWrapper } from './MapCard/MapCardTabWrapper'

export function GlobalFilterLinkedMap({ type, value, id }: z.infer<typeof CardTypes>) {
  console.log('CMS type: ', type)
  console.log('CMS value: ', value)
  console.log('CMS id: ', id)

  if (type === 'filter_linked_map') {
    return (
      <ChartRowCard>
        <div key={id} className={clsx('mb-3 sm:mb-6 lg:mb-0', 'lg:w-full')}>
          <article className={'ukhsa-map-card'}>
            <ChartRowCardHeader id={`map-row-heading-${id}`} title={value.title_prefix ? value.title_prefix : ''} />
            <MapCardTabWrapper id={id} about={value.about ?? null} />
          </article>
        </div>
      </ChartRowCard>
    )
  }
}
