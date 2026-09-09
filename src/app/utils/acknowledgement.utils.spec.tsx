import {
  ACKNOWLEDGEMENT_STORAGE_KEY,
  clearAcknowledgementMarker,
  hasAcknowledgementMarker,
  setAcknowledgementMarker,
} from './acknowledgement.utils'

describe('acknowledgement utils', () => {
  beforeEach(() => {
    localStorage.clear()
    jest.useFakeTimers().setSystemTime(new Date('2026-07-09T12:00:00.000Z'))
  })

  afterEach(() => {
    jest.useRealTimers()
  })

  describe('ackowledgement marker', () => {
    it('sets an accepted marker with an ISO timestamp', () => {
      setAcknowledgementMarker()

      expect(localStorage.getItem(ACKNOWLEDGEMENT_STORAGE_KEY)).toEqual(
        JSON.stringify({
          accepted: true,
          acceptedAt: '2026-07-09T12:00:00.000Z',
        })
      )
    })

    it('detects a valid marker', () => {
      localStorage.setItem(
        ACKNOWLEDGEMENT_STORAGE_KEY,
        JSON.stringify({
          accepted: true,
          acceptedAt: '2026-07-09T12:00:00.000Z',
        })
      )

      expect(hasAcknowledgementMarker()).toBe(true)
    })

    it('rejects missing, invalid or unaccepted markers', () => {
      expect(hasAcknowledgementMarker()).toBe(false)

      localStorage.setItem(ACKNOWLEDGEMENT_STORAGE_KEY, 'not json')
      expect(hasAcknowledgementMarker()).toBe(false)

      localStorage.setItem(ACKNOWLEDGEMENT_STORAGE_KEY, JSON.stringify({ accepted: false }))
      expect(hasAcknowledgementMarker()).toBe(false)
    })

    it('clears the marker', () => {
      setAcknowledgementMarker()
      clearAcknowledgementMarker()

      expect(localStorage.getItem(ACKNOWLEDGEMENT_STORAGE_KEY)).toBeNull()
    })
  })
})
