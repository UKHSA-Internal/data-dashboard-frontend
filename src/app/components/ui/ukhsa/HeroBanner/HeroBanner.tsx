import Link from 'next/link'

const HeroBanner = () => {
  return (
    <div className="bg-blue">
      <div className="govuk-width-container govuk-!-padding-bottom-8  bg-blue ">
        <h1 className="govuk-heading-xl govuk-!-padding-top-7 govuk-!-margin-bottom-4 text-white">
          UKHSA data dashboard
        </h1>
        <h2 className="govuk-heading-xl govuk-!-margin-bottom-3 text-offwhite">
          Showing public health data across England
        </h2>
        <Link className="govuk-body-s text-grey-4 focus:text-black" href="/about">
          What is the UKHSA data dashboard?
        </Link>
      </div>
    </div>
  )
}

export default HeroBanner
