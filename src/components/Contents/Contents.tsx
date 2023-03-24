import { Link, OrderedList } from 'govuk-react'
import { Children, cloneElement, isValidElement, ReactNode } from 'react'
import * as Styled from './Contents.styles'

export const getIdFromHeading = (heading: string) => heading.toLowerCase().replaceAll(' ', '-')

/**
 * Navigation
 * Wrapper component for the links that allow the user to jump to particular sections
 */
interface NavigationProps {
  children: ReactNode
}

const Navigation = ({ children }: NavigationProps) => {
  return (
    <Styled.Nav role="navigation">
      <Styled.NavHeading>Contents</Styled.NavHeading>
      {children}
    </Styled.Nav>
  )
}

/**
 * SectionHeading
 * Renders a linkable heading for each contents section
 */
interface SectionHeadingProps {
  children: ReactNode
  id: string
}

export const SectionHeading = ({ id, children }: SectionHeadingProps) => {
  return (
    <Styled.SetionHeadingLink href={`#${id}`} id={id}>
      <Styled.SectionHeading>{children}</Styled.SectionHeading>
    </Styled.SetionHeadingLink>
  )
}

/**
 * Renders an individual link within the <Nav>
 */
const renderNavigationLink = (child: ReactNode) => {
  return isValidElement(child) ? (
    <Styled.ListItem>
      <Link href={`#${getIdFromHeading(child.props.heading)}`}>{child.props.heading}</Link>
    </Styled.ListItem>
  ) : null
}

/**
 * Renders a contents heading and it's corresponding children
 */
const renderContentsSection = (child: ReactNode) => {
  return isValidElement(child) ? (
    <>
      <SectionHeading id={getIdFromHeading(child.props.heading)}>{child.props.heading}</SectionHeading>
      {cloneElement(child, {
        ...child.props,
        heading: child.props.heading,
      })}
    </>
  ) : null
}

/**
 * Contents
 * Renders a navigation list and related linkable sections
 */
interface ContentsProps {
  children: ReactNode
}

export const Contents = ({ children }: ContentsProps) => {
  return (
    <>
      <Navigation>
        <OrderedList>{Children.map(children, renderNavigationLink)}</OrderedList>
      </Navigation>
      {Children.map(children, renderContentsSection)}
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
    <Styled.Article id={id} aria-label={heading}>
      {children}
    </Styled.Article>
  )
}

/**
 * Export our granular components as compound components for usage in other areas
 * For example, In the html->react mappings from the CMS
 */
Contents.Nav = Navigation
Contents.NavHeading = Styled.NavHeading
Contents.NavList = OrderedList
Contents.NavListItem = Styled.ListItem
Contents.SectionHeading = SectionHeading
