import { SearchBox } from 'govuk-react'

type SearchProps = {
  placeholder?: string
  defaultValue?: string
}

export default function Search({
  defaultValue,
  placeholder = 'Enter virus name here...',
}: SearchProps) {
  return (
    <form method="get" action="">
      <SearchBox>
        {SearchBox.Input && (
          <SearchBox.Input
            name="searchTerm"
            defaultValue={defaultValue}
            placeholder={placeholder}
          />
        )}
        {SearchBox.Button && <SearchBox.Button />}
      </SearchBox>
    </form>
  )
}
