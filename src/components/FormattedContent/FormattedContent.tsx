import { H1, H2, H3, Link, ListItem, UnorderedList } from 'govuk-react'
import rehypeRaw from 'rehype-raw'
import { Container } from './FormattedContent.styles'

interface FormattedContentProps {
  body: string
}

export const FormattedContent = ({ body }: FormattedContentProps) => {
  return (
    <Container
      rehypePlugins={[rehypeRaw]}
      components={{
        h1: ({ ...props }) => <H1 {...props} />,
        h2: ({ ...props }) => <H2 {...props} />,
        h3: ({ ...props }) => <H3 {...props} />,
        a: ({ ...props }) => <Link {...props} />,
        ul: ({ ...props }) => <UnorderedList {...props} />,
        li: ({ ...props }) => <ListItem {...props} />,
      }}
    >
      {body}
    </Container>
  )
}
