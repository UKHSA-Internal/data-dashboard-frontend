'use client'

import Error from './(pages)/error/page'

export default function GlobalError({ error }: { error: Error }) {
  console.error('Global error page: ', error)
  return (
    <html>
      <body>
        <Error />
      </body>
    </html>
  )
}
