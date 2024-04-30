import { View } from '@/app/components/ui/ukhsa'

export async function generateMetadata() {
  return {
    title: 'Extreme events category page',
    description: 'Extreme events category page description',
  }
}

export default async function ExtremeEvents() {
  return (
    <View heading="Extreme events">
      <div>Extreme events parent page</div>
    </View>
  )
}
