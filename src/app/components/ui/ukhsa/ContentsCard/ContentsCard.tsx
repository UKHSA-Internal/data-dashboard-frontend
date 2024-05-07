import Link from 'next/link'

interface ContentsCardProps {
  title: string
  body: string
  url: string
}

export const ContentsCard = ({ title, body, url }: ContentsCardProps) => {
  return (
    <>
      <h2 className="govuk-heading-m">
        <Link className="govuk-link govuk-link--no-visited-state" href={url}>
          {title}
        </Link>
      </h2>
      <p className="govuk-body-m">{body}</p>
      <hr className="govuk-section-break govuk-section-break--l govuk-section-break--visible" />
    </>
  )
}
