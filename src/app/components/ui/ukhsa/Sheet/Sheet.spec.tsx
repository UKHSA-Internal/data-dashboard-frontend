import userEvent from '@testing-library/user-event'
import { ComponentProps } from 'react'

import { render, screen } from '@/config/test-utils'

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetOverlay,
  SheetTitle,
  SheetTrigger,
} from './Sheet'

const sheetHeader = (
  <SheetHeader>
    <SheetTitle>Sheet title</SheetTitle>
    <SheetDescription>Sheet description</SheetDescription>
  </SheetHeader>
)

const sheetContent = <SheetContent side="left">{sheetHeader}</SheetContent>

const expectedClasses: Record<ComponentProps<typeof SheetContent>['side'], string> = {
  left: 'inset-y-0 left-0 h-full w-full sm:w-3/4 data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left sm:max-w-sm',
  right:
    'inset-y-0 right-0 h-full w-full sm:w-3/4 data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right sm:max-w-sm',
  top: 'inset-x-0 top-0 data-[state=closed]:slide-out-to-top data-[state=open]:slide-in-from-top',
  bottom: 'inset-x-0 bottom-0 data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom',
}

describe('Sheet', () => {
  beforeEach(() => {
    console.error = jest.fn()
  })

  test('Opening a sheet from a trigger', async () => {
    render(
      <Sheet>
        <SheetTrigger>Open</SheetTrigger>
        {sheetContent}
      </Sheet>
    )

    const triggerElement = screen.getByRole('button', { name: 'Open' })
    expect(triggerElement).toHaveAttribute('aria-expanded', 'false')
    expect(triggerElement).toHaveAttribute('aria-haspopup', 'dialog')
    expect(triggerElement).toHaveAttribute('aria-controls', 'radix-_r_0_')

    expect(screen.queryByRole('sheet', { name: 'Sheet title' })).not.toBeInTheDocument()

    await userEvent.click(triggerElement)

    expect(triggerElement).toHaveAttribute('aria-expanded', 'true')

    const sheet = screen.getByRole('dialog', { name: 'Sheet title' })
    expect(sheet).toBeInTheDocument()
    expect(screen.getByText('Sheet description')).toBeInTheDocument()
  })

  test('Defaulting open on page load', async () => {
    render(
      <Sheet defaultOpen>
        <SheetContent side="left">{sheetHeader}</SheetContent>
      </Sheet>
    )

    expect(screen.getByRole('dialog', { name: 'Sheet title' })).toBeInTheDocument()
    expect(screen.getByText('Sheet description')).toBeInTheDocument()
  })

  test('Sheet position - top', async () => {
    render(
      <Sheet defaultOpen>
        <SheetContent side="top">{sheetHeader}</SheetContent>
      </Sheet>
    )

    expect(screen.getByRole('dialog', { name: 'Sheet title' })).toHaveClass(expectedClasses.top)
  })

  test('Sheet position - bottom', async () => {
    render(
      <Sheet defaultOpen>
        <SheetContent side="bottom">{sheetHeader}</SheetContent>
      </Sheet>
    )

    expect(screen.getByRole('dialog', { name: 'Sheet title' })).toHaveClass(expectedClasses.bottom)
  })

  test('Sheet position - left', async () => {
    render(
      <Sheet defaultOpen>
        <SheetContent side="left">{sheetHeader}</SheetContent>
      </Sheet>
    )

    expect(screen.getByRole('dialog', { name: 'Sheet title' })).toHaveClass(expectedClasses.left)
  })

  test('Sheet position - right', async () => {
    render(
      <Sheet defaultOpen>
        <SheetContent side="right">{sheetHeader}</SheetContent>
      </Sheet>
    )

    expect(screen.getByRole('dialog', { name: 'Sheet title' })).toHaveClass(expectedClasses.right)
  })

  test('Closing a sheet', async () => {
    render(<Sheet defaultOpen>{sheetContent}</Sheet>)

    expect(screen.getByRole('dialog', { name: 'Sheet title' })).toBeInTheDocument()
    await userEvent.click(screen.getByRole('button', { name: 'Close' }))
    expect(screen.queryByRole('dialog', { name: 'Sheet title' })).not.toBeInTheDocument()
  })

  test('Closing a sheet with a custom close button', async () => {
    render(
      <Sheet defaultOpen>
        <SheetContent side="left">
          {sheetHeader}
          <SheetClose>Custom close</SheetClose>
        </SheetContent>
      </Sheet>
    )

    expect(screen.getByRole('dialog', { name: 'Sheet title' })).toBeInTheDocument()

    const customCloseBtn = screen.getByRole('button', { name: 'Custom close' })
    expect(customCloseBtn).toBeInTheDocument()
    await userEvent.click(customCloseBtn)

    expect(screen.queryByRole('dialog', { name: 'Sheet title' })).not.toBeInTheDocument()
  })

  test('Background overlay', () => {
    const { container } = render(
      <Sheet defaultOpen>
        <SheetOverlay>Nothing to see here</SheetOverlay>
      </Sheet>
    )

    expect(container.firstChild).toHaveClass(
      'bg-black/80 fixed inset-0 z-50 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0'
    )
  })

  test('Custom footer', () => {
    render(
      <Sheet defaultOpen>
        <SheetContent side="left">
          {sheetHeader}
          <SheetFooter>Sheet footer</SheetFooter>
        </SheetContent>
      </Sheet>
    )

    expect(screen.getByText('Sheet footer')).toBeInTheDocument()
  })
})
