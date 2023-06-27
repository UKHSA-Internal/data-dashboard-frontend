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
  heading?: string
}

const Navigation = ({ children, heading = 'Contents' }: NavigationProps) => {
  return (
    <Styled.Nav role="navigation" aria-label="Contents">
      <Styled.NavHeading>{heading}</Styled.NavHeading>
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
      {cloneElement(child, {
        ...child.props,
        heading: child.props.heading,
      })}
    </>
  ) : null
}

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
      <Navigation heading={heading}>
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
    <Styled.Section id={id} aria-labelledby={getIdFromHeading(heading)}>
      <SectionHeading id={getIdFromHeading(heading)}>{heading}</SectionHeading>
      {children}
    </Styled.Section>
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
