import clsx from 'clsx'

import { ChartRowCardHeader, MapCardWrapper, MapRowCard } from '@/app/components/cms'

type FilterLinkedMapProps = {
  id: string
  value: {
    title_prefix?: string
  }
}

export function FilterLinkedMap({ id, value }: FilterLinkedMapProps) {
  return (
    <MapRowCard>
      <div key={id} className={clsx('mb-3 sm:mb-6 lg:mb-0', 'lg:w-full')}>
        <article className={'ukhsa-map-card'}>
          <ChartRowCardHeader id={`map-row-heading-${id}`} title={value.title_prefix ? value.title_prefix : ''} />
          <MapCardWrapper />
        </article>
      </div>
    </MapRowCard>
  )
}
