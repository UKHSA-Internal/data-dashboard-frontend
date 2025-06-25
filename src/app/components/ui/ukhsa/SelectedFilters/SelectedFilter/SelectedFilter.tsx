interface SelectedFilterProps {
    name: string
}

export function SelectedFilter({name}: SelectedFilterProps) {
    return (
        // eslint-disable-next-line tailwindcss/no-unnecessary-arbitrary-value
        <a href='/' className="govuk-!-padding-1 govuk-!-padding-right-2 govuk-!-padding-left-2 govuk-!-margin-right-2 relative border-[1px] border-black bg-white ukhsa-focus text-black no-underline">
            {name}
        </a>
    )
}