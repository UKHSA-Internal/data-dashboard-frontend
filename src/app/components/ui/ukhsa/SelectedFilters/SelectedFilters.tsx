import { ReactNode } from "react"

interface SelectedFiltersProps {
    children?: ReactNode
}

export function SelectedFilters({children}: SelectedFiltersProps) {
    return (
        <div className="flex flex-wrap">
            <h2 className="govuk-heading-s w-full">Selected Filters:</h2>
            {children}
        </div>
    )
}