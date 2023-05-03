import { FormattedContent } from '@/components/FormattedContent'

interface TextProps {
  children: string
  cardProps?: Record<string, unknown>
}

export const Text = ({ children, cardProps }: TextProps) => {
  return <FormattedContent {...cardProps}>{children}</FormattedContent>
}
