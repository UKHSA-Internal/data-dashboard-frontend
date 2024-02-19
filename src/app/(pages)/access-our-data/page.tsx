import { Metadata } from 'next'

import { PageType } from '@/api/requests/cms/getPages'
import { getPageBySlug } from '@/api/requests/getPageBySlug'
import { CodeBlock, RichText } from '@/app/components/cms'
import { RelatedLink, RelatedLinks, View } from '@/app/components/ui/ukhsa'

export async function generateMetadata(): Promise<Metadata> {
  const {
    meta: { seo_title, search_description },
  } = await getPageBySlug('access-our-data', PageType.Composite)

  return {
    title: seo_title,
    description: search_description,
  }
}

export default async function AccessOurData() {
  const { title, body, related_links: relatedLinks } = await getPageBySlug('access-our-data', PageType.Composite)

  return (
    <View heading={title}>
      <div className="govuk-grid-row">
        <div className="govuk-grid-column-three-quarters-from-desktop">
          {body.map(({ type, value, id }) => {
            if (type === 'text') {
              return <RichText key={id}>{value}</RichText>
            }
            if (type === 'code_block') {
              return (
                <CodeBlock key={id} language={value.content[0].value.language}>
                  {value.content[0].value.code}
                </CodeBlock>
              )
            }
          })}

          <CodeBlock language="html">
            {`<label class='form-label' for='ni-number'>
    National insurance number
  <span class='form-hint'>hello</span>
</label>`}
          </CodeBlock>

          <CodeBlock language="css">
            {`code[class*='language-'],
pre[class*='language-'] {
  color: var(--colour-code-text);
  text-shadow: 0 1px var(--colour-white);
  font-family: Consolas, Monaco, 'Andale Mono', 'Ubuntu Mono', monospace;
  direction: ltr;
  text-align: left;
  tab-size: 4;
  hyphens: none;
  word-spacing: normal;
  word-break: normal;
  // Wrap lines of code rather than overflowing
  white-space: pre-wrap; // css-3
  word-wrap: break-word; // Internet Explorer 5.5+
}`}
          </CodeBlock>
        </div>
      </div>

      <RelatedLinks variant="footer">
        {relatedLinks.map(({ title, body, url, id }) => (
          <RelatedLink key={id} url={url} title={title}>
            {body}
          </RelatedLink>
        ))}
      </RelatedLinks>
    </View>
  )
}
