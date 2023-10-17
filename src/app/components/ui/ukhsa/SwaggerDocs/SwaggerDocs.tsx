'use client'
import 'swagger-ui-react/swagger-ui.css'

import SwaggerUI from 'swagger-ui-react'

const SwaggerDocs = () => {
  return (
    <>
      <SwaggerUI url="https://api.dev.ukhsa-dashboard.data.gov.uk/api/schema/" />
    </>
  )
}

export default SwaggerDocs
