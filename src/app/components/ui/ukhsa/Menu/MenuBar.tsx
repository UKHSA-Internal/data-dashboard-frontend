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

  return (
    <div className="-mt-2 bg-blue" data-testid="ukhsa-menu-bar">
      <nav aria-label="Menu" className="">
        <MenuBarContent items={items} isSignedIn={isSignedIn} />
      </nav>
    </div>
  )
}

export default MenuBar
