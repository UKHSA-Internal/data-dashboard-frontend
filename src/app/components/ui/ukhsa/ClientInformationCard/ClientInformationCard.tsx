'use client'

import { ReactNode } from 'react'

import { ExclamationIcon } from '@/app/components/ui/ukhsa/Icons/Exclamation'
import { InfoIcon } from '@/app/components/ui/ukhsa/Icons/Information'
import { LoadingSpinner } from '@/app/components/ui/ukhsa/Icons/LoadingSpinner'

type Variant = 'loading' | 'info' | 'error'
export interface ClientInformationCardProps {
  variant: Variant
  title?: string
  message?: string
  children?: ReactNode
}

const ClientInformationCard = ({ variant, title, message, children }: ClientInformationCardProps) => {
  const getIcon = () => {
    if (variant == 'loading') {
      return <LoadingSpinner />
    }

    if (variant == 'info') {
      return <InfoIcon />
    }

    if (variant == 'error') {
      return <ExclamationIcon />
    }
  }

  return (
    <div className="govuk-!-padding-4 bg-grey-3" style={{ minHeight: 300 }}>
      <section
        className="clear-both mb-0 flex items-center justify-center border border-mid-grey bg-white p-3 lg:px-4 lg:py-6"
        style={{ minHeight: 260 }}
      >
        <div className="flex flex-col items-center text-center">
          <div className="flex flex-col items-center">
            <span className="mb-2">{getIcon()}</span>

            {title && (
              <h2 className="mb-2 font-semibold" style={{ fontSize: '22px' }}>
                {title}
              </h2>
            )}

            {message && <p>{message}</p>}

            {children && <div className="mt-4">{children}</div>}
          </div>
        </div>
      </section>
    </div>
  )
}

export default ClientInformationCard
