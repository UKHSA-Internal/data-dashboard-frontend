import { data as mockVirusesData, VirusesResponse } from '@/mocks/api/viruses'
import { GetStaticPaths, GetStaticProps } from 'next'
import { useRouter } from 'next/router'

export default function Virus() {
  const router = useRouter()
  const { id } = router.query
  return <p>Virus: {id}</p>
}

export const getStaticProps: GetStaticProps<{
  viruses: VirusesResponse
}> = async () => {
  // Here we will make an API request to retrieve a list of viruses to pre-generate the pages
  // For now, we can use mocked json data
  return {
    props: {
      viruses: mockVirusesData,
    },
    revalidate: 10,
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  // Here we will make an API request to retrieve a list of viruses to pre-generate the pages
  // For now, we can use mocked json data
  const { viruses } = mockVirusesData

  // Get the paths we want to pre-render based on viruses
  const paths = viruses.map(({ name }) => ({
    params: { id: name.toLowerCase() },
  }))

  // We'll pre-render only these paths at build time.
  // { fallback: 'blocking' } will server-render pages
  // on-demand if the path doesn't exist.
  return { paths, fallback: 'blocking' }
}
