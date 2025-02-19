import { ChartRelatedLink } from '@/api/models/cms/Page/Body'

interface AboutProps {
  description: string
  contextualUrls?: ChartRelatedLink
}

const displayLinks = (contextualUrls: ChartRelatedLink) => {
  if (contextualUrls) {
    return contextualUrls.map((option, index) => (
      <a key={`about-link-${index}`} href={option.value.link} target="_blank">
        <li className="govuk-link">{option.value.link_display_text}</li>
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
