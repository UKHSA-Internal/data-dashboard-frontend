import { RichText } from '@/app/components/cms'

interface CompositeComponentProps {
  type: 'text' | 'button'
  value: string | { text: string; loading_text: string; endpoint: string; method: string; button_type: string }
}

export function CompositeComponent({ type, value }: CompositeComponentProps) {
  // TODO: CDD-1741, Fill in button & codeblock functionality, and replace where used
  if (type === 'button') return null

  const text = typeof value === 'string' ? value : value.text

  return <RichText>{text}</RichText>
}
