import { View } from '@/app/components/ui/ukhsa'

export async function generateMetadata() {
  return {
    title: 'Health alerts page',
    description: 'Health alerts page description',
  }
}

export default async function WeatherHealthAlert() {
  return (
    <View heading="Health alerts">
      <div>Health alerts page</div>
    </View>
  )
}
