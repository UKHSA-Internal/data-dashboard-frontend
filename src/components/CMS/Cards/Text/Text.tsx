interface TextProps {
  children: string
  cardProps?: Record<string, unknown>
}

export const Text = ({ children, cardProps }: TextProps) => {
  return (
    <div {...cardProps}>
      <div dangerouslySetInnerHTML={{ __html: children }} />
    </div>
  )
}
