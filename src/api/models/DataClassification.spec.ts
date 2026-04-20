import {
  DATA_CLASSIFICATION_COLORS,
  DATA_CLASSIFICATION_LABELS,
  DATA_CLASSIFICATIONS,
  DataClassification,
  DEFAULT_DATA_CLASSIFICATION,
} from './DataClassification'

describe('DataClassification model', () => {
  test('exposes the expected classification values', () => {
    expect(DATA_CLASSIFICATIONS).toEqual([
      'official',
      'official_sensitive',
      'protective_marking_not_set',
      'secret',
      'top_secret',
    ])
  })

  test.each(DATA_CLASSIFICATIONS)('schema accepts classification key: %s', (classification) => {
    expect(DataClassification.parse(classification)).toBe(classification)
  })

  test('schema rejects display labels as classification keys', () => {
    expect(DataClassification.safeParse('OFFICIAL-SENSITIVE').success).toBe(false)
  })

  test('default classification is one of the allowed keys', () => {
    expect(DATA_CLASSIFICATIONS).toContain(DEFAULT_DATA_CLASSIFICATION)
  })

  test('official_sensitive label uses official uppercase-hyphenated wording', () => {
    expect(DATA_CLASSIFICATION_LABELS.official_sensitive).toBe('OFFICIAL-SENSITIVE')
  })

  test('labels are present for all classifications', () => {
    expect(Object.keys(DATA_CLASSIFICATION_LABELS).sort()).toEqual([...DATA_CLASSIFICATIONS].sort())
  })

  test('colors are present for all classifications', () => {
    expect(Object.keys(DATA_CLASSIFICATION_COLORS).sort()).toEqual([...DATA_CLASSIFICATIONS].sort())
  })
})
