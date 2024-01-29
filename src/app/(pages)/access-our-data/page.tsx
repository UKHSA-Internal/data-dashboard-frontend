import { RelatedLink, RelatedLinks, View } from '@/app/components/ui/ukhsa'

export default function AccessOurData() {
  return (
    <View heading="Access our data">
      <div className="govuk-grid-row">
        <div className="govuk-grid-column-two-thirds-from-desktop">some content</div>
        <div className="govuk-grid-column-one-third-from-desktop">
          <RelatedLinks variant="sidebar">
            <RelatedLink url="/" title="View swagger documentation" />
            <RelatedLink url="/" title="Contribute to our open source project" />
          </RelatedLinks>
        </div>
      </div>
    </View>
  )
}
