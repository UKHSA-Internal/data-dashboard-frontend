export const serializeJsonDownload = (response: unknown) =>
  typeof response === 'string' ? response : JSON.stringify(response)
