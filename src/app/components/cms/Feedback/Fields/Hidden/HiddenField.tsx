interface HiddenFieldType {
  cleanName: string
}

export default function HiddenField({ cleanName }: Readonly<HiddenFieldType>) {
  return (
    <input
      aria-label="Unused Hidden Date Input"
      className="govuk-visually-hidden"
      name={cleanName}
      id={cleanName}
      value={cleanName}
    />
  )
}
