import { Request, Response } from 'express'

import { type Response as Menu } from '@/api/requests/menus/getMenu'
import { getSwitchBoardState } from '@/app/(pages)/switchboard/shared/state'
import { UKHSA_SWITCHBOARD_COOKIE_NAME } from '@/app/constants/app.constants'
import { logger } from '@/lib/logger'

import { megaMenu } from './fixtures/mega-menu'

export default async function handler(req: Request, res: Response) {
  try {
    if (req.method !== 'GET') {
      logger.error(`Unsupported request method ${req.method}`)
      return res.status(405)
    }

    const {
      api: { menus },
    } = getSwitchBoardState(req.cookies[UKHSA_SWITCHBOARD_COOKIE_NAME])

    const { status, scenario } = menus

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
