/* eslint-disable no-restricted-imports, import/export -- @testing-library imports/exports are allowed in this file only */
import { render, RenderOptions } from '@testing-library/react'
import React, { ReactElement } from 'react'
import { I18nextProvider } from 'react-i18next'

import { DataFilter, GeographyFilters, ThresholdFilter, TimePeriod } from '@/api/models/cms/Page/GlobalFilter'
import { GeographiesSchemaObject } from '@/api/requests/geographies/getGeographies'

import i18n from '../../config/i18n/i18nForTests'

const AllTheProviders = ({ children }: { children: React.ReactNode }) => {
  return <I18nextProvider i18n={i18n}>{children}</I18nextProvider>
}

const customRender = (ui: ReactElement, options?: Omit<RenderOptions, 'wrapper'>) =>
  render(ui, { wrapper: AllTheProviders, ...options })

export * from '@testing-library/react'
export { customRender as render }

// ============================================================================
// Test Mocks
// ============================================================================
// Common test mocks for use across test files.
// These mocks provide standard test data structures that are reused in multiple test files.

export const mockGeography: GeographiesSchemaObject = {
  name: 'England',
  geography_code: 'E92000001',
  geography_type: 'Nation',
  relationships: [],
}

export const mockSelectedVaccinations: DataFilter[] = [
  {
    id: 'vaccination-1',
    type: 'data_filter',
    value: {
      label: '6-in-1 (12 months)',
      colour: '#FF0000',
      parameters: {
        theme: { label: 'Theme', value: 'immunisation' },
        sub_theme: { label: 'Sub Theme', value: 'childhood_vaccines' },
        topic: { label: '6-in-1', value: '6-in-1' },
        metric: { label: 'Coverage', value: '6-in-1_coverage_coverageByYear' },
        stratum: { label: '12 months', value: '12m' },
        sex: { label: 'All', value: 'all' },
        age: { label: 'All Ages', value: 'all' },
      },
      accompanying_points: [],
    },
  },
]

export const mockSelectedThresholds: ThresholdFilter[] = [
  {
    id: 'threshold-1',
    type: 'threshold',
    value: {
      label: 'Target',
      colour: '#00FF00',
      boundary_minimum_value: 90,
      boundary_maximum_value: 100,
    },
  },
]

export const mockTimePeriods: TimePeriod[] = [
  {
    id: 'period-1',
    type: 'time_period',
    value: {
      label: '2023',
      date_from: '2023-01-01',
      date_to: '2023-12-31',
    },
  },
  {
    id: 'period-2',
    type: 'time_period',
    value: {
      label: '2024',
      date_from: '2024-01-01',
      date_to: '2024-12-31',
    },
  },
]

export const mockGeographyFilters: GeographyFilters = {
  geography_types: [
    {
      id: 'nation',
      type: 'geography_filter',
      value: {
        label: 'Nation',
        geography_type: 'Nation',
        colour: 'COLOUR_1_DARK_BLUE',
      },
    },
  ],
}
