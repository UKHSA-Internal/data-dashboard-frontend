import { sendGTMEvent } from '@next/third-parties/google'

/**
 * Fire a google analytics tracking event
 */
export function gaTrack(event: string, value: string) {
  console.log(`firing GA event: ${event} ${value}`)

  sendGTMEvent({ event, value })
}
