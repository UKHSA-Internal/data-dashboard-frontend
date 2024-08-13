import { AwsRum } from 'aws-rum-web'

import { render } from '@/config/test-utils'
import { logger } from '@/lib/logger'

import { AWSRum } from './AWSRum'

jest.mock('aws-rum-web', () => ({
  AwsRum: jest.fn(),
}))

describe('AWSRum', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  test('should initialise AwsRum with correct parameters when props are provided', () => {
    const applicationId = 'test-app-id'
    const identityPoolId = 'test-identity-pool-id'

    render(<AWSRum applicationId={applicationId} identityPoolId={identityPoolId} />)

    expect(AwsRum).toHaveBeenCalledWith('test-app-id', '1.0.0', 'eu-west-2', {
      sessionSampleRate: 1,
      identityPoolId: 'test-identity-pool-id',
      endpoint: 'https://dataplane.rum.eu-west-2.amazonaws.com',
      telemetries: ['errors', 'performance', 'http'],
      allowCookies: false,
      enableXRay: false,
    })
  })

  test('should not initialise AwsRum if applicationId is not provided', () => {
    const applicationId = ''
    const identityPoolId = 'test-identity-pool-id'

    render(<AWSRum applicationId={applicationId} identityPoolId={identityPoolId} />)

    expect(AwsRum).not.toHaveBeenCalled()
  })

  test('should not initialise AwsRum if identityPoolId is not provided', () => {
    const applicationId = 'test-app-id'
    const identityPoolId = ''

    render(<AWSRum applicationId={applicationId} identityPoolId={identityPoolId} />)

    expect(AwsRum).not.toHaveBeenCalled()
  })

  test('should log an error if an exception is thrown', () => {
    const applicationId = 'test-app-id'
    const identityPoolId = 'test-identity-pool-id'

    ;(AwsRum as jest.Mock).mockImplementation(() => {
      throw new Error('Test error')
    })

    render(<AWSRum applicationId={applicationId} identityPoolId={identityPoolId} />)

    expect(logger.error).toHaveBeenCalledWith(new Error('Test error'))
  })
})
