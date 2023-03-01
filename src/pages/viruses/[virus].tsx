import { useRouter } from 'next/router'

const Virus = () => {
  const router = useRouter()
  const { virus } = router.query
  return <p>Virus: {virus}</p>
}

export default Virus
