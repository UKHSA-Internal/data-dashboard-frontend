import { CardColumn } from '@/components/Card'

interface SingleHeadlineProps {
  heading: string
}

export const SingleHeadline = ({ heading }: SingleHeadlineProps) => {
  return <CardColumn heading={heading}>tbc</CardColumn>
}
