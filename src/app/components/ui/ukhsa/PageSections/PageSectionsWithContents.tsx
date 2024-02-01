import kebabCase from 'lodash/kebabCase'
import { Children, cloneElement, isValidElement, ReactNode } from 'react'

import { ContentsLink } from '../Contents/Contents'

/**
 * PageSectionWithContents
 * Automatically renders a navigation list and related linkable sections in a composable style
 * <PageSectionWithContents>
 *    <PageSection>1st section</PageSection>
 *    <PageSection>2nd section</PageSection>
 * </PageSectionWithContents>
 */
interface PageSectionWithContentsProps {
  children: ReactNode
  heading?: string
}

export const PageSectionWithContents = ({ children, heading = 'Contents' }: PageSectionWithContentsProps) => {
  return (
    <>
      <nav className="govuk-!-margin-bottom-5" aria-label="Contents">
        <h2 className="govuk-heading-s govuk-!-margin-bottom-1 font-normal">{heading}</h2>
        <ol className="govuk-!-margin-bottom-6 govuk-!-margin-left-4">
          {Children.map(children, (child: ReactNode) => {
            return isValidElement(child) ? (
              <ContentsLink href={`#${kebabCase(child.props.heading)}`}>{child.props.heading}</ContentsLink>
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
interface PageSectionProps {
  children: ReactNode
  heading: string
  id?: string
}

export const PageSection = ({ children, id, heading }: PageSectionProps) => {
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
