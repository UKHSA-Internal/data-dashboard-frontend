import kebabCase from 'lodash/kebabCase'
import { Children, cloneElement, isValidElement, ReactElement, ReactNode } from 'react'

import { Contents, ContentsLink } from '../Contents/Contents'

interface PageSectionWithContentsProps {
  children: ReactNode
}

interface PageSectionProps {
  children: ReactNode
  heading: string
  id?: string
}

export const PageSectionWithContents = ({ children }: PageSectionWithContentsProps) => {
  return (
    <>
      <Contents className="govuk-!-margin-bottom-5">
        {Children.map(children, (child: ReactNode) => {
          if (!isValidElement(child)) return null

          const childProps = child.props as PageSectionProps

          return <ContentsLink href={`#${kebabCase(childProps.heading)}`}>{childProps.heading}</ContentsLink>
        })}
      </Contents>
      {Children.map(children, (child: ReactNode) => {
        if (!isValidElement(child)) return null

        return cloneElement(child as ReactElement<PageSectionProps>)
      })}
    </>
  )
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
