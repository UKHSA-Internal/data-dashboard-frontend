import { updateMemorableDate } from './updatedate'

describe('updateMemorableDate', () => {
  it('should correctly concatenate day, month, and year into a memorable date', () => {
    // Create mock FormData with day, month, and year
    const formData = new FormData()
    formData.set('enter_a_memorable_date-day', '24')
    formData.set('enter_a_memorable_date-month', '01')
    formData.set('enter_a_memorable_date-year', '2025')

    const updatedFormData = updateMemorableDate(formData)

    // Assert that the memorable date is set and the individual fields are removed
    expect(updatedFormData.get('enter_a_memorable_date')).toBe('24-01-2025')
    expect(updatedFormData.has('enter_a_memorable_date-day')).toBe(false)
    expect(updatedFormData.has('enter_a_memorable_date-month')).toBe(false)
    expect(updatedFormData.has('enter_a_memorable_date-year')).toBe(false)
  })

  it('should not change formData if any date fields are missing', () => {
    // Create mock FormData missing the day
    const formData = new FormData()
    formData.set('enter_a_memorable_date-month', '12')
    formData.set('enter_a_memorable_date-year', '2025')

    const updatedFormData = updateMemorableDate(formData)

    // Assert that the form data remains unchanged
    expect(updatedFormData.get('enter_a_memorable_date')).toBeNull()
  })

  it('should return the original FormData when no date fields are provided', () => {
    // Create mock FormData without any date fields
    const formData = new FormData()

    const updatedFormData = updateMemorableDate(formData)

    // Assert that no changes are made
    expect(updatedFormData.get('enter_a_memorable_date')).toBeNull()
  })
})
