import Link from 'next/link'

/**
 * Browse Card
 */
export interface BrowseCardProps {
  href: string
  name: string
  description: string
}

export const BrowseCard = ({ href, name, description }: BrowseCardProps) => {
  return (
    <div className="govuk-!-margin-bottom-3 govuk-!-margin-top-5">
      <hr className="govuk-section-break govuk-section-break--visible mb-3" />
      <Link href={href} className="govuk-link--no-visited-state govuk-heading-s govuk-!-margin-bottom-2">
        {name}
      </Link>
      <p className="govuk-body">{description}</p>
    </div>
  )
}
