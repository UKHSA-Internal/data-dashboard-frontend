'use client'

import { AwsRum, type AwsRumConfig } from 'aws-rum-web'
import { useEffect } from 'react'

export function AWSRum() {
  useEffect(() => {
    try {
      const config: AwsRumConfig = {
        sessionSampleRate: 1,
        identityPoolId: 'eu-west-2:985223c0-a92d-4302-b034-fa188f9c32bb',
        endpoint: 'https://dataplane.rum.eu-west-2.amazonaws.com',
        telemetries: [],
        allowCookies: false,
        enableXRay: false,
      }

      const APPLICATION_ID: string = '6240b016-7075-4750-a3ad-3c3f736ccc28'
      const APPLICATION_VERSION: string = '1.0.0'
      const APPLICATION_REGION: string = 'eu-west-2'

      new AwsRum(APPLICATION_ID, APPLICATION_VERSION, APPLICATION_REGION, config)
    } catch (error) {
      // Ignore errors thrown during CloudWatch RUM web client initialization
    }
  }, [])
  return null
}
