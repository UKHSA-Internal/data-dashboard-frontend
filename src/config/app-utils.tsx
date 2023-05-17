/**
 * Util function to get the revalidate value for NextJs getStaticProps
 * Passing 'false' will disable revalidation altogether and return
 * a stale version of the initial built page to all users.
 */
export const getStaticPropsRevalidateValue = () => {
  if (process.env.NEXT_REVALIDATE_TIME === 'false') {
    return false
  }

  return Number(process.env.NEXT_REVALIDATE_TIME)
}
