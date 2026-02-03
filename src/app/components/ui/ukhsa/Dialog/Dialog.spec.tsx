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
    render(
      <Dialog>
        <DialogTrigger>Open</DialogTrigger>
        {dialogContent}
      </Dialog>
    )

    const triggerElement = screen.getByRole('button', { name: 'Open' })
    expect(triggerElement).toHaveAttribute('aria-expanded', 'false')
    expect(triggerElement).toHaveAttribute('aria-haspopup', 'dialog')
    expect(triggerElement).toHaveAttribute('aria-controls', 'radix-_r_0_')

    expect(screen.queryByRole('dialog', { name: 'Dialog title' })).not.toBeInTheDocument()

    await userEvent.click(triggerElement)

    expect(triggerElement).toHaveAttribute('aria-expanded', 'true')

    const dialog = screen.getByRole('dialog', { name: 'Dialog title' })

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

  test('Background overlay', () => {
    const { container } = render(
      <Dialog defaultOpen>
        <DialogOverlay>Nothing to see here</DialogOverlay>
      </Dialog>
    )

    expect(container.firstChild).toHaveClass(
      'fixed inset-0 z-50 bg-[black]/70  data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0'
    )
  })

  test('Custom footer', () => {
    render(
      <Dialog defaultOpen>
        <DialogContent fullscreen>
          {dialogHeader}
          <DialogFooter>Dialog footer</DialogFooter>
        </DialogContent>
      </Dialog>
    )

    expect(screen.getByText('Dialog footer')).toBeInTheDocument()
  })
})
