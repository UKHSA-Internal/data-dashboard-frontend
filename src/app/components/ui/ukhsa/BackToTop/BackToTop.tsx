'use client'

interface BackToTopProps {
  label: string
  href?: string
}

export const BackToTop = ({ label, href = '#main-content' }: BackToTopProps) => (
  <a
    href={href}
    className="govuk-link--no-visited-state sticky bottom-8 mt-[calc(100vh+20px)] inline-flex items-center bg-white px-[12px] py-[6px] opacity-90"
    onClick={(event) => {
      event.preventDefault()
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      })
    }}
  >
    <div
      className="govuk-!-margin-right-2 h-[16px] w-[16px] bg-back_to_top bg-center bg-no-repeat"
      aria-hidden
      data-testid="up-arrow"
    />
    {label}
  </a>
)
