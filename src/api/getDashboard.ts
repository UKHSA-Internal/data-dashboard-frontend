import { DashboardResponse } from '@/mocks/api/dashboard'

export const getDashboard = async (): Promise<DashboardResponse> => {
  const req = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/dashboard`)
  const res = await req.json()
  return res
}
