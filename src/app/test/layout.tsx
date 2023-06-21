export default async function HomeLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="govuk-grid-row">
      <div className="govuk-grid-column-two-thirds">{children}</div>
    </div>
  )
}
