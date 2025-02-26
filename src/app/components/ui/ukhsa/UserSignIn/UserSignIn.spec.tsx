import { render, screen } from '@/config/test-utils'

import UserSignIn from './UserSignIn'

jest.mock('@/auth', () => ({
  signIn: jest.fn(),
}))

describe('UserSignIn Component', () => {
  beforeEach(() => {
    console.error = jest.fn()
  })

  test('renders the sign-in button', async () => {
    render(await UserSignIn())
    expect(screen.getByRole('button', { name: 'Start now' })).toBeInTheDocument()
  })
})
