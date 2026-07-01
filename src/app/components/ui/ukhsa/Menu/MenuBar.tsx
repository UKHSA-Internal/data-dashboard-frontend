import { getMenu } from '@/api/requests/menus/getMenu'
import { auth } from '@/auth'

import MenuBarContent from './MenuBarContent'

export async function MenuBar() {
  const [menu, session] = await Promise.all([getMenu(), auth()])
  const items = menu?.data?.active_menu ?? []
  const isSignedIn = Boolean(session?.user?.name || session?.user?.email)

  if (items.length === 0) {
    return null
  }

  return <MenuBarContent items={items} isSignedIn={isSignedIn} />
}

export default MenuBar
