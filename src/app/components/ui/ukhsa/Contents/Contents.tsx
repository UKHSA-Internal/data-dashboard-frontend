import kebabCase from 'lodash/kebabCase'
import { Children, cloneElement, isValidElement, ReactNode } from 'react'

/**
 * Contents
 * Automatically renders a navigation list and related linkable sections in a composable style
 * <Contents>
 *    <ContentsItem>1st section</ContentsItem>
 *    <ContentsItem>2nd section</ContentsItem>
 * </Contents>
 */
interface ContentsProps {
  children: ReactNode
  heading?: string
}

export const Contents = ({ children, heading = 'Contents' }: ContentsProps) => {
  return (
    <>
      <nav className="govuk-!-margin-bottom-5" aria-label="Contents">
        <h2 className="govuk-heading-s govuk-!-margin-bottom-1 font-normal">{heading}</h2>
        <ol className="govuk-!-margin-bottom-6 govuk-!-margin-left-4">
          {Children.map(children, (child: ReactNode) => {
            return isValidElement(child) ? (
              <li className="govuk-body-m govuk-!-margin-bottom-1 relative">
                <a className="govuk-link--no-visited-state govuk-dash" href={`#${kebabCase(child.props.heading)}`}>
                  {child.props.heading}
                </a>
              </li>
            ) : null
          })}
        </ol>
      </nav>
      {Children.map(children, (child: ReactNode) => {
        return isValidElement(child) ? (
          <>
            {cloneElement(child, {
              ...child.props,
              heading: child.props.heading,
            })}
          </>
        ) : null
      })}
    </>
  )
}

/**
 * ContentsItem
 * Renders the individual contents section
 */
interface ContentsItemProps {
  children: ReactNode
  heading: string
  id?: string
}

export const ContentsItem = ({ children, id, heading }: ContentsItemProps) => {
  return (
    <section id={id} className="govuk-!-margin-bottom-9" aria-labelledby={kebabCase(heading)}>
      <a
        href={`#${kebabCase(heading)}`}
        id={kebabCase(heading)}
        className="govuk-heading-l govuk-!-margin-bottom-3 govuk-link--no-visited-state inline-block"
      >
        <h2 className="mb-0 text-inherit">{heading}</h2>
      </a>
      {children}
    </section>
  )
}
