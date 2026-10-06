import {
  AdminCreateUserCommand,
  AdminSetUserPasswordCommand,
  CognitoIdentityProviderClient,
  CreateUserPoolClientCommand,
  CreateUserPoolCommand,
  InitiateAuthCommand,
} from '@aws-sdk/client-cognito-identity-provider'
import { viewports } from 'e2e/constants/viewports.constants'

import { test } from '../../fixtures/app.fixture.non.public'

const cognito = new CognitoIdentityProviderClient({
  region: 'eu-west-2',
  endpoint: 'http://localhost:4566',
  credentials: { accessKeyId: 'test', secretAccessKey: 'test' }, // LocalStack accepts any values
})

const respiratoryTopicPages = [
  {
    name: 'COVID-19',
    path: '/respiratory-viruses/covid-19',
    heading: 'COVID-19',
  },
  {
    name: 'Influenza',
    path: '/respiratory-viruses/influenza',
    heading: 'Influenza',
  },
  {
    name: 'Other respiratory viruses',
    path: '/respiratory-viruses/other-respiratory-viruses',
    heading: 'Other respiratory viruses',
  },
]

test.describe('Respiratory topic pages - non-public @non-public', () => {
  test.use({ viewport: viewports.desktop })

  for (const topicPage of respiratoryTopicPages) {
    test(`${topicPage.name} shows the classification banner`, async ({ app, authEnabled, page, switchboardPage }) => {
      // Reason: All tests here are only relevant when auth has been enabled
      test.skip(!authEnabled, 'Skipped: AUTH_ENABLED is false')

      await switchboardPage.setTopicPageIsPublic(false)
      await page.goto(topicPage.path)

      await app.hasHeading(topicPage.heading)
      await app.hasClassificationBanner()
      await app.checkClassificationBannerContent()
    })
  }
})

test.describe('Testing localstack cognito - non-public @non-public', () => {
  test('can create a user and sign in against LocalStack Cognito', async () => {
    // Unique names so parallel runs / retries never clash
    const suffix = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`
    const username = `user-${suffix}@example.com`
    const password = 'Sup3r-Secret-Pass!'

    // Create a user pool
    const { UserPool } = await cognito.send(new CreateUserPoolCommand({ PoolName: `e2e-pool-${suffix}` }))
    expect(UserPool?.Id).toBeTruthy()

    // Create an app client that allows username/password auth
    const { UserPoolClient } = await cognito.send(
      new CreateUserPoolClientCommand({
        UserPoolId: UserPool!.Id!,
        ClientName: `e2e-client-${suffix}`,
        ExplicitAuthFlows: ['ALLOW_USER_PASSWORD_AUTH', 'ALLOW_REFRESH_TOKEN_AUTH'],
      })
    )
    expect(UserPoolClient?.ClientId).toBeTruthy()

    // Create a user with a permanent password
    await cognito.send(
      new AdminCreateUserCommand({
        UserPoolId: UserPool!.Id!,
        Username: username,
        MessageAction: 'SUPPRESS',
      })
    )
    await cognito.send(
      new AdminSetUserPasswordCommand({
        UserPoolId: UserPool!.Id!,
        Username: username,
        Password: password,
        Permanent: true,
      })
    )

    // Sign in and check we get tokens back
    const auth = await cognito.send(
      new InitiateAuthCommand({
        ClientId: UserPoolClient!.ClientId!,
        AuthFlow: 'USER_PASSWORD_AUTH',
        AuthParameters: { USERNAME: username, PASSWORD: password },
      })
    )

    expect(auth.AuthenticationResult?.AccessToken).toBeTruthy()
    expect(auth.AuthenticationResult?.IdToken).toBeTruthy()
  })
})
