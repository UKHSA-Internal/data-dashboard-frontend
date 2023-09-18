'use client'

// eslint-disable-next-line import/named
import { AwsRum, AwsRumConfig } from 'aws-rum-web'
import { useEffect } from 'react'

export const CloudWatch = () => {
  useEffect(() => {
    try {
      const config: AwsRumConfig = {
        sessionSampleRate: 1,
        guestRoleArn: process.env.NEXT_PUBLIC_RUM_GUEST_ROLE_ARN,
        identityPoolId: process.env.NEXT_PUBLIC_RUM_IDENTITY_POOL_ID,
        endpoint: 'https://dataplane.rum.eu-west-2.amazonaws.com',
        telemetries: ['performance', 'errors', 'http'],
        allowCookies: true,
        enableXRay: false,
      }

      const APPLICATION_ID = process.env.NEXT_PUBLIC_RUM_APPLICATON_ID
      const APPLICATION_VERSION = '1.0.0'
      const APPLICATION_REGION = 'eu-west-2'

      new AwsRum(APPLICATION_ID, APPLICATION_VERSION, APPLICATION_REGION, config)
    } catch (error) {
      // Ignore errors thrown during CloudWatch RUM web client initialization
    }
  }, [])

  return null
}
