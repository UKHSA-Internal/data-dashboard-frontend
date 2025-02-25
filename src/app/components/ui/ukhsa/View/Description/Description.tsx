import { RichText } from '@/app/components/cms'

interface DescriptionProps {
  description: string
}

export const Description = async ({ description }: DescriptionProps) => {
  return <RichText>{description}</RichText>
}
