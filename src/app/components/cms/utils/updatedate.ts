// Helper function to concatenate day, month, and year into a single date field
export function updateMemorableDate(formData: FormData): FormData {
  const day = formData.get('enter_a_memorable_date-day')
  const month = formData.get('enter_a_memorable_date-month')
  const year = formData.get('enter_a_memorable_date-year')

  // If day, month, and year are all present, concatenate them into a single field
  if (day && month && year) {
    const memorableDate = `${day}-${month}-${year}`

    // Create a new FormData object based on the existing formData
    const updatedFormData = formData

    // Set the concatenated memorable date and remove the individual day, month, and year fields
    updatedFormData.set('enter_a_memorable_date', memorableDate)
    updatedFormData.delete('enter_a_memorable_date-day')
    updatedFormData.delete('enter_a_memorable_date-month')
    updatedFormData.delete('enter_a_memorable_date-year')

    return updatedFormData
  }

  // Return the formData as is if no date fields are provided
  return formData
}
