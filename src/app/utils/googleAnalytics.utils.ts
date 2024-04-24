import ReactGA from 'react-ga4'

/**
 * Fire a google analytics tracking event
 */
export function gaTrack(category: string, action: string, label: string) {
  console.log(`firing GA event: ${category} ${action} ${label}`)

  ReactGA.event({ category, action, label })
}
