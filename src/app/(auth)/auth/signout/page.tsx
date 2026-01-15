import UserSignOut from '@/app/components/ui/ukhsa/UserSignOut/UserSignOut'

export default async function Page() {
  return (
    <>
      <h1 className="govuk-heading-xl govuk-!-margin-top-2 govuk-!-margin-bottom-4">
        Sign out of the UKHSA data dashboard
      </h1>
      <p>Are you sure you want to sign out?</p>
      <UserSignOut />
    </>
  )
}
