import clsx from 'clsx'
import Link from 'next/link'
import { HTMLProps } from 'react'

import { useTranslation } from '@/app/i18n'

interface DownloadButtonExternalProps extends HTMLProps<HTMLLinkElement> {
  /** The text to display on the download button. */
  label: string
  /** The specific url to which the button will link to. */
  href: string
  /** The name of the icon to display on the button */
  icon: string
  /** The variant of button to display */
  type: string
}

/**
 * A component that renders a link styled as a button for downloading external content.
 *
 * @param props - The properties required to configure the download button, including the button label, the url
 * to the external asset, the type which corresponds to the GOV.UK design system button type, the icon to display
 * (not yet supported by this component), and any additional HTML properties for the form element.
 * @returns A form element configured as a download button.
 */

// TODO: Add icon support (this is already built into the cms and currently supports values of "download" or "start"

export async function DownloadButtonExternal({ label, href, type }: DownloadButtonExternalProps) {
  const { t } = await useTranslation('common')
  return (
    <div className="[&+h2]:mt-6">
      <Link
        className={clsx('govuk-button', {
          'govuk-button--primary': type === 'primary',
          'govuk-button--secondary': type === 'secondary',
        })}
        href={href}
        target="_blank"
      >
        {label}
        <span className="govuk-visually-hidden">{t('externalLinkAltText')}</span>
      </Link>
    </div>
  )
}
