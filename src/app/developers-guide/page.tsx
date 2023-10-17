import { View } from '../components/ui/ukhsa'
import SwaggerDocs from '../components/ui/ukhsa/SwaggerDocs/SwaggerDocs'

export default function DevelopersGuide() {
  return (
    <View heading="Developers Guide" lastUpdated="12 may 2023, 2:40">
      <p className="govuk-body"></p>
      <div className="govuk-tabs">
        <ul className="govuk-tabs__list">
          <li className="govuk-tabs__list-item govuk-tabs__list-item--selected">
            <a href="#developer-guide">Using the API</a>
          </li>
          <li className="govuk-tabs__list-item">
            <a href="#api">API</a>
          </li>
        </ul>
        <div className="govuk-tabs__panel" id="developer-guide">
          Instructions on using the UKHSA data dashboard API
        </div>
        <div className="govuk-tabs__panel" id="api">
          <SwaggerDocs />
        </div>
      </div>
    </View>
  )
}
