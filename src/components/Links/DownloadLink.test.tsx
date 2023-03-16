import { render, screen } from '@testing-library/react'
import { DownloadLink } from './DownloadLink'

test('Download link displays correctly', () => {
  render(<DownloadLink href="/path-to-file">Download Me</DownloadLink>)
  expect(screen.getByRole('link', { name: 'Download Me' })).toHaveAttribute(
    'href',
    '/path-to-file'
  )
})
