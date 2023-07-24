import { usePathname } from 'next/navigation'

import { render, screen } from '@/config/test-utils'

import { SideNav, SideNavLink, SideNavSubMenu, SideNavSubMenuLink } from './SideNav'

jest.mock('next/navigation')

test('SideNav with children', async () => {
  render(
    await SideNav({
      children: (
        <>
          <li>Child 1</li>
          <li>Child 2</li>
        </>
      ),
    })
  )

  expect(screen.getByRole('navigation')).toBeInTheDocument()
  expect(screen.getByRole('list')).toBeInTheDocument()
  expect(screen.getByText('Child 1')).toBeInTheDocument()
  expect(screen.getByText('Child 2')).toBeInTheDocument()
})

test('SideNavLink component with active link', async () => {
  const usePathnameMock = jest.mocked(usePathname)
  usePathnameMock.mockReturnValueOnce('/active')

  render(
    await SideNavLink({ children: 'Active Link', href: '/active', subMenu: <ul aria-label="Submenu">Submenu</ul> })
  )

  const link = screen.getByRole('link', { name: 'Active Link' })
  expect(link).toBeInTheDocument()
  expect(link).toHaveAttribute('href', '/active')
  expect(link).toHaveAttribute('aria-current', 'page')

  const submenu = screen.getByRole('list', { name: 'Submenu' })
  expect(submenu).toBeInTheDocument()
})

test('SideNavLink component with inactive link', async () => {
  const usePathnameMock = jest.mocked(usePathname)
  usePathnameMock.mockReturnValueOnce('/active')

  render(
    await SideNavLink({ children: 'Inactive Link', href: '/inactive', subMenu: <ul aria-label="Submenu">Submenu</ul> })
  )

  const link = screen.getByRole('link', { name: 'Inactive Link' })
  expect(link).toBeInTheDocument()
  expect(link).toHaveAttribute('href', '/inactive')
  expect(link).not.toHaveAttribute('aria-current', 'page')

  const submenu = screen.getByRole('list', { name: 'Submenu' })
  expect(submenu).toBeInTheDocument()
})

test('SideNavSubMenu component with children', async () => {
  render(
    await SideNavSubMenu({
      children: (
        <>
          <li>Child 1</li>
          <li>Child 2</li>
        </>
      ),
    })
  )

  expect(screen.getByRole('list')).toBeInTheDocument()
  expect(screen.getByText('Child 1')).toBeInTheDocument()
  expect(screen.getByText('Child 2')).toBeInTheDocument()
})

test('SideNavSubMenuLink with active link', async () => {
  const usePathnameMock = jest.mocked(usePathname)
  usePathnameMock.mockReturnValueOnce('/active')

  render(
    await SideNavSubMenuLink({
      href: '/active',
      children: 'Active Submenu Link',
    })
  )

  const link = screen.getByRole('link', { name: 'Active Submenu Link' })
  expect(link).toBeInTheDocument()
  expect(link).toHaveAttribute('href', '/active')
  expect(link).toHaveAttribute('aria-current', 'page')
})

test('SideNavSubMenuLink  with inactive link', async () => {
  const usePathnameMock = jest.mocked(usePathname)
  usePathnameMock.mockReturnValueOnce('/active')

  render(
    await SideNavSubMenuLink({
      href: '/inactive',
      children: 'Inactive Submenu Link',
    })
  )

  const link = screen.getByRole('link', { name: 'Inactive Submenu Link' })
  expect(link).toBeInTheDocument()
  expect(link).toHaveAttribute('href', '/inactive')
  expect(link).not.toHaveAttribute('aria-current', 'page')
})
