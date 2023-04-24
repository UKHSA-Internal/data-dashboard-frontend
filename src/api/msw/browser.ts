import { setupWorker } from 'msw'

// Currently we do not have any browser handlers setup as
// all of our MSW handlers are interacted with server side.
export const worker = setupWorker(...[])
