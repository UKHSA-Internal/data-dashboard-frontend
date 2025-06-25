import { ReactNode } from "react"

interface SelectedFiltersProps {
    children?: ReactNode
}

export function SelectedFilters({children}: SelectedFiltersProps) {
    return (
        <div className="flex flex-wrap">
            <h2 className="govuk-heading-s w-full govuk-!-margin-bottom-1">Selected Filters</h2> {/*TODO: i18n for text*/}
            {children}
        </div>
    )
}