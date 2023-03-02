import { initMocks } from '@/mocks'
import { VirusesResponse } from '@/mocks/api/viruses'
import { GridCol, GridRow, H1, H3, Paragraph } from 'govuk-react'
import { GetStaticProps, InferGetStaticPropsType } from 'next'
import Link from 'next/link'

type HomeProps = InferGetStaticPropsType<typeof getStaticProps>

export default function Home({ viruses: { viruses } }: HomeProps) {
  return (
    <>
      <H1>Respiratory viruses in England</H1>

      <GridRow>
        {viruses.map(({ name, description }) => {
          return (
            <GridCol key={name}>
              <Link href={`viruses/${name.toLowerCase()}`}>
                <H3>{name}</H3>
              </Link>
              <Paragraph>{description}</Paragraph>
            </GridCol>
          )
        })}
      </GridRow>
    </>
  )
}

export const getStaticProps: GetStaticProps<{
  viruses: VirusesResponse
}> = async () => {
  if (process.env.NEXT_PUBLIC_API_MOCKING === 'enabled') {
    await initMocks()
  }

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/viruses`)
  const viruses: VirusesResponse = await res.json()

  return {
    props: {
      viruses,
    },
    revalidate: 10,
  }
}
