import { View } from '@/app/components/ui/ukhsa'
import Form from '@/app/features/Acknowledgement/Form' // client component

export default function AcknowledgementPage() {
  return (
    <View>
      <h1 className="govuk-heading-xl govuk-!-margin-top-2 govuk-!-margin-bottom-4">
        Accessing official sensitive data
      </h1>
      <div className="my-6 border-b border-[#b1b4b6]"></div>
      <h2 className="govuk-heading-l govuk-!-margin-bottom-5">Acknowledgement </h2>
      <div className="bg-gray-50 mb-6 rounded">
        <p className="mb-4">By accessing this dashboard you agree to:</p>
        <ul className="govuk-list govuk-list--bullet text-xl">
          <li>Not share any content with persons that do not have permission to access the none public dashboard</li>
          <li>Not distribute or share any content from the none public dashboard online</li>
          <li>Not leave your workstation un-attended whilst logged into the dashboard</li>
          <li>Only connect using secure networks whilst accessing the none public dashboard</li>
          <li>Ensure the environment you are working in is secure and your screen is not visible to others</li>
        </ul>
        <a href="#terms" className="govuk-link text-xl">
          Read full terms of service here
        </a>
      </div>
      <Form
        checkboxLabel="I acknowledge that I have read the full terms of service, understood and agree to the above conditions"
        disagreeButtonText="Disagree and exit"
        agreeButtonText="Agree and continue"
      />
    </View>
  )
}
