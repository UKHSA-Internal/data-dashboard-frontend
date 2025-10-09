import { MiniMapCard } from '@/app/components/ui/ukhsa/MiniMap/MiniMapCard'

type WeatherHealthAlertCardProps = {
  value: {
    title: string
    sub_title: string
    alert_type: string
  }
}

export function WeatherHealthAlertCard({ value }: WeatherHealthAlertCardProps) {
  return (
    <div className="mb-3 sm:mb-6 lg:mb-0 lg:w-1/2">
      <MiniMapCard title={value.title} subTitle={value.sub_title} alertType={value.alert_type as 'heat' | 'cold'} />
    </div>
  )
}
