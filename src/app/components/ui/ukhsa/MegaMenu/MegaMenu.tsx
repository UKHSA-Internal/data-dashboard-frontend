import clsx from 'clsx'

interface MegaMenuProps {
  className?: string
}

/**
 * This is an MVP implementation of the GOV.UK menu system that is hooked up to our CMS menu snippet system.
 *
 * Currently it is configured to only display responsive columns in a 1/3 grid system.
 * TODO: Expand this to be more dynamic according to how we receive content from the CMS.
 */
export async function MegaMenu({ className = 'govuk-!-padding-top-2' }: MegaMenuProps) {
  return <div className={clsx(className)}>menu placeholder</div>
}
