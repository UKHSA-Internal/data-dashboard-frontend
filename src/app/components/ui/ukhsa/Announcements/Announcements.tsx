import clsx from 'clsx'
import { Fragment, Key } from 'react'

import { Announcement } from '../Announcement/Announcement'
import { BannerVariant } from '../GlobalBanner/GlobalBanner'

interface AnnouncementItem {
  id: Key | null | undefined
  banner_type: BannerVariant
  title: string
  body: string
}

interface AnnouncementsProps {
  announcements?: AnnouncementItem[] | undefined
  className?: string
}

export const Announcements = ({ announcements, className }: AnnouncementsProps) => {
  const hasAnnouncements = announcements && announcements.length > 0

  if (!hasAnnouncements) {
    return null
  }

  return (
    <>
      {announcements.map((announcement) => {
        return (
          <Announcement
            key={announcement.id}
            variant={announcement.banner_type}
            heading={announcement.title}
            className={clsx('govuk-!-margin-bottom-4', className)}
          >
            {announcement.body}
          </Announcement>
        )
      })}
    </>
  )
}
