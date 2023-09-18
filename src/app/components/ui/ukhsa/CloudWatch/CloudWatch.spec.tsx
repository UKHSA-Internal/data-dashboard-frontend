import * as AwsRumWeb from 'aws-rum-web'
import React from 'react'

import { render } from '@/config/test-utils'

import { CloudWatch } from './CloudWatch'

jest.mock('aws-rum-web', () => ({
  AwsRum: jest.fn(),
}))

test('Initializes AWS RUM with the correct configuration', () => {
  render(<CloudWatch />)

  expect(AwsRumWeb.AwsRum).toHaveBeenCalledWith(
    process.env.NEXT_PUBLIC_RUM_APPLICATON_ID,
    '1.0.0',
    'eu-west-2',
    expect.objectContaining({
      sessionSampleRate: 1,
      guestRoleArn: process.env.NEXT_PUBLIC_RUM_GUEST_ROLE_ARN,
      identityPoolId: process.env.NEXT_PUBLIC_RUM_IDENTITY_POOL_ID,
      endpoint: 'https://dataplane.rum.eu-west-2.amazonaws.com',
      telemetries: ['performance', 'errors', 'http'],
      allowCookies: true,
      enableXRay: false,
    })
  )
})
