import { render } from '@/config/test-utils'

import { ColdHealthAlertAmberIcon } from './ColdHealthAlertsAmber'
import { ColdHealthAlertGreenIcon } from './ColdHealthAlertsGreen'
import { ColdHealthAlertRedIcon } from './ColdHealthAlertsRed'
import { ColdHealthAlertYellowIcon } from './ColdHealthAlertsYellow'
import ExitMap from './ExitMap'
import { HeatHealthAlertAmberIcon } from './HeatHealthAlertsAmber'
import { HeatHealthAlertGreenIcon } from './HeatHealthAlertsGreen'
import { HeatHealthAlertRedIcon } from './HeatHealthAlertsRed'
import { HeatHealthAlertYellowIcon } from './HeatHealthAlertsYellow'
import LeftArrow from './LeftArrow'
import RightArrowCircle from './RightArrowCircle'

const weatherHeathAlertIcons = [
  HeatHealthAlertGreenIcon,
  HeatHealthAlertYellowIcon,
  HeatHealthAlertAmberIcon,
  HeatHealthAlertRedIcon,
  ColdHealthAlertGreenIcon,
  ColdHealthAlertYellowIcon,
  ColdHealthAlertAmberIcon,
  ColdHealthAlertRedIcon,
  ExitMap,
]

const miscIcons = [LeftArrow, RightArrowCircle]

const icons = [...weatherHeathAlertIcons, ...miscIcons]

describe.each(icons)('Checks icons match snapshots', (icon) => {
  test(`${icon.name} matches expected snapshot`, async () => {
    const { container } = render(await icon())

    expect(container).toMatchSnapshot()
  })
})
