import { parseAsInteger, useQueryState } from 'nuqs'
import { useDebounceCallback, useEventListener } from 'usehooks-ts'

import { mapQueryKeys } from '@/app/constants/map.constants'

interface ChoroplethKeyboardEvents {
  /**
   * A regular expression defining the keys that are allowed to trigger the selection.
   */
  allowedKeys: RegExp
}

/**
 * Handles keyboard events for our custom choropleth layer.
 * This component listens for keyboard events and updates the selected feature ID based on the keys pressed.
 */

export default function ChoroplethKeyboardEvents({ allowedKeys }: ChoroplethKeyboardEvents) {
  const [, setSelectedFeatureId] = useQueryState(mapQueryKeys.featureId, parseAsInteger)

  const debouncedSetSelectedFeatureId = useDebounceCallback(setSelectedFeatureId, 200)

  useEventListener('keydown', (event) => {
    if (allowedKeys.test(event.key)) {
      debouncedSetSelectedFeatureId(Number(event.key))
    }
  })

  return null
}
