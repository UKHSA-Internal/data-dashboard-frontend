import { Link, OrderedList } from 'govuk-react'
import { Children, cloneElement, isValidElement, ReactNode } from 'react'
import {
  NavHeading,
  SectionHeading,
  SetionHeadingLink,
  ListItem,
  Nav,
} from './Contents.styles'

interface ContentsProps {
  children: ReactNode
  label: string
}

const getIdFromHeading = (heading: string) =>
  heading.toLowerCase().replace(' ', '-')

export const Contents = ({ children, label }: ContentsProps) => {
  return (
    <>
      <NavHeading>Contents</NavHeading>
      <Nav role="navigation" aria-label={label}>
        <OrderedList>
          {Children.map(children, (child) => {
            return isValidElement(child) ? (
              <ListItem>
                <Link href={`#${getIdFromHeading(child.props.heading)}`}>
                  {child.props.heading}
                </Link>
              </ListItem>
            ) : null
          })}
        </OrderedList>
      </Nav>

      {Children.map(children, (child) => {
        return isValidElement(child) ? (
          <>
            <SetionHeadingLink
              href={`#${getIdFromHeading(child.props.heading)}`}
              id={getIdFromHeading(child.props.heading)}
            >
              <SectionHeading>{child.props.heading}</SectionHeading>
            </SetionHeadingLink>
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

interface ContentsItemProps {
  children: ReactNode
  heading: string
  id?: string
}

export const ContentsItem = ({ children, id, heading }: ContentsItemProps) => {
  return (
    <article id={id} aria-label={heading}>
      {children}
    </article>
  )
}
