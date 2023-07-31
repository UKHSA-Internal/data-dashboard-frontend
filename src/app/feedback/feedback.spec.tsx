// import { GetStaticPropsContext } from 'next'
// import mockRouter from 'next-router-mock'

// import Feedback from '@/app/feedback/page'
// import { render, screen, within } from '@/config/test-utils'

// jest.mock('next/router', () => require('next-router-mock'))

// test('Questions showing correctly', async () => {
//   // const { props } = (await getStaticProps({ locale: 'en' } as GetStaticPropsContext)) as {
//   //   props: Record<string, never>
//   // }

//   // render(Feedback.getLayout(<Feedback {...props} />))

//   expect(screen.getByRole('heading', { name: 'UKHSA data dashboard feedback', level: 1 })).toBeInTheDocument()
//   expect(
//     screen.getByRole('heading', { name: 'What was your reason for visiting the dashboard today?', level: 2 })
//   ).toBeInTheDocument()
//   expect(
//     screen.getByRole('heading', { name: 'Did you find everything you were looking for?', level: 2 })
//   ).toBeInTheDocument()
//   expect(
//     screen.getByRole('heading', { name: 'How could we improve your experience with the dashboard?', level: 2 })
//   ).toBeInTheDocument()
//   expect(
//     screen.getByRole('heading', { name: 'What would you like to see on the dashboard in the future?', level: 2 })
//   ).toBeInTheDocument()

//   expect(screen.getByRole('link', { name: 'Return to home page' })).toHaveAttribute('href', '/')
// })

// test('Shows an error after the api redirects with a generic server error', async () => {
//   mockRouter.push('feedback/?error=1')

//   const { props } = (await getStaticProps({ locale: 'en' } as GetStaticPropsContext)) as {
//     props: Record<string, never>
//   }

//   const { getByRole } = render(Feedback.getLayout(<Feedback {...props} />))

//   const alert = getByRole('alert')
//   expect(alert).toBeInTheDocument()
//   expect(within(alert).getByRole('heading', { name: 'There is a problem', level: 2 })).toBeInTheDocument()
//   expect(
//     within(alert).getByText('There was a problem processing the request. Please try again later.')
//   ).toBeInTheDocument()
// })
