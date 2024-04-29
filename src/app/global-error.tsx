'use client'

import Error from './(fullWidth)/error/page'

export default function GlobalError({ error }: { error: Error }) {
  console.error('Global error page: ', error)
  return (
    <html lang="en">
      <body>
        <Error />
      </body>
    </html>
  )
}
