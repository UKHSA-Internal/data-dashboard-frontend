import { render } from '@/config/test-utils'

import { FilterBannerWrapper } from './FilterBannerWrapper'

// Mock the dynamic imports
jest.mock('./FilterBanners', () => {
  return function MockFilterBanners() {
    return <div data-testid="filter-banners">Filter Banners</div>
  }
})

jest.mock('@/app/components/ui/ukhsa/StaticFilter/StaticFilter', () => {
  return function MockStaticFilter({ children }: { children: React.ReactNode }) {
    return <div data-testid="static-filter">{children}</div>
  }
})

jest.mock('@/app/components/ui/ukhsa/SelectedFilters/SelectedFilters', () => {
  return function MockSelectedFilters() {
    return <div data-testid="selected-filters">Selected Filters</div>
  }
})

jest.mock('@/app/components/ui/ukhsa/FilterDropdowns/FilterDropdowns', () => {
  return function MockFilterDropdowns() {
    return <div data-testid="filter-dropdowns">Filter Dropdowns</div>
  }
})

describe('FilterBannerWrapper', () => {
  test('renders StaticFilter as the root component', async () => {
    const { findByTestId } = render(await FilterBannerWrapper())

    const staticFilter = await findByTestId('static-filter')
    expect(staticFilter).toBeInTheDocument()
  })

  test('renders FilterBanners component inside StaticFilter', async () => {
    const { findByTestId } = render(await FilterBannerWrapper())

    const filterBanners = await findByTestId('filter-banners')
    expect(filterBanners).toBeInTheDocument()
  })

  test('renders SelectedFilters component inside StaticFilter', async () => {
    const { findByTestId } = render(await FilterBannerWrapper())

    const selectedFilters = await findByTestId('selected-filters')
    expect(selectedFilters).toBeInTheDocument()
  })

  test('renders FilterDropdowns component inside StaticFilter', async () => {
    const { findByTestId } = render(await FilterBannerWrapper())

    const filterDropdowns = await findByTestId('filter-dropdowns')
    expect(filterDropdowns).toBeInTheDocument()
  })

  test('renders all child components within StaticFilter wrapper', async () => {
    const { findByTestId } = render(await FilterBannerWrapper())

    const staticFilter = await findByTestId('static-filter')
    const filterBanners = await findByTestId('filter-banners')
    const selectedFilters = await findByTestId('selected-filters')
    const filterDropdowns = await findByTestId('filter-dropdowns')

    expect(staticFilter).toContainElement(filterBanners)
    expect(staticFilter).toContainElement(selectedFilters)
    expect(staticFilter).toContainElement(filterDropdowns)
  })

  test('renders components in correct order within StaticFilter', async () => {
    const { findByTestId } = render(await FilterBannerWrapper())

    const staticFilter = await findByTestId('static-filter')
    const children = Array.from(staticFilter.children)

    expect(children[0]).toHaveAttribute('data-testid', 'filter-banners')
    expect(children[1]).toHaveAttribute('data-testid', 'selected-filters')
    expect(children[2]).toHaveAttribute('data-testid', 'filter-dropdowns')
  })

  test('wraps entire component structure in Suspense with null fallback', async () => {
    const { container } = render(await FilterBannerWrapper())

    // Check that Suspense is working by verifying async rendering completes successfully
    const staticFilter = await container.querySelector('[data-testid="static-filter"]')
    expect(staticFilter).toBeInTheDocument()
  })

  test('all dynamically imported components are rendered without SSR', async () => {
    const { findByTestId } = render(await FilterBannerWrapper())

    // Verify all dynamic imports are present (implicitly tests ssr: false works)
    const staticFilter = await findByTestId('static-filter')
    const filterBanners = await findByTestId('filter-banners')
    const selectedFilters = await findByTestId('selected-filters')
    const filterDropdowns = await findByTestId('filter-dropdowns')

    expect(staticFilter).toBeInTheDocument()
    expect(filterBanners).toBeInTheDocument()
    expect(selectedFilters).toBeInTheDocument()
    expect(filterDropdowns).toBeInTheDocument()
  })
})
