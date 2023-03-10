type RelatedLink = {
  title: string
  description: string
  link: string
}

export type RelatedLinksResponse = RelatedLink[]

export const getRelatedLinks = async (): Promise<RelatedLinksResponse> => {
  const req = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/related-links`)
  const res = await req.json()
  return res
}
