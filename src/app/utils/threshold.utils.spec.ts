import { ThresholdFilter } from '@/api/models/cms/Page/GlobalFilter'

import { mapThresholdsToMetricValueRanges, MetricValueRange } from './threshold.utils'

describe('threshold-utils', () => {
  test('maps single threshold to metric value range with integer boundaries', () => {
    const thresholds: ThresholdFilter[] = [
      {
        type: 'threshold',
        value: {
          label: 'Under 80%',
          colour: 'MAP_COLOUR_1_LIGHT_YELLOW',
          boundary_minimum_value: 0,
          boundary_maximum_value: 80,
        },
        id: 'test-id-1',
      },
    ]

    const result = mapThresholdsToMetricValueRanges(thresholds)
    const expected: MetricValueRange[] = [{ start: '0', end: '80' }]

    expect(result).toEqual(expected)
  })

  test('maps multiple thresholds to metric value ranges', () => {
    const thresholds: ThresholdFilter[] = [
      {
        type: 'threshold',
        value: {
          label: 'Under 80%',
          colour: 'MAP_COLOUR_1_LIGHT_YELLOW',
          boundary_minimum_value: 0,
          boundary_maximum_value: 80.99,
        },
        id: 'test-id-1',
      },
      {
        type: 'threshold',
        value: {
          label: '85-90%',
          colour: 'MAP_COLOUR_3_TURQUOISE',
          boundary_minimum_value: 86,
          boundary_maximum_value: 90.99,
        },
        id: 'test-id-2',
      },
    ]

    const result = mapThresholdsToMetricValueRanges(thresholds)
    const expected: MetricValueRange[] = [
      { start: '0', end: '80.99' },
      { start: '86', end: '90.99' },
    ]

    expect(result).toEqual(expected)
  })

  test('maps thresholds with decimal boundary values to string representations', () => {
    const thresholds: ThresholdFilter[] = [
      {
        type: 'threshold',
        value: {
          label: 'Mid range',
          colour: 'MAP_COLOUR_2_GREEN',
          boundary_minimum_value: 25.5,
          boundary_maximum_value: 75.75,
        },
        id: 'test-id-decimal',
      },
    ]

    const result = mapThresholdsToMetricValueRanges(thresholds)
    const expected: MetricValueRange[] = [{ start: '25.5', end: '75.75' }]

    expect(result).toEqual(expected)
  })

  test('maps thresholds with zero boundary values correctly', () => {
    const thresholds: ThresholdFilter[] = [
      {
        type: 'threshold',
        value: {
          label: 'Zero range',
          colour: 'MAP_COLOUR_4_RED',
          boundary_minimum_value: 0,
          boundary_maximum_value: 0,
        },
        id: 'test-id-zero',
      },
    ]

    const result = mapThresholdsToMetricValueRanges(thresholds)
    const expected: MetricValueRange[] = [{ start: '0', end: '0' }]

    expect(result).toEqual(expected)
  })

  test('maps thresholds with negative boundary values to string representations', () => {
    const thresholds: ThresholdFilter[] = [
      {
        type: 'threshold',
        value: {
          label: 'Negative range',
          colour: 'MAP_COLOUR_5_BLUE',
          boundary_minimum_value: -10.5,
          boundary_maximum_value: -5.25,
        },
        id: 'test-id-negative',
      },
    ]

    const result = mapThresholdsToMetricValueRanges(thresholds)
    const expected: MetricValueRange[] = [{ start: '-10.5', end: '-5.25' }]

    expect(result).toEqual(expected)
  })

  test('returns empty array when given empty thresholds array', () => {
    const thresholds: ThresholdFilter[] = []

    const result = mapThresholdsToMetricValueRanges(thresholds)
    const expected: MetricValueRange[] = []

    expect(result).toEqual(expected)
  })

  test('maps thresholds with large boundary values to string representations', () => {
    const thresholds: ThresholdFilter[] = [
      {
        type: 'threshold',
        value: {
          label: 'Large numbers',
          colour: 'MAP_COLOUR_1_LIGHT_YELLOW',
          boundary_minimum_value: 1000000,
          boundary_maximum_value: 9999999.99,
        },
        id: 'test-id-large',
      },
    ]

    const result = mapThresholdsToMetricValueRanges(thresholds)
    const expected: MetricValueRange[] = [{ start: '1000000', end: '9999999.99' }]

    expect(result).toEqual(expected)
  })
})
