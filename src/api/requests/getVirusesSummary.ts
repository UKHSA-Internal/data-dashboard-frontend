type Virus = {
  name: string
  description: string
  points: Array<{ date: string; value: number }>
}

type Viruses = Virus[]

export type VirusesResponse = {
  viruses: Viruses
}

type GetVirusesSummaryParams = {
  searchTerm: string | undefined
}

export const getVirusesSummary = async ({
  searchTerm,
}: GetVirusesSummaryParams): Promise<VirusesResponse> => {
  const searchParams = new URLSearchParams()

  if (searchTerm) searchParams.set('searchTerm', encodeURIComponent(searchTerm))

  const req = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/viruses?${searchParams.toString()}`
  )
  const res = await req.json()

  return res
}
