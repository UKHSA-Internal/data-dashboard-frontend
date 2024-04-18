import userEvent from '@testing-library/user-event'
import Link from 'next/link'

import { render, screen } from '@/config/test-utils'

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogOverlay,
  DialogTitle,
  DialogTrigger,
} from './Dialog'

const dialogHeader = (
  <DialogHeader>
    <DialogTitle>Dialog title</DialogTitle>
    <DialogDescription>Dialog description</DialogDescription>
  </DialogHeader>
)

const dialogContent = <DialogContent>{dialogHeader}</DialogContent>

describe('Dialog', () => {
  beforeEach(() => {
    console.error = jest.fn()
  })

  test('Opening a dialog from a trigger', async () => {
    const { container } = render(
      <Dialog>
        <DialogTrigger>Open</DialogTrigger>
        {dialogContent}
      </Dialog>
    )

    expect(container).toMatchSnapshot()
    expect(screen.queryByRole('dialog', { name: 'Dialog title' })).not.toBeInTheDocument()

    const triggerElement = screen.getByRole('button', { name: 'Open' })
    await userEvent.click(triggerElement)

    const dialog = screen.getByRole('dialog', { name: 'Dialog title' })
    expect(dialog).toMatchSnapshot()

    expect(dialog).toBeInTheDocument()
    expect(screen.getByText('Dialog description')).toBeInTheDocument()
  })

  test('Defaulting open on page load', async () => {
    render(<Dialog defaultOpen>{dialogContent}</Dialog>)

    expect(screen.getByRole('dialog', { name: 'Dialog title' })).toBeInTheDocument()
    expect(screen.getByText('Dialog description')).toBeInTheDocument()
  })

  test('Closing a dialog', async () => {
    render(<Dialog defaultOpen>{dialogContent}</Dialog>)

    expect(screen.getByRole('dialog', { name: 'Dialog title' })).toBeInTheDocument()
    await userEvent.click(screen.getByRole('button', { name: 'Close' }))
    expect(screen.queryByRole('dialog', { name: 'Dialog title' })).not.toBeInTheDocument()
  })

  test('Closing a dialog with a custom close button', async () => {
    render(
      <Dialog defaultOpen>
        <DialogContent closeButton={<Link href="/custom-href">Custom close</Link>}>{dialogHeader}</DialogContent>
      </Dialog>
    )

    expect(screen.getByRole('dialog', { name: 'Dialog title' })).toBeInTheDocument()

    const customCloseBtn = screen.getByRole('link', { name: 'Custom close' })
    expect(customCloseBtn).toBeInTheDocument()
    await userEvent.click(customCloseBtn)

    expect(screen.queryByRole('dialog', { name: 'Dialog title' })).not.toBeInTheDocument()
  })

  test('Fullscreen', () => {
    render(
      <Dialog defaultOpen>
        <DialogContent fullscreen>{dialogHeader}</DialogContent>
      </Dialog>
    )

    expect(screen.getByRole('dialog', { name: 'Dialog title' })).toHaveClass('w-full h-full')
  })

  test('Custom footer', () => {
    render(
      <Dialog defaultOpen>
        <DialogOverlay>
          <DialogContent fullscreen>
            {dialogHeader}
            <DialogFooter>Dialog footer</DialogFooter>
          </DialogContent>
        </DialogOverlay>
      </Dialog>
    )

    expect(screen.getByText('Dialog footer')).toBeInTheDocument()
  })
})
