import Link from 'next/link'

import { View } from '@/app/components/ui/ukhsa'

export default async function CookiePolicy() {
  return (
    <View heading={'Cookie Policy'}>
      <Link href="?change-settings=1">Change settings</Link>
    </View>
  )
}
