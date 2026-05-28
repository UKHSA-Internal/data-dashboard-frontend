import { getMenu } from '@/api/requests/menus/getMenu'

import MenuBarContent from './MenuBarContent'

const isSignedIn = true

export async function MenuBar() {
  const menu = await getMenu()
  const items = menu?.data?.active_menu ?? []

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
  // return <MenuBarContent items={items} />
}

export default MenuBar
