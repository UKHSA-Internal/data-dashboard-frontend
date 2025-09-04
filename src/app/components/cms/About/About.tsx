'use client'

import { ChartRelatedLink } from '@/api/models/cms/Page/Body'
import { useTranslation } from '@/app/i18n/client'

export interface AboutProps {
  description?: string
  relatedLinks?: ChartRelatedLink
  content?: string
}

const displayLinks = (contextualUrls: ChartRelatedLink) => {
  return (
    contextualUrls &&
    contextualUrls.map((option, index) => (
      <li className="govuk-link" key={`about-link-${index}`}>
        <a href={option.value.link} target="_blank">
          {option.value.link_display_text}
        </a>
      </li>
    ))
  )
}

const About = ({ description, relatedLinks, content }: AboutProps) => {
  const { t } = useTranslation('common')
  return (
    <div>
      {content && <div dangerouslySetInnerHTML={{ __html: content ?? '' }} />}
      {description && <p className="govuk-!-margin-bottom-2 whitespace-pre-wrap pt-0">{description}</p>}
      {relatedLinks && relatedLinks.length > 0 ? (
        <div>
          <h2 className="default-govuk-header mb-2 font-bold">{t('cms.blocks.about.relatedLinks')}</h2>
          <ul>{displayLinks(relatedLinks)}</ul>
        </div>
      ) : null}
    </div>
  )
}

export default About
