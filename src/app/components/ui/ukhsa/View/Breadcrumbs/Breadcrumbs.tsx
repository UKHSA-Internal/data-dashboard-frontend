import Link from 'next/link'

interface BreadcrumbsProp {
  breadcrumbs: Array<{ name: string; link: string }>
}

export const Breadcrumbs = async ({ breadcrumbs }: BreadcrumbsProp) => {
  return (
    <div className="govuk-breadcrumbs govuk-!-margin-top-2">
      <ol className="govuk-breadcrumbs__list" aria-label="breadcrumbs">
        {breadcrumbs.map(({ name, link }, key) => (
          <li key={key} className="govuk-breadcrumbs__list-item">
            <Link className="govuk-breadcrumbs__link" href={link}>
              {name}
            </Link>
          </li>
        ))}
      </ol>
    </div>
  )
}
