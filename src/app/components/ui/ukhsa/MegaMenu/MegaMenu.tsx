import clsx from 'clsx'
import Link from 'next/link'

import { getMenu } from '@/api/requests/menus/getMenu'
import { transformMenuSnippetToMegaMenu } from '@/api/requests/menus/helpers'
import { RichText } from '@/app/components/cms'

interface MegaMenuProps {
  className?: string
}

/**
 * This is an MVP implementation of the GOV.UK menu system that is hooked up to our CMS menu snippet system.
 *
 * Currently it is configured to only display responsive columns in a 1/3 grid system.
 * TODO: Expand this to be more dynamic according to how we receive content from the CMS.
 */
export async function MegaMenu({ className = 'govuk-!-padding-top-7' }: MegaMenuProps) {
  const menu = await getMenu()

  const activeMenu = transformMenuSnippetToMegaMenu(menu)

  return (
    <div className={clsx(className)}>
      {activeMenu.map((columns, rowIndex) => {
        return (
          <div key={rowIndex} data-testid={`mega-menu-row-${rowIndex}`} className="govuk-grid-row">
            {columns.map((column, columnIndex) => {
              return (
                <div
                  key={columnIndex}
                  data-testid={`mega-menu-row-${rowIndex}-column-${columnIndex}`}
                  className="govuk-grid-column-one-third-from-desktop [&:not(:first-child)]:mt-6 [&:not(:first-child)]:md:mt-0"
                >
                  {column.heading ? (
                    <h3 className="govuk-heading-m">{column.heading}</h3>
                  ) : (
                    <span
                      className={clsx('govuk-heading-m', {
                        'hidden md:block': column.heading === '',
                      })}
                    >
                      &nbsp;
                    </span>
                  )}
                  <ul className="govuk-list flex flex-col gap-4 border-b border-grey-2 pb-2 md:border-none">
                    {column.links.map((link) => (
                      <li key={link.slug} className="govuk-!-padding-right-5 govuk-body-s relative">
                        <Link
                          href={link.slug}
                          className={`font-bold after:absolute after:inset-0 after:bg-none after:content-[""]`}
                        >
                          {link.title}
                        </Link>
                        {link.description ? (
                          <RichText
                            components={{
                              p: ({ children }) => (
                                <p className="govuk-body-s govuk-!-margin-top-1 govuk-!-margin-bottom-0">{children}</p>
                              ),
                            }}
                          >
                            {link.description}
                          </RichText>
                        ) : null}
                      </li>
                    ))}
                  </ul>
                </div>
              )
            })}
          </div>
        )
      })}
    </div>
  )
}
