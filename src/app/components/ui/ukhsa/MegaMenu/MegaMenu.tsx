import clsx from 'clsx'
import Link from 'next/link'

import { getMenu } from '@/api/requests/menus/getMenu'
import { transformMenuSnippetToMegaMenu } from '@/api/requests/menus/helpers'
import { RichText } from '@/app/components/cms'

interface MegaMenuProps {
  className?: string
}

export async function MegaMenu({ className = 'govuk-!-padding-top-8' }: MegaMenuProps) {
  const menu = await getMenu()

  const activeMenu = transformMenuSnippetToMegaMenu(menu)

  return (
    <div className={clsx(className)}>
      {activeMenu.map((columns, rowIndex) => {
        return (
          <div key={rowIndex} className="govuk-grid-row">
            {columns.map((column, columnIndex) => {
              return (
                <div key={columnIndex} className="govuk-grid-column-one-third-from-desktop">
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
                  <ul className="govuk-list flex flex-col gap-4">
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
