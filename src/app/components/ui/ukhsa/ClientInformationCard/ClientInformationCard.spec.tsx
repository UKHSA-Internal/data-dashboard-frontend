import ClientInformationCard, {
  ClientInformationCardProps,
} from '@/app/components/ui/ukhsa/ClientInformationCard/ClientInformationCard'
import { render, screen } from '@/config/test-utils'

describe('ClientInformationCard', () => {
  const defaultProps: ClientInformationCardProps = {
    variant: 'info',
    title: 'Information',
    message: 'Important information',
  }

  test('renders a loading spinner when variant is `loading`', () => {
    render(<ClientInformationCard variant="loading" />)

    expect(screen.getByLabelText('Loading spinner')).toBeInTheDocument()
  })

  test('renders a Information icon when variant is `info`', () => {
    render(<ClientInformationCard variant="info" />)

    expect(screen.getByLabelText('information')).toBeInTheDocument()
  })

  test('renders a exclamation mark icon when variant is `error`', () => {
    render(<ClientInformationCard variant="error" />)

    expect(screen.getByLabelText('Exclamation mark')).toBeInTheDocument()
  })

  test('renders a variant icon, title and message when all props provided', () => {
    render(<ClientInformationCard {...defaultProps} />)
    const { title, message } = defaultProps

    expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent(title!)
    expect(screen.getByText(message!)).toBeInTheDocument()
    expect(screen.getByLabelText('information')).toBeInTheDocument()
  })
})
