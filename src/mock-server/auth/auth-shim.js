export const handlers = {
  GET: async () => new Response('Mock GET handler'),
  POST: async () => new Response('Mock POST handler'),
}

export const signIn = async () => console.log('Mock signIn called')
export const signOut = async () => console.log('Mock signOut called')

export const auth = async () => {
  return {
    user: {
      name: 'Mock User',
      email: 'mock@user.com',
    },
    expires: new Date(Date.now() + 86400 * 1000).toISOString(),
    accessToken: 'mock-access-token',
    refreshToken: 'mock-refresh-token',
    userId: 'mock-user-123',
  }
}

const NextAuthMock = () => ({
  handlers,
  signIn,
  signOut,
  auth,
})

export default NextAuthMock
