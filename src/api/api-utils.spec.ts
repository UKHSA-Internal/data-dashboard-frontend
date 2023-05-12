import { isRejected, isFulfilled } from './api-utils'

test('isRejected type guard', async () => {
  const [resolvedPromise, rejectedPromise] = await Promise.allSettled([Promise.resolve(null), Promise.reject(null)])
  expect(isRejected(rejectedPromise)).toBeTruthy()
  expect(isRejected(resolvedPromise)).toBeFalsy()
})

test('isFulfilled type guard', async () => {
  const [resolvedPromise, rejectedPromise] = await Promise.allSettled([Promise.resolve(null), Promise.reject(null)])
  expect(isFulfilled(resolvedPromise)).toBeTruthy()
  expect(isFulfilled(rejectedPromise)).toBeFalsy()
})
