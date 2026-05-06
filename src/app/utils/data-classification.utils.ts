import {
  DATA_CLASSIFICATION_LABELS,
  type DataClassification,
  DEFAULT_DATA_CLASSIFICATION,
} from '@/api/models/DataClassification'

/**
 * Get the human-readable label for a data classification value.
 * Defaults to the label of "official_sensitive" which is "OFFICIAL-SENSITIVE".
 */
export const getDataClassificationLabel = (classification: DataClassification = DEFAULT_DATA_CLASSIFICATION): string =>
  DATA_CLASSIFICATION_LABELS[classification]

/**
 * Get the data classification label to append to a <h3>, eg "OFFICIAL-SENSITIVE".
 */
export const getDataClassificationForHeader = (
  isNonPublic?: boolean,
  dataClassification?: DataClassification
): string => {
  if (!isNonPublic) {
    return ''
  }

  return getDataClassificationLabel(dataClassification ?? DEFAULT_DATA_CLASSIFICATION)
}

/**
 * Get chart watermark flags for non-public pages to use for API requests.
 * This always includes a data classification, defaulting to "official_sensitive"
 * when the page classification is unavailable.
 */
export const getWatermarkFlags = (isNonPublic?: boolean, dataClassification?: DataClassification) => {
  if (!isNonPublic) {
    return {}
  }

  return {
    is_public: false,
    data_classification: dataClassification ?? DEFAULT_DATA_CLASSIFICATION,
  }
}
