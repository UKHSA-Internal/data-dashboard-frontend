import Link from 'next/link'

import { getMenu } from '@/api/requests/menus/getMenu'

export const Menu = async () => {
  const menu = await getMenu()
  return (
    <div className="govuk-!-padding-top-2">
      {menu?.data?.active_menu?.map(({ value: { html_url, title } }) => {
        return (
          <Link
            key={`link_${html_url}`}
            href={html_url}
            className={`font-bold after:absolute after:inset-0 after:bg-none after:content-[""]`}
          >
            {title}
          </Link>
        )
      })}
    </div>
  )
}
