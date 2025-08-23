export const TextualLoader = ({ text, className }: { text: string; className?: string }): JSX.Element => {
  return (
    <div className={className}>
      <div className="text-xl text-center">
        {text}
        <span className="loading-dots"></span>
      </div>
    </div>
  )
}
