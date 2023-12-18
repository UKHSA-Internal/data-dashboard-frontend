export default function NoResults() {
  return (
    <div>
      <p className="govuk-body govuk-!-font-weight-bold">There are no matching results</p>
      <p className="govuk-body">Improve your search results by:</p>
      <ul className="govuk-list govuk-list--bullet">
        <li>removing filters</li>
        <li>double-checking your spelling</li>
        <li>using fewer keywords</li>
        <li>searching for something less specific</li>
      </ul>
    </div>
  )
}
