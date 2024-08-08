import { Request, Response } from 'express'

import { type Response as Menu } from '@/api/requests/menus/getMenu'
import { getSwitchBoardState } from '@/app/(fullWidth)/switchboard/shared/state'
import { logger } from '@/lib/logger'

import { megaMenu } from './fixtures/mega-menu'
import { sideMenu } from './fixtures/side-menu'

export default async function handler(req: Request, res: Response) {
  try {
    if (req.method !== 'GET') {
      logger.error(`Unsupported request method ${req.method}`)
      return res.status(405)
    }

    const {
      api: { menus },
    } = getSwitchBoardState(req.headers.cookie)

    const { status, scenario } = menus

    if (scenario === 'SideMenu') {
      return res.status(status).send(sideMenu)
    }

    if (scenario === 'MegaMenu') {
      return res.status(status).send(megaMenu)
    }

    const inactiveMenu: Menu = {
      active_menu: null,
    }

    return res.status(status).send(inactiveMenu)
  } catch (error) {
    logger.error(error)
    return res.status(500)
  }
}
