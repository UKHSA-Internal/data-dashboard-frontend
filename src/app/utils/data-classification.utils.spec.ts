import {
  DATA_CLASSIFICATION_LABELS,
  DATA_CLASSIFICATIONS,
  type DataClassification,
  DEFAULT_DATA_CLASSIFICATION,
} from '@/api/models/DataClassification'

import { getDataClassificationLabel, getWatermarkFlags } from './data-classification.utils'

describe('data-classification.utils', () => {
  describe('getDataClassificationLabel', () => {
    test('uses the default classification label when classification is omitted', () => {
      expect(getDataClassificationLabel()).toBe(DATA_CLASSIFICATION_LABELS[DEFAULT_DATA_CLASSIFICATION])
    })

    test.each(Object.entries(DATA_CLASSIFICATION_LABELS) as Array<[DataClassification, string]>)(
      'returns the expected label for %s',
      (classification, expectedLabel) => {
        expect(getDataClassificationLabel(classification)).toBe(expectedLabel)
      }
    )
  })

  describe('getWatermarkFlags', () => {
    test('returns an empty object when isNonPublic is false', () => {
      expect(getWatermarkFlags(false, 'secret')).toEqual({})
    })

    test('returns an empty object when isNonPublic is undefined', () => {
      expect(getWatermarkFlags(undefined, 'secret')).toEqual({})
    })

    test.each(DATA_CLASSIFICATIONS)('returns non-public flags with provided classification: %s', (classification) => {
      expect(getWatermarkFlags(true, classification)).toEqual({
        is_public: false,
        data_classification: classification,
      })
    })

    test('defaults classification when isNonPublic is true and classification is undefined', () => {
      expect(getWatermarkFlags(true, undefined)).toEqual({
        is_public: false,
        data_classification: DEFAULT_DATA_CLASSIFICATION,
      })
    })
  })
})
