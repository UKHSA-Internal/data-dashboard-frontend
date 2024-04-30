import { View } from '@/app/components/ui/ukhsa'

export async function generateMetadata() {
  return {
    title: 'Weather health alert page',
    description: 'Weather health alert description',
  }
}

export default async function Alert() {
  return (
    <View heading="Weather alert for East Midlands">
      <div>Weather health alert info page</div>
    </View>
  )
}
