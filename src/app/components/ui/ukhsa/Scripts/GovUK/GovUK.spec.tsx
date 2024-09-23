import { ScriptProps } from 'next/script'

import { isWellKnownEnvironment } from '@/app/utils/app.utils'
import { render } from '@/config/test-utils'

import { GovUK } from './GovUK'

// Mock the isWellKnownEnvironment utility function
jest.mock('@/app/utils/app.utils', () => ({
  isWellKnownEnvironment: jest.fn(),
}))

jest.mock('next/script', () => (props: ScriptProps) => <script {...props} />)

describe('GovUK Script Component', () => {
  const jsEnabledScript = `document.body.classList.add('js-enabled', 'noModule' in HTMLScriptElement.prototype ? 'govuk-frontend-supported' : '');`

  const mockedIsWellKnownEnvironment = jest.mocked(isWellKnownEnvironment)

  afterEach(() => {
    jest.clearAllMocks()
  })

  test('should render a plain script tag in well-known environments', () => {
    mockedIsWellKnownEnvironment.mockReturnValue(true)

    const { container } = render(<GovUK />)

    const scriptTag = container.querySelector('script')
    expect(scriptTag).toBeInTheDocument()
    expect(scriptTag).toHaveAttribute('id', 'js-enabled')
    expect(scriptTag?.innerHTML).toBe(jsEnabledScript)
  })

  test('should render the Next.js Script component in development environments', () => {
    mockedIsWellKnownEnvironment.mockReturnValue(false)

    const { container } = render(<GovUK />)

    const mockScript = container.querySelector('script[id="js-enabled"]')
    expect(mockScript).toBeInTheDocument()
    expect(mockScript).toHaveAttribute('id', 'js-enabled')
    expect(mockScript?.textContent).toBe(jsEnabledScript)
  })
})
