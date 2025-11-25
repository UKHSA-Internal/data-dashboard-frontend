declare const window: Window & { dataLayer: Record<string, unknown>[] }

export function gtag(event: string, data: Record<string, unknown>): void {
  if (typeof window !== 'undefined' && Array.isArray(window.dataLayer)) {
    window.dataLayer.push({
      event,
      ...data,
    })
  }
}

export const pageView = (url: string) => gtag('page_view', { page: url })
