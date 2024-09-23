'use client'

import { AwsRum, type AwsRumConfig } from 'aws-rum-web'
import { useEffect } from 'react'

import { logger } from '@/lib/logger'

interface AWSRumProps {
  applicationId: string
  identityPoolId: string
}

export function AWSRum({ applicationId, identityPoolId }: AWSRumProps) {
  useEffect(() => {
    try {
      if (!applicationId || !identityPoolId) {
        return
      }

      const config: AwsRumConfig = {
        sessionSampleRate: 1,
        identityPoolId,
        endpoint: 'https://dataplane.rum.eu-west-2.amazonaws.com',
        telemetries: ['errors', 'performance', 'http'],
        allowCookies: false,
        enableXRay: false,
      }

      const APPLICATION_ID: string = applicationId
      const APPLICATION_VERSION: string = '1.0.0'
      const APPLICATION_REGION: string = 'eu-west-2'

      new AwsRum(APPLICATION_ID, APPLICATION_VERSION, APPLICATION_REGION, config)
    } catch (error) {
      logger.error(error)
    }
  }, [applicationId, identityPoolId])
  return null
}
