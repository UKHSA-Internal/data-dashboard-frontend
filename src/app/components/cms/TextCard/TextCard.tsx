import { RichText } from '@/app/components/cms'

type TextCardProps = {
  value: {
    body: string
  }
}

export function TextCard({ value }: TextCardProps) {
  return <RichText>{value.body}</RichText>
}
