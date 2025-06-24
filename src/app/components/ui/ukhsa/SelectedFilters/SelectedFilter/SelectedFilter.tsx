interface SelectedFilterProps {
    name: string
}

export function SelectedFilter({name}: SelectedFilterProps) {
    return (
        // eslint-disable-next-line tailwindcss/no-unnecessary-arbitrary-value
        <div className="govuk-!-padding-2 border-[1px] border-grey-2 bg-grey-4">
            {name}
        </div>
    )
}