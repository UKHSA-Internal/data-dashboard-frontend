import { getSearchParams } from './getSearchParams'

/**
 * Determines if a complete area selection is made in a Next.js Server component.
 *
 * This function uses `getSearchParams` to extract 'areaType' and 'areaName' from URL search parameters.
 * It returns these values only if both are present, indicating a valid area selection.
 *
 * @example
 * ```typescript
 * const [selectedAreaType, selectedAreaName] = getAreaSelector();
 * if (selectedAreaType && selectedAreaName) {
 *   // Execute logic for a valid area selection
 * }
 * ```
 *
 * @returns An array containing 'areaType' and 'areaName' if both are present, otherwise nulls.
 */

export const getAreaSelector = async () => {
  const searchParams = await getSearchParams()

  const areaType = searchParams.get('areaType')
  const areaName = searchParams.get('areaName')

  const hasSelectedArea = areaType && areaName

  return [hasSelectedArea && areaType, hasSelectedArea && areaName]
}
