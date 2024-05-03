import { parseAsInteger, useQueryState } from 'nuqs'
import Control from 'react-leaflet-custom-control'

import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from '@/app/components/ui/ukhsa/Sheet/Sheet'
import { mapQueryKeys } from '@/app/constants/map.constants'

interface HealthAlertControlProps {
  open: boolean
  onClose: () => void
}

export default function HealthAlertControl({ open, onClose }: HealthAlertControlProps) {
  const [featureId] = useQueryState(mapQueryKeys.featureId, parseAsInteger)

  return (
    <Control position="topleft">
      <Sheet
        open={open}
        onOpenChange={(open) => {
          if (!open) {
            onClose()
          }
        }}
      >
        <SheetContent side="left">
          <SheetHeader>
            <SheetTitle>Region id: {featureId}</SheetTitle>
            <SheetDescription>
              <small>Last updated on Thursday, 11 April 2024 at 03:51pm</small>
            </SheetDescription>
          </SheetHeader>
          <div className="govuk-!-padding-4">
            <div>
              <strong className="govuk-!-margin-right-2">Alert status</strong>
              <div className="govuk-tag govuk-tag--green">Green</div>
            </div>
            <div className="govuk-!-margin-top-3">
              <strong>Alert description</strong>
              <p className="govuk-body-s">
                Significant impacts are expected across the health and social care sector due to the high temperatures,
                including: observed increase in mortality across the population likely, particularly in the 65+ age
                group or those with health conditions, but impacts may also be seen in younger age groups; increased
                demand for remote health care services likely; internal temperatures in care settings (hospitals and
                care homes) may exceed recommended threshold for clinical risk assessment; impact on ability of services
                to be delivered due to heat effects on workforce possible and many indoor environments likely to be
                overheating, risk to vulnerable people living independently in community as well as in care settings;
                medicines management issues; staffing issues due to external factors (e.g. transport); cross system
                demand for temporary AC capacity being exceeded possible and other sectors starting to be observe
                impacts (e.g. travel delays).
              </p>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </Control>
  )
}
