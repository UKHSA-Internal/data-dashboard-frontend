import { getPathname } from '../hooks/getPathname'

const createURL = (paramSections: string[], heading: string): string => {
  let query = getPathname() + '?'
  paramSections.map((section, index) => {
    if (index > 0) {
      query = query + `&section=${section}`
    } else {
      query = query + `section=${section}`
    }
  })

  const fullQuery = query + `#${heading}`

  return fullQuery
}

export const getShowMoreURL = (showMoreSections: string[], heading: string) => {
  const paramSections: string[] = showMoreSections.slice()

  paramSections.push(heading)

  return createURL(paramSections, heading)
}

export const getShowLessURL = (showMoreSections: string[], heading: string) => {
  const paramSections: string[] = showMoreSections.slice()

  const sectionIndex = paramSections.indexOf(heading)
  paramSections.splice(sectionIndex, 1)

  return createURL(paramSections, heading)
}
