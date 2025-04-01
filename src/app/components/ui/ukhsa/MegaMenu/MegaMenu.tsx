import clsx from 'clsx'
import Link from 'next/link'

import { getMenu } from '@/api/requests/menus/getMenu'
import { transformMenuSnippetToMegaMenu } from '@/api/requests/menus/helpers'
import { RichText } from '@/app/components/cms'
import UserSignOut from '@/app/components/ui/ukhsa/UserSignOut/UserSignOut'
import { isWellKnownEnvironment } from '@/app/utils/app.utils'
import { authEnabled } from '@/config/constants'

interface MegaMenuProps {
  className?: string
}

/**
 * This is an MVP implementation of the GOV.UK menu system that is hooked up to our CMS menu snippet system.
 *
 * Currently it is configured to only display responsive columns in a 1/3 grid system.
 * TODO: Expand this to be more dynamic according to how we receive content from the CMS.
 */
export async function MegaMenu({ className = 'govuk-!-padding-top-2' }: MegaMenuProps) {
  const menu = await getMenu()

  const activeMenu = transformMenuSnippetToMegaMenu(menu)

  const switchBoardLink = {
    slug: '/switchboard',
    title: 'Switchboard',
    description: 'Front-end environment settings',
  }

  return (
    <div>
      {authEnabled ? (
        <div className="govuk-width-container">
          <div className="flex justify-end">
            <UserSignOut />
          </div>
        </div>
      ) : null}
      <div className={clsx(className)}>
        {activeMenu.map((columns, rowIndex) => {
          return (
            <div key={rowIndex} data-testid={`mega-menu-row-${rowIndex}`} className="govuk-grid-row">
              {columns.map((column, columnIndex) => {
                const isLastColumn = columnIndex === columns.length - 1
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
                    <ul className="govuk-list govuk-!-padding-bottom-5 flex flex-col gap-4 border-b border-grey-2 md:border-none md:pb-0">
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
                                  <p className="govuk-body-s govuk-!-margin-top-1 govuk-!-margin-bottom-0">
                                    {children}
                                  </p>
                                ),
                              }}
                            >
                              {link.description}
                            </RichText>
                          ) : null}
                        </li>
                      ))}
                      {/* Hardcoded switchboard link */}
                      {isLastColumn && !isWellKnownEnvironment() && (
                        <>
                          <li
                            key={switchBoardLink.slug}
                            className="govuk-!-padding-right-5 govuk-body-s govuk-!-padding-top-5 relative border-t border-grey-2 md:w-4/6"
                          >
                            <Link
                              href={switchBoardLink.slug}
                              className={`font-bold after:absolute after:inset-0 after:bg-none after:content-[""]`}
                            >
                              {switchBoardLink.title}
                            </Link>
                            <p className="govuk-body-s govuk-!-margin-top-1 govuk-!-margin-bottom-0">
                              {switchBoardLink.description}
                            </p>
                          </li>
                        </>
                      )}
                    </ul>
                  </div>
                )
              })}
            </div>
          )
        })}
      </div>
    </div>
  )
}
