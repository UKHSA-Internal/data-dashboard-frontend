import { render } from '@/config/test-utils'

import { ColdHealthAlertAmberIcon } from './ColdHealthAlertsAmber'
import { ColdHealthAlertGreenIcon } from './ColdHealthAlertsGreen'
import { ColdHealthAlertRedIcon } from './ColdHealthAlertsRed'
import { ColdHealthAlertYellowIcon } from './ColdHealthAlertsYellow'
import { HeatHealthAlertAmberIcon } from './HeatHealthAlertsAmber'
import { HeatHealthAlertGreenIcon } from './HeatHealthAlertsGreen'
import { HeatHealthAlertRedIcon } from './HeatHealthAlertsRed'
import { HeatHealthAlertYellowIcon } from './HeatHealthAlertsYellow'

const icons = [
  HeatHealthAlertGreenIcon,
  HeatHealthAlertYellowIcon,
  HeatHealthAlertAmberIcon,
  HeatHealthAlertRedIcon,
  ColdHealthAlertGreenIcon,
  ColdHealthAlertYellowIcon,
  ColdHealthAlertAmberIcon,
  ColdHealthAlertRedIcon,
]

describe.each(icons)('Checks icons match snapshots', (icon) => {
  test(`${icon.name} matches expected snapshot`, async () => {
    const { container } = render(await icon())

    expect(container).toMatchSnapshot()
  })
})
