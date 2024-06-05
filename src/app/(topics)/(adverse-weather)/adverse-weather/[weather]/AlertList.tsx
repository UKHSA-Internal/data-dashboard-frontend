'use client'

import { redirect } from 'next/navigation'

import { HealthAlertTypes } from '@/api/models/Alerts'
import { List } from '@/app/components/ui/ukhsa/List/List'
import { ListItem } from '@/app/components/ui/ukhsa/List/ListItem'
import {
  ListItemStatus,
  ListItemStatusContent,
  ListItemStatusIcon,
  ListItemStatusLink,
  ListItemStatusTag,
  ListItemStatusTimestamp,
} from '@/app/components/ui/ukhsa/List/ListItemStatus'
import useWeatherHealthAlertList from '@/app/hooks/queries/useWeatherHealthAlertList'
import { useTranslation } from '@/app/i18n/client'
import { toSlug } from '@/app/utils/app.utils'
import { logger } from '@/lib/logger'

interface AlertListProps {
  type: HealthAlertTypes
}

export default function AlertList({ type }: AlertListProps) {
  const { t } = useTranslation('adverseWeather')

  const healthAlerts = useWeatherHealthAlertList({ type })

  if (healthAlerts.error || !healthAlerts.data) {
    logger.error(healthAlerts.error)
    return redirect('/error')
  }

  return (
    <List>
      {healthAlerts.data.map(({ status, geography_name: name, refresh_date: lastUpdated }) => (
        <ListItem key={name} spacing="s">
          <ListItemStatus>
            <ListItemStatusIcon level={status} type={type} />
            <ListItemStatusContent>
              <ListItemStatusLink href={`/adverse-weather/${type}-health-alerts/${toSlug(name)}`}>
                {name}
              </ListItemStatusLink>
              <ListItemStatusTimestamp>
                {lastUpdated ? t('updated', { value: new Date(lastUpdated) }) : '-'}
              </ListItemStatusTimestamp>
            </ListItemStatusContent>

            <ListItemStatusTag level={status} type={type} region={name} />
          </ListItemStatus>
        </ListItem>
      ))}
    </List>
  )
}
