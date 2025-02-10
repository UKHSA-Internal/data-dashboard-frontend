import { ContextualUrl } from '@/api/models/cms/Page/Body'

interface AboutProps {
  description: string
  contextualUrls?: ContextualUrl
}

const About = ({ description, contextualUrls }: AboutProps) => {
  const displayLinks = () => {
    if (contextualUrls) {
      return contextualUrls.map((option, index) => (
        <a key={`about-link-${index}`} href={option.value.url} target="_blank">
          <li>{option.value.url_display_text}</li>
        </a>
      ))
    }
  }

  return (
    <div>
      <p className="govuk-!-margin-bottom-2 pt-0">{description}</p>
      <p>Further information links:</p>
      <ul>{displayLinks()}</ul>
    </div>
  )
}

export default About
