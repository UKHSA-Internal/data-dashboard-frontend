import { ContextualUrl } from '@/api/models/cms/Page/Body'

interface AboutProps {
  description: string
  contextualUrls?: ContextualUrl
}

const displayLinks = (contextualUrls: ContextualUrl) => {
  if (contextualUrls) {
    return contextualUrls.map((option, index) => (
      <a key={`about-link-${index}`} href={option.value.url} target="_blank">
        <li className="govuk-link">{option.value.url_display_text}</li>
      </a>
    ))
  }
}

const About = ({ description, contextualUrls }: AboutProps) => {
  return (
    <div>
      <p className="govuk-!-margin-bottom-2 pt-0">{description}</p>
      {contextualUrls ? (
        <div>
          <h2 className="default-govuk-header mb-2 font-bold">Related Links:</h2>
          <ul>{displayLinks(contextualUrls)}</ul>
        </div>
      ) : null}
    </div>
  )
}

export default About
