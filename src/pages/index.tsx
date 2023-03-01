import { H1 } from 'govuk-react'
import Link from 'next/link'

export default function Home() {
  return (
    <>
      <H1>Respiratory viruses in England</H1>
      <Link href="viruses/sars-cov-2">SARS-CoV-2</Link>
    </>
  )
}
