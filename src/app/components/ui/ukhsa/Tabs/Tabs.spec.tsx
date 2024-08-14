import userEvent from '@testing-library/user-event'
import Link from 'next/link'
import React from 'react'

import { createEvent, fireEvent, render, screen } from '@/config/test-utils'

import { Tabs, TabsContent, TabsList, TabsTrigger } from './Tabs'

describe('Tabs', () => {
  test('renders a list of tabs', () => {
    render(
      <Tabs>
        <TabsList />
      </Tabs>
    )
    const tabsElement = screen.getByRole('tablist')
    expect(tabsElement).toBeInTheDocument()
  })

  test('renders a tab trigger', () => {
    render(
      <Tabs>
        <TabsList>
          <TabsTrigger value="tab-1">Test Trigger</TabsTrigger>
        </TabsList>
      </Tabs>
    )

    const triggerElement = screen.getByRole('tab', { name: /test trigger/i })
    expect(triggerElement).toBeInTheDocument()
  })

  test('renders a tab content', () => {
    render(
      <Tabs>
        <TabsList>
          <TabsTrigger value="tab-1">Test Trigger</TabsTrigger>
        </TabsList>
        <TabsContent value="tab-1">Test Content</TabsContent>
      </Tabs>
    )

    const contentElement = screen.getByText(/test content/i)
    expect(contentElement).toBeInTheDocument()
  })
})

describe('Opening a new tab', () => {
  test('using a mouse', async () => {
    render(
      <Tabs defaultValue="tab-1">
        <TabsList>
          <TabsTrigger value="tab-1">Trigger 1</TabsTrigger>
          <TabsTrigger value="tab-2">Trigger 2</TabsTrigger>
        </TabsList>
        <TabsContent value="tab-1">Content 1</TabsContent>
        <TabsContent value="tab-2">Content 2</TabsContent>
      </Tabs>
    )

    expect(screen.getByRole('tab', { name: /Trigger 1/i })).toHaveAttribute('aria-selected', 'true')
    expect(screen.getByText(/Content 1/i)).toHaveAttribute('data-state', 'active')

    await userEvent.click(screen.getByRole('tab', { name: /Trigger 2/i }))

    expect(screen.getByRole('tab', { name: /Trigger 1/i })).toHaveAttribute('aria-selected', 'false')
    expect(screen.getByRole('tab', { name: /Trigger 2/i })).toHaveAttribute('aria-selected', 'true')
    expect(screen.getByText(/Content 1/i)).toHaveAttribute('data-state', 'inactive')
    expect(screen.getByText(/Content 2/i)).toHaveAttribute('data-state', 'active')
  })

  test('using a keyboard', async () => {
    render(
      <Tabs defaultValue="tab-1">
        <TabsList>
          <TabsTrigger value="tab-1">Trigger 1</TabsTrigger>
          <TabsTrigger value="tab-2">Trigger 2</TabsTrigger>
        </TabsList>
        <TabsContent value="tab-1">Content 1</TabsContent>
        <TabsContent value="tab-2">Content 2</TabsContent>
      </Tabs>
    )

    await userEvent.keyboard('{tab}')
    expect(screen.getByRole('tab', { name: /Trigger 1/i })).toHaveFocus()

    await userEvent.keyboard('{tab}')
    expect(screen.getByRole('tab', { name: /Trigger 1/i })).not.toHaveFocus()
    expect(screen.getByRole('tab', { name: /Trigger 2/i })).toHaveFocus()

    await userEvent.keyboard('{Enter}')
    expect(screen.getByText(/Content 1/i)).toHaveAttribute('data-state', 'inactive')
    expect(screen.getByText(/Content 2/i)).toHaveAttribute('data-state', 'active')

    await userEvent.keyboard('{ArrowRight}')
    expect(screen.getByRole('tab', { name: /Trigger 2/i })).not.toHaveFocus()
    expect(screen.getByRole('tab', { name: /Trigger 1/i })).toHaveFocus()

    await userEvent.keyboard('{Enter}')
    expect(screen.getByText(/Content 2/i)).toHaveAttribute('data-state', 'inactive')
    expect(screen.getByText(/Content 1/i)).toHaveAttribute('data-state', 'active')
  })
})

describe('Composing the tabs to support a url based non-javascript fallback', () => {
  test('renders the tabs with hrefs', async () => {
    render(
      <Tabs defaultValue="tab-1">
        <TabsList>
          <TabsTrigger asChild value="tab-1">
            <Link href="#tab-1">Trigger 1</Link>
          </TabsTrigger>
          <TabsTrigger asChild value="tab-2">
            <Link href="#tab-2">Trigger 2</Link>
          </TabsTrigger>
        </TabsList>
        <TabsContent value="tab-1">Content 1</TabsContent>
        <TabsContent value="tab-2">Content 2</TabsContent>
      </Tabs>
    )

    // Tab triggers should render as links
    expect(screen.getByRole('tab', { name: 'Trigger 1' })).toHaveAttribute('href', '#tab-1')
    expect(screen.getByRole('tab', { name: 'Trigger 2' })).toHaveAttribute('href', '#tab-2')

    // All tab panels should be force mounted (the inactive panel is hidden using css)
    expect(screen.getByText(/Content 1/i)).toBeInTheDocument()
    expect(screen.getByText(/Content 2/i)).toBeInTheDocument()
  })

  test('prevents default link click behaviour', async () => {
    render(
      <Tabs defaultValue="tab-1">
        <TabsList>
          <TabsTrigger asChild value="tab-1">
            <Link href="#tab-1">Trigger 1</Link>
          </TabsTrigger>
        </TabsList>
      </Tabs>
    )
    const event = createEvent.click(screen.getByRole('tab', { name: 'Trigger 1' }))
    event.preventDefault = jest.fn()

    fireEvent(screen.getByRole('tab', { name: 'Trigger 1' }), event)

    expect(event.preventDefault).toHaveBeenCalledTimes(1)
  })

  test('prevents default link spacebar keydown behaviour', async () => {
    render(
      <Tabs defaultValue="tab-1">
        <TabsList>
          <TabsTrigger asChild value="tab-1">
            <Link href="#tab-1">Trigger 1</Link>
          </TabsTrigger>
        </TabsList>
      </Tabs>
    )
    const event = createEvent.keyDown(screen.getByRole('tab', { name: 'Trigger 1' }), {
      key: ' ',
      keyCode: 32,
    })
    event.preventDefault = jest.fn()

    fireEvent(screen.getByRole('tab', { name: 'Trigger 1' }), event)

    expect(event.preventDefault).toHaveBeenCalledTimes(1)
  })
})
