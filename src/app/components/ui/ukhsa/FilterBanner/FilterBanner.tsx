interface FilterBannerProps {
    message: string
    showIcon?: boolean
}

export function FilterBanner({ message , showIcon}: FilterBannerProps) {
    return (
        <div className="flex bg-blue text-white govuk-!-padding-3">
            {showIcon && <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 36 36" fill="none">
                <path d="M18 24V18M18 12H18.015M33 18C33 26.2843 26.2843 33 18 33C9.71573 33 3 26.2843 3 18C3 9.71573 9.71573 3 18 3C26.2843 3 33 9.71573 33 18Z" stroke="white" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" />
            </svg> }
            <div dangerouslySetInnerHTML={{ __html: message }}></div>
        </div>
    )
}
