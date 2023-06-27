import { render, screen } from '@/config/test-utils'

import { HeadlineValue } from './HeadlineValue'

test('Shows a heading and value text', () => {
  render(<HeadlineValue heading="Patients admitted" value={24298} />)

  expect(screen.getByText('Patients admitted')).toBeInTheDocument()
  expect(screen.getByText('24,298')).toBeInTheDocument()
})
