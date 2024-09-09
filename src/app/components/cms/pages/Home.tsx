import Link from 'next/link'

import { Card, RelatedLink as RelatedLinkV1, RelatedLinks as RelatedLinksV1, View } from '@/app/components/ui/ukhsa'
import { flags } from '@/app/constants/flags.constants'
import { getHomePage } from '@/app/utils/cms'
import { renderSection } from '@/app/utils/cms.utils'
import { getFeatureFlag } from '@/app/utils/flags.utils'
import { clsx } from '@/lib/clsx'

import { MiniMapCard } from '../../ui/ukhsa/MiniMap/MiniMapCard'
import { ChartRowCard } from '../ChartRowCard/ChartRowCard'
import { Trend } from '../Trend/v2/Trend'

export default async function HomePage() {
  const { enabled: heroEnabled } = await getFeatureFlag(flags.landingPageHero)

  const { title, body, page_description: description, related_links: relatedLinks } = await getHomePage()

  const { enabled: newLandingContentEnabled } = await getFeatureFlag(flags.landingPageContent)
  const { enabled: weatherHealthSummaryCardEnabled } = await getFeatureFlag(flags.weatherHealthSummaryCard)

  return (
    <View heading={heroEnabled ? '' : title} description={heroEnabled ? '' : description} showWelcome={!heroEnabled}>
      {newLandingContentEnabled ? (
        /**
         * New landing page UI for Health topics.
         * This is in progress & still to be hooked up to the CMS in CDD-2156
         */
        <>
          <section className="govuk-!-margin-top-3" data-testid="category" aria-labelledby="category-health-topics">
            <h2 className="govuk-heading-l govuk-!-margin-bottom-4" id="category-health-topics">
              <a className="govuk-link--no-visited-state" href="/topics">
                Health topics
              </a>
            </h2>
            <ChartRowCard>
              <div className={clsx('mb-3 sm:mb-6 lg:mb-0 lg:w-1/2')}>
                <Card
                  asChild
                  aria-labelledby={`chart-row-card-heading-x1`}
                  className="govuk-!-padding-5 ukhsa-chart-card relative flex flex-col bg-[var(--colour-chart-background)] no-underline transition-colors duration-200 ukhsa-focus hover:bg-[var(--colour-chart-background-hover)] focus:bg-[var(--colour-chart-background-hover)]"
                >
                  <Link href="/topics/covid-19">
                    <h3 id="chart-row-card-heading-x1" className="govuk-heading-m mb-1">
                      COVID-19
                    </h3>
                    <p className="govuk-body-s text-grey-1">Positive cases reported</p>

                    <div className="my-3">
                      <svg
                        data-testid="chart-image"
                        xmlns="http://www.w3.org/2000/svg"
                        width="396"
                        height="119"
                        fill="none"
                        className="w-full"
                      >
                        <path
                          stroke="#AB2B17"
                          stroke-width="3"
                          d="M385.152 40.408c-6.831 6.744-11.002 9.991-19.676 13.8-9.43 2.08-14.718 2.493-24.148 0-10.679-3.981-15.12-6.838-22.359-12.163-5.253-6.86-9.838-21.04-15.205-21.966-5.366-.926-5.813 6.539-8.943 7.016-3.131.477-5.814-3.031-9.391-2.573-3.578.459-10.733 15.192-18.335 28.29C261.036 63.252 253.679 79 247.419 79c-6.261 0-5.533-8.982-16.099-12.396-3.808-1.23-5.378-1.392-8.944-2.807-7.022-2.788-9.228-11.821-13.415-12.63-4.187-.809-9.838 5.146-14.757 5.146-4.919 0-5.367-8.187-13.863-8.187-8.497 0-8.638 12.022-17.44 18.478-3.519 2.581-29.962 6.034-37.117 4.686-7.155-1.347-29.067-18.252-36.67-18.72-7.601-.467-7.154 3.743-12.52 3.743-5.367 0-13.416-12.397-21.465-12.397-8.05 0-22.807 4.21-22.807 4.21"
                        />
                        <path
                          fill="#181C1B"
                          d="M30.61 100.51v-6.041h1.124v6.041c0 .562-.115 1.037-.345 1.424-.23.386-.55.681-.955.884-.403.2-.866.299-1.39.299-.523 0-.987-.09-1.394-.269a2.104 2.104 0 0 1-.955-.821c-.23-.367-.345-.83-.345-1.388h1.13c0 .359.067.654.2.884.133.231.316.401.55.51.239.11.51.164.815.164.297 0 .562-.062.797-.187.238-.129.426-.319.562-.569.137-.253.205-.564.205-.931Zm6.755 1.025V96.66h1.09V103h-1.037l-.053-1.465Zm.205-1.336.452-.011c0 .421-.045.812-.135 1.171a2.514 2.514 0 0 1-.422.926 1.988 1.988 0 0 1-.768.615c-.316.145-.7.217-1.154.217-.309 0-.592-.045-.85-.135a1.683 1.683 0 0 1-.656-.416 1.885 1.885 0 0 1-.428-.732 3.531 3.531 0 0 1-.146-1.084v-4.09h1.084v4.102c0 .285.031.521.094.709.066.183.154.33.263.439.114.106.239.18.375.223.14.043.285.064.434.064.46 0 .826-.088 1.096-.263.27-.18.463-.42.58-.721.12-.305.181-.643.181-1.014ZM41.285 94v9h-1.09v-9h1.09Zm2.725 7.711v.873c0 .355-.09.73-.27 1.125a2.71 2.71 0 0 1-.756.996l-.615-.428c.125-.172.23-.347.316-.527.087-.176.15-.359.194-.551.047-.187.07-.387.07-.597v-.891h1.06Zm9.832.398V103h-5.584v-.779l2.795-3.112c.344-.382.61-.707.797-.972.191-.27.324-.51.398-.721.078-.215.117-.434.117-.656 0-.282-.058-.535-.175-.762a1.317 1.317 0 0 0-.505-.55 1.515 1.515 0 0 0-.808-.206c-.379 0-.695.074-.95.223a1.37 1.37 0 0 0-.562.61 2.07 2.07 0 0 0-.187.902h-1.084c0-.48.105-.92.316-1.319.211-.398.524-.715.938-.949.414-.238.924-.357 1.529-.357.539 0 1 .095 1.383.287.383.187.675.453.879.797.207.34.31.738.31 1.195a2.4 2.4 0 0 1-.129.762 3.866 3.866 0 0 1-.345.761 5.905 5.905 0 0 1-.51.75c-.192.246-.397.489-.615.727l-2.285 2.478h4.277Zm6.515-4.054v1.3c0 .7-.062 1.29-.187 1.77s-.305.867-.54 1.16a2.054 2.054 0 0 1-.849.639c-.328.129-.699.193-1.113.193-.328 0-.63-.041-.908-.123a2.165 2.165 0 0 1-.75-.392 2.384 2.384 0 0 1-.563-.715 3.84 3.84 0 0 1-.357-1.067 7.684 7.684 0 0 1-.123-1.464v-1.301c0-.7.062-1.286.187-1.758.13-.473.31-.852.545-1.137.235-.289.516-.496.844-.62a3.14 3.14 0 0 1 1.113-.188c.332 0 .637.04.914.123.282.078.532.205.75.38.22.172.405.403.557.692.156.285.275.635.357 1.049.082.414.123.9.123 1.459Zm-1.09 1.476v-1.658c0-.383-.023-.719-.07-1.008a3.172 3.172 0 0 0-.193-.75 1.483 1.483 0 0 0-.328-.504 1.159 1.159 0 0 0-.451-.28 1.621 1.621 0 0 0-.569-.095c-.258 0-.486.05-.685.147-.2.094-.367.244-.504.451-.133.207-.235.478-.305.814-.07.336-.105.745-.105 1.225v1.658c0 .383.021.721.064 1.014.047.293.115.547.205.762.09.211.2.384.328.521.13.137.278.238.446.305.172.062.36.094.568.094.266 0 .498-.051.697-.153.2-.101.365-.26.498-.474.137-.219.239-.498.305-.838.066-.344.1-.754.1-1.23Zm8.075 2.578V103h-5.584v-.779l2.795-3.112c.344-.382.61-.707.797-.972.191-.27.324-.51.398-.721.078-.215.117-.434.117-.656 0-.282-.058-.535-.175-.762a1.317 1.317 0 0 0-.504-.55 1.515 1.515 0 0 0-.809-.206c-.379 0-.695.074-.95.223a1.37 1.37 0 0 0-.562.61 2.07 2.07 0 0 0-.187.902h-1.084c0-.48.105-.92.316-1.319.211-.398.524-.715.938-.949.414-.238.924-.357 1.529-.357.539 0 1 .095 1.383.287.383.187.675.453.879.797.207.34.31.738.31 1.195a2.4 2.4 0 0 1-.129.762 3.866 3.866 0 0 1-.345.761 5.905 5.905 0 0 1-.51.75c-.192.246-.397.489-.615.727l-2.285 2.478h4.277Zm2.742-3.908h.773c.38 0 .692-.062.938-.187a1.29 1.29 0 0 0 .557-.522c.125-.223.187-.473.187-.75 0-.328-.055-.603-.164-.826a1.099 1.099 0 0 0-.492-.504c-.219-.113-.496-.17-.832-.17-.305 0-.574.06-.809.182a1.33 1.33 0 0 0-.545.504 1.496 1.496 0 0 0-.193.773H68.42c0-.433.11-.828.328-1.183a2.36 2.36 0 0 1 .92-.85c.398-.211.86-.316 1.383-.316.515 0 .967.091 1.353.275.387.18.688.45.903.809.215.355.322.798.322 1.33 0 .215-.05.445-.152.691a2.046 2.046 0 0 1-.463.68 2.39 2.39 0 0 1-.809.521c-.332.133-.73.2-1.195.2h-.926V98.2Zm0 .89v-.65h.926c.543 0 .992.065 1.347.194.356.129.635.3.838.515.207.215.352.452.434.71.086.253.129.507.129.761 0 .399-.069.752-.205 1.061-.133.308-.322.57-.569.785a2.422 2.422 0 0 1-.855.486 3.382 3.382 0 0 1-1.072.164c-.371 0-.721-.053-1.05-.158a2.711 2.711 0 0 1-.86-.457 2.139 2.139 0 0 1-.587-.744 2.342 2.342 0 0 1-.21-1.014h1.084c0 .297.064.557.193.779.133.223.32.397.563.522.246.121.535.182.867.182.332 0 .617-.057.855-.17.242-.118.428-.293.557-.528.133-.234.199-.529.199-.884 0-.356-.074-.647-.223-.873-.148-.231-.36-.4-.632-.51a2.454 2.454 0 0 0-.956-.17h-.773ZM2.537 9.201h.774c.378 0 .691-.062.937-.187a1.29 1.29 0 0 0 .557-.522c.125-.222.187-.472.187-.75 0-.328-.054-.603-.164-.826a1.098 1.098 0 0 0-.492-.504c-.219-.113-.496-.17-.832-.17-.305 0-.574.06-.809.182a1.33 1.33 0 0 0-.545.504 1.496 1.496 0 0 0-.193.773H.873c0-.433.11-.828.328-1.183a2.36 2.36 0 0 1 .92-.85c.399-.211.86-.316 1.383-.316.516 0 .967.091 1.353.275.387.18.688.45.903.809.215.355.322.798.322 1.33 0 .214-.05.445-.152.691a2.045 2.045 0 0 1-.463.68 2.39 2.39 0 0 1-.809.521c-.332.133-.73.2-1.195.2h-.926V9.2Zm0 .89v-.65h.926c.543 0 .992.065 1.348.194.355.129.634.3.837.515.207.215.352.452.434.71.086.253.129.507.129.761 0 .399-.068.752-.205 1.06-.133.31-.322.571-.569.786a2.43 2.43 0 0 1-.855.486c-.328.11-.686.164-1.072.164-.371 0-.72-.053-1.05-.158a2.717 2.717 0 0 1-.86-.457 2.14 2.14 0 0 1-.586-.744 2.34 2.34 0 0 1-.211-1.014h1.084c0 .297.064.557.193.78.133.222.32.396.563.52.246.122.535.183.867.183.332 0 .617-.057.855-.17.242-.117.428-.293.557-.528.133-.234.2-.529.2-.884 0-.356-.075-.647-.224-.873-.148-.231-.359-.4-.632-.51a2.454 2.454 0 0 0-.955-.17h-.774ZM8.912 5v9h-1.09V5h1.09Zm3.873 2.66-2.765 2.96-1.547 1.605-.088-1.155 1.107-1.324 1.969-2.086h1.324Zm-.99 6.34-2.262-3.023.563-.967L13.072 14h-1.277ZM6.31 82.055v1.3c0 .7-.062 1.29-.187 1.77s-.305.867-.539 1.16a2.052 2.052 0 0 1-.85.639c-.328.129-.699.193-1.113.193-.328 0-.63-.04-.908-.123a2.157 2.157 0 0 1-.75-.392 2.38 2.38 0 0 1-.563-.715 3.834 3.834 0 0 1-.357-1.067 7.684 7.684 0 0 1-.123-1.464v-1.301c0-.7.062-1.286.187-1.758.13-.473.311-.852.545-1.137.235-.289.516-.496.844-.62a3.14 3.14 0 0 1 1.113-.188c.332 0 .637.04.914.123.282.078.532.205.75.38.22.172.405.403.557.692.156.285.275.635.357 1.049.083.414.124.9.124 1.459ZM5.22 83.53v-1.658c0-.383-.023-.719-.07-1.008a3.169 3.169 0 0 0-.193-.75 1.484 1.484 0 0 0-.328-.504 1.159 1.159 0 0 0-.451-.28 1.621 1.621 0 0 0-.569-.095c-.257 0-.486.05-.685.147-.2.094-.367.244-.504.451-.133.207-.234.478-.305.814-.07.336-.105.745-.105 1.225v1.658c0 .383.021.721.064 1.014.047.293.115.547.205.762.09.21.2.384.328.521.13.137.278.238.446.305.172.062.361.094.568.094.266 0 .498-.051.697-.153.2-.101.366-.26.498-.474.137-.22.239-.498.305-.838.066-.344.1-.754.1-1.23ZM343.496 103.51v-6.041h1.125v6.041c0 .562-.115 1.037-.346 1.424-.23.386-.548.681-.955.884-.402.2-.865.299-1.388.299-.524 0-.989-.09-1.395-.269a2.103 2.103 0 0 1-.955-.821c-.23-.367-.346-.83-.346-1.388h1.131c0 .359.067.654.199.884.133.231.317.401.551.51.238.11.51.164.815.164.297 0 .562-.062.797-.187.238-.129.425-.319.562-.569.137-.253.205-.564.205-.931Zm6.756 1.025V99.66h1.09V106h-1.037l-.053-1.465Zm.205-1.336.451-.011c0 .421-.045.812-.135 1.171a2.505 2.505 0 0 1-.421.926 1.998 1.998 0 0 1-.768.615c-.316.145-.701.217-1.154.217-.309 0-.592-.045-.85-.135a1.676 1.676 0 0 1-.656-.416 1.887 1.887 0 0 1-.428-.732c-.098-.301-.146-.662-.146-1.084v-4.09h1.084v4.102c0 .285.031.521.093.709.067.183.155.33.264.439.113.106.238.18.375.223.141.043.285.064.434.064.461 0 .826-.088 1.095-.263a1.5 1.5 0 0 0 .58-.721c.121-.305.182-.643.182-1.014ZM354.172 97v9h-1.09v-9h1.09Zm2.724 7.711v.873c0 .355-.089.73-.269 1.125-.18.398-.432.73-.756.996l-.615-.428c.125-.172.23-.347.316-.527.086-.176.151-.359.194-.551.046-.187.07-.387.07-.597v-.891h1.06Zm9.833.398V106h-5.584v-.779l2.794-3.112c.344-.382.61-.707.797-.972.192-.27.325-.51.399-.721a1.91 1.91 0 0 0 .117-.656c0-.282-.059-.535-.176-.762a1.313 1.313 0 0 0-.504-.55 1.513 1.513 0 0 0-.808-.206c-.379 0-.696.074-.95.223a1.37 1.37 0 0 0-.562.61 2.07 2.07 0 0 0-.188.902h-1.084c0-.48.106-.92.317-1.319.211-.398.523-.715.937-.949.414-.238.924-.357 1.53-.357.539 0 1 .095 1.382.287.383.187.676.453.879.797.207.34.311.738.311 1.195a2.4 2.4 0 0 1-.129.762 3.854 3.854 0 0 1-.346.761 5.872 5.872 0 0 1-.509.75c-.192.246-.397.489-.616.727l-2.285 2.478h4.278Zm6.515-4.054v1.3c0 .7-.062 1.29-.187 1.77s-.305.867-.539 1.16a2.06 2.06 0 0 1-.85.639 3.021 3.021 0 0 1-1.113.193c-.328 0-.631-.041-.909-.123a2.172 2.172 0 0 1-.75-.392 2.393 2.393 0 0 1-.562-.715 3.847 3.847 0 0 1-.357-1.067 7.686 7.686 0 0 1-.123-1.465v-1.3c0-.7.062-1.286.187-1.758.129-.473.311-.852.545-1.137.234-.289.516-.496.844-.62a3.139 3.139 0 0 1 1.113-.188c.332 0 .637.04.914.123.281.078.531.205.75.38.219.172.404.403.557.692.156.285.275.635.357 1.049.082.414.123.9.123 1.459Zm-1.09 1.476v-1.658a6.35 6.35 0 0 0-.07-1.008 3.168 3.168 0 0 0-.193-.75 1.483 1.483 0 0 0-.329-.504 1.15 1.15 0 0 0-.451-.28 1.619 1.619 0 0 0-.568-.095c-.258 0-.486.05-.686.147a1.227 1.227 0 0 0-.503.451c-.133.207-.235.478-.305.814-.07.336-.106.745-.106 1.225v1.658c0 .383.022.721.065 1.014.047.293.115.547.205.762.09.211.199.384.328.521s.277.238.445.305c.172.062.362.094.569.094.265 0 .498-.051.697-.153a1.26 1.26 0 0 0 .498-.474 2.48 2.48 0 0 0 .305-.838c.066-.344.099-.754.099-1.231Zm8.075 2.578V106h-5.584v-.779l2.794-3.112c.344-.382.61-.707.797-.972.192-.27.325-.51.399-.721a1.91 1.91 0 0 0 .117-.656c0-.282-.059-.535-.176-.762a1.313 1.313 0 0 0-.504-.55 1.513 1.513 0 0 0-.808-.206c-.379 0-.696.074-.95.223a1.37 1.37 0 0 0-.562.61 2.07 2.07 0 0 0-.188.902h-1.084c0-.48.106-.92.317-1.319.211-.398.523-.715.937-.949.414-.238.924-.357 1.53-.357.539 0 1 .095 1.382.287.383.187.676.453.879.797.207.34.311.738.311 1.195a2.4 2.4 0 0 1-.129.762 3.854 3.854 0 0 1-.346.761 5.872 5.872 0 0 1-.509.75c-.192.246-.397.489-.616.727l-2.285 2.478h4.278Zm6.925-1.98v.891h-6.164v-.639l3.821-5.912h.884l-.949 1.71-2.525 3.95h4.933Zm-1.189-5.66V106h-1.084v-8.531h1.084Z"
                        />
                      </svg>
                    </div>

                    <Trend
                      data={{
                        topic: 'COVID-19',
                        metric: 'COVID-19_headline_7DayOccupiedBeds',
                        body: 'Last 7 days',
                        percentage_metric: 'COVID-19_headline_7DayOccupiedBedsPercentChange',
                        geography: 'England',
                        geography_type: 'Nation',
                      }}
                    />
                  </Link>
                </Card>
              </div>
              <div className={clsx('mb-3 sm:mb-6 lg:mb-0 lg:w-1/2')}>
                <Card
                  asChild
                  aria-labelledby={`chart-row-card-heading-x2`}
                  className="govuk-!-padding-5 ukhsa-chart-card relative flex flex-col bg-[var(--colour-chart-background)] no-underline transition-colors duration-200 ukhsa-focus hover:bg-[var(--colour-chart-background-hover)] focus:bg-[var(--colour-chart-background-hover)]"
                >
                  <Link href="/topics/influenza">
                    <h3 id="chart-row-card-heading-x2" className="govuk-heading-m mb-1">
                      Influenza
                    </h3>
                    <p className="govuk-body-s text-grey-1">Weekly hospital admission rates</p>

                    <div className="my-3">
                      <svg
                        data-testid="chart-image"
                        xmlns="http://www.w3.org/2000/svg"
                        width="396"
                        height="119"
                        fill="none"
                        className="w-full"
                      >
                        <path
                          fill="#181C1B"
                          d="M30.611 100.51v-6.041h1.125v6.041c0 .562-.115 1.037-.345 1.424-.23.386-.55.681-.955.884-.403.2-.866.299-1.39.299-.523 0-.987-.09-1.394-.269a2.104 2.104 0 0 1-.955-.821c-.23-.367-.345-.83-.345-1.388h1.13c0 .359.067.654.2.884.133.231.316.401.55.51.239.11.51.164.815.164.297 0 .562-.062.797-.187.238-.129.425-.319.562-.569.137-.253.205-.564.205-.931Zm6.756 1.025V96.66h1.09V103H37.42l-.053-1.465Zm.205-1.336.451-.011c0 .421-.045.812-.134 1.171a2.517 2.517 0 0 1-.422.926 1.988 1.988 0 0 1-.768.615c-.316.145-.701.217-1.154.217-.309 0-.592-.045-.85-.135a1.682 1.682 0 0 1-.656-.416 1.887 1.887 0 0 1-.428-.732 3.534 3.534 0 0 1-.146-1.084v-4.09h1.084v4.102c0 .285.031.521.094.709.066.183.154.33.263.439.114.106.239.18.375.223.14.043.285.064.434.064.46 0 .826-.088 1.095-.263.27-.18.463-.42.58-.721.122-.305.182-.643.182-1.014ZM41.287 94v9h-1.09v-9h1.09Zm2.725 7.711v.873c0 .355-.09.73-.27 1.125a2.71 2.71 0 0 1-.756.996l-.615-.428c.125-.172.23-.347.316-.527.086-.176.15-.359.194-.551.047-.187.07-.387.07-.597v-.891h1.06Zm9.832.398V103H48.26v-.779l2.795-3.112c.343-.382.61-.707.797-.972.191-.27.324-.51.398-.721.078-.215.117-.434.117-.656 0-.282-.058-.535-.176-.762a1.317 1.317 0 0 0-.504-.55 1.516 1.516 0 0 0-.808-.206c-.379 0-.695.074-.95.223a1.37 1.37 0 0 0-.562.61 2.07 2.07 0 0 0-.187.902h-1.084c0-.48.105-.92.316-1.319.211-.398.523-.715.938-.949.414-.238.923-.357 1.529-.357.539 0 1 .095 1.383.287.383.187.675.453.879.797.207.34.31.738.31 1.195a2.4 2.4 0 0 1-.129.762 3.872 3.872 0 0 1-.345.761 5.926 5.926 0 0 1-.51.75 11.68 11.68 0 0 1-.615.727l-2.286 2.478h4.278Zm6.515-4.054v1.3c0 .7-.062 1.29-.187 1.77s-.305.867-.54 1.16a2.054 2.054 0 0 1-.849.639c-.328.129-.699.193-1.113.193-.328 0-.63-.041-.908-.123a2.167 2.167 0 0 1-.75-.392 2.388 2.388 0 0 1-.563-.715 3.84 3.84 0 0 1-.357-1.067 7.684 7.684 0 0 1-.123-1.464v-1.301c0-.7.062-1.286.187-1.758.13-.473.31-.852.545-1.137.234-.289.516-.496.844-.62a3.14 3.14 0 0 1 1.113-.188c.332 0 .637.04.914.123.281.078.531.205.75.38.219.172.405.403.557.692.156.285.275.635.357 1.049.082.414.123.9.123 1.459Zm-1.09 1.476v-1.658c0-.383-.023-.719-.07-1.008a3.172 3.172 0 0 0-.193-.75 1.485 1.485 0 0 0-.328-.504 1.16 1.16 0 0 0-.451-.28 1.622 1.622 0 0 0-.569-.095c-.258 0-.486.05-.685.147-.2.094-.367.244-.504.451-.133.207-.235.478-.305.814-.07.336-.105.745-.105 1.225v1.658c0 .383.021.721.064 1.014.047.293.115.547.205.762.09.211.2.384.328.521.13.137.278.238.446.305.171.062.36.094.568.094.265 0 .498-.051.697-.153.2-.101.365-.26.498-.474.137-.219.238-.498.305-.838.066-.344.1-.754.1-1.23Zm8.075 2.578V103H61.76v-.779l2.795-3.112c.343-.382.61-.707.797-.972.191-.27.324-.51.398-.721.078-.215.117-.434.117-.656 0-.282-.058-.535-.176-.762a1.317 1.317 0 0 0-.504-.55 1.516 1.516 0 0 0-.808-.206c-.379 0-.695.074-.95.223a1.37 1.37 0 0 0-.562.61 2.07 2.07 0 0 0-.187.902h-1.084c0-.48.105-.92.316-1.319.211-.398.523-.715.938-.949.414-.238.923-.357 1.529-.357.539 0 1 .095 1.383.287.382.187.675.453.879.797.207.34.31.738.31 1.195a2.4 2.4 0 0 1-.129.762 3.872 3.872 0 0 1-.345.761 5.926 5.926 0 0 1-.51.75 11.68 11.68 0 0 1-.615.727l-2.286 2.478h4.278Zm2.742-3.908h.773c.38 0 .692-.062.938-.187a1.29 1.29 0 0 0 .556-.522c.126-.223.188-.473.188-.75 0-.328-.055-.603-.164-.826a1.099 1.099 0 0 0-.492-.504c-.219-.113-.496-.17-.832-.17-.305 0-.575.06-.809.182a1.33 1.33 0 0 0-.545.504 1.496 1.496 0 0 0-.193.773h-1.084c0-.433.11-.828.328-1.183a2.36 2.36 0 0 1 .92-.85c.398-.211.86-.316 1.383-.316.515 0 .966.091 1.353.275.387.18.688.45.903.809.214.355.322.798.322 1.33 0 .215-.05.445-.153.691a2.043 2.043 0 0 1-.462.68 2.388 2.388 0 0 1-.809.521c-.332.133-.73.2-1.195.2h-.926V98.2Zm0 .89v-.65h.926c.543 0 .992.065 1.347.194.356.129.635.3.838.515.207.215.352.452.434.71.086.253.129.507.129.761 0 .399-.069.752-.205 1.061-.133.308-.323.57-.569.785a2.422 2.422 0 0 1-.855.486 3.383 3.383 0 0 1-1.072.164c-.371 0-.721-.053-1.05-.158a2.71 2.71 0 0 1-.86-.457 2.137 2.137 0 0 1-.587-.744 2.342 2.342 0 0 1-.21-1.014h1.084c0 .297.064.557.193.779.133.223.32.397.562.522.246.121.536.182.868.182.332 0 .617-.057.855-.17.242-.118.428-.293.557-.528.132-.234.199-.529.199-.884 0-.356-.074-.647-.223-.873-.148-.231-.36-.4-.633-.51a2.454 2.454 0 0 0-.955-.17h-.773ZM2.537 9.201h.774c.378 0 .691-.062.937-.187a1.29 1.29 0 0 0 .557-.522c.125-.222.187-.472.187-.75 0-.328-.054-.603-.164-.826a1.098 1.098 0 0 0-.492-.504c-.219-.113-.496-.17-.832-.17-.305 0-.574.06-.809.182a1.33 1.33 0 0 0-.545.504 1.496 1.496 0 0 0-.193.773H.873c0-.433.11-.828.328-1.183a2.36 2.36 0 0 1 .92-.85c.399-.211.86-.316 1.383-.316.516 0 .967.091 1.353.275.387.18.688.45.903.809.215.355.322.798.322 1.33 0 .214-.05.445-.152.691a2.045 2.045 0 0 1-.463.68 2.39 2.39 0 0 1-.809.521c-.332.133-.73.2-1.195.2h-.926V9.2Zm0 .89v-.65h.926c.543 0 .992.065 1.348.194.355.129.634.3.837.515.207.215.352.452.434.71.086.253.129.507.129.761 0 .399-.068.752-.205 1.06-.133.31-.322.571-.569.786a2.43 2.43 0 0 1-.855.486c-.328.11-.686.164-1.072.164-.371 0-.72-.053-1.05-.158a2.717 2.717 0 0 1-.86-.457 2.14 2.14 0 0 1-.586-.744 2.34 2.34 0 0 1-.211-1.014h1.084c0 .297.064.557.193.78.133.222.32.396.563.52.246.122.535.183.867.183.332 0 .617-.057.855-.17.242-.117.428-.293.557-.528.133-.234.2-.529.2-.884 0-.356-.075-.647-.224-.873-.148-.231-.359-.4-.632-.51a2.454 2.454 0 0 0-.955-.17h-.774ZM8.912 5v9h-1.09V5h1.09Zm3.873 2.66-2.765 2.96-1.547 1.605-.088-1.155 1.107-1.324 1.969-2.086h1.324Zm-.99 6.34-2.262-3.023.563-.967L13.072 14h-1.277ZM6.31 82.055v1.3c0 .7-.062 1.29-.187 1.77s-.305.867-.539 1.16a2.052 2.052 0 0 1-.85.639c-.328.129-.699.193-1.113.193-.328 0-.63-.04-.908-.123a2.157 2.157 0 0 1-.75-.392 2.38 2.38 0 0 1-.563-.715 3.834 3.834 0 0 1-.357-1.067 7.684 7.684 0 0 1-.123-1.464v-1.301c0-.7.062-1.286.187-1.758.13-.473.311-.852.545-1.137.235-.289.516-.496.844-.62a3.14 3.14 0 0 1 1.113-.188c.332 0 .637.04.914.123.282.078.532.205.75.38.22.172.405.403.557.692.156.285.275.635.357 1.049.083.414.124.9.124 1.459ZM5.22 83.53v-1.658c0-.383-.023-.719-.07-1.008a3.169 3.169 0 0 0-.193-.75 1.484 1.484 0 0 0-.328-.504 1.159 1.159 0 0 0-.451-.28 1.621 1.621 0 0 0-.569-.095c-.257 0-.486.05-.685.147-.2.094-.367.244-.504.451-.133.207-.234.478-.305.814-.07.336-.105.745-.105 1.225v1.658c0 .383.021.721.064 1.014.047.293.115.547.205.762.09.21.2.384.328.521.13.137.278.238.446.305.172.062.361.094.568.094.266 0 .498-.051.697-.153.2-.101.366-.26.498-.474.137-.22.239-.498.305-.838.066-.344.1-.754.1-1.23ZM343.496 103.51v-6.041h1.125v6.041c0 .562-.115 1.037-.346 1.424-.23.386-.548.681-.955.884-.402.2-.865.299-1.388.299-.524 0-.989-.09-1.395-.269a2.103 2.103 0 0 1-.955-.821c-.23-.367-.346-.83-.346-1.388h1.131c0 .359.067.654.199.884.133.231.317.401.551.51.238.11.51.164.815.164.297 0 .562-.062.797-.187.238-.129.425-.319.562-.569.137-.253.205-.564.205-.931Zm6.756 1.025V99.66h1.09V106h-1.037l-.053-1.465Zm.205-1.336.451-.011c0 .421-.045.812-.135 1.171a2.505 2.505 0 0 1-.421.926 1.998 1.998 0 0 1-.768.615c-.316.145-.701.217-1.154.217-.309 0-.592-.045-.85-.135a1.676 1.676 0 0 1-.656-.416 1.887 1.887 0 0 1-.428-.732c-.098-.301-.146-.662-.146-1.084v-4.09h1.084v4.102c0 .285.031.521.093.709.067.183.155.33.264.439.113.106.238.18.375.223.141.043.285.064.434.064.461 0 .826-.088 1.095-.263a1.5 1.5 0 0 0 .58-.721c.121-.305.182-.643.182-1.014ZM354.172 97v9h-1.09v-9h1.09Zm2.724 7.711v.873c0 .355-.089.73-.269 1.125-.18.398-.432.73-.756.996l-.615-.428c.125-.172.23-.347.316-.527.086-.176.151-.359.194-.551.046-.187.07-.387.07-.597v-.891h1.06Zm9.833.398V106h-5.584v-.779l2.794-3.112c.344-.382.61-.707.797-.972.192-.27.325-.51.399-.721a1.91 1.91 0 0 0 .117-.656c0-.282-.059-.535-.176-.762a1.313 1.313 0 0 0-.504-.55 1.513 1.513 0 0 0-.808-.206c-.379 0-.696.074-.95.223a1.37 1.37 0 0 0-.562.61 2.07 2.07 0 0 0-.188.902h-1.084c0-.48.106-.92.317-1.319.211-.398.523-.715.937-.949.414-.238.924-.357 1.53-.357.539 0 1 .095 1.382.287.383.187.676.453.879.797.207.34.311.738.311 1.195a2.4 2.4 0 0 1-.129.762 3.854 3.854 0 0 1-.346.761 5.872 5.872 0 0 1-.509.75c-.192.246-.397.489-.616.727l-2.285 2.478h4.278Zm6.515-4.054v1.3c0 .7-.062 1.29-.187 1.77s-.305.867-.539 1.16a2.06 2.06 0 0 1-.85.639 3.021 3.021 0 0 1-1.113.193c-.328 0-.631-.041-.909-.123a2.172 2.172 0 0 1-.75-.392 2.393 2.393 0 0 1-.562-.715 3.847 3.847 0 0 1-.357-1.067 7.686 7.686 0 0 1-.123-1.465v-1.3c0-.7.062-1.286.187-1.758.129-.473.311-.852.545-1.137.234-.289.516-.496.844-.62a3.139 3.139 0 0 1 1.113-.188c.332 0 .637.04.914.123.281.078.531.205.75.38.219.172.404.403.557.692.156.285.275.635.357 1.049.082.414.123.9.123 1.459Zm-1.09 1.476v-1.658a6.35 6.35 0 0 0-.07-1.008 3.168 3.168 0 0 0-.193-.75 1.483 1.483 0 0 0-.329-.504 1.15 1.15 0 0 0-.451-.28 1.619 1.619 0 0 0-.568-.095c-.258 0-.486.05-.686.147a1.227 1.227 0 0 0-.503.451c-.133.207-.235.478-.305.814-.07.336-.106.745-.106 1.225v1.658c0 .383.022.721.065 1.014.047.293.115.547.205.762.09.211.199.384.328.521s.277.238.445.305c.172.062.362.094.569.094.265 0 .498-.051.697-.153a1.26 1.26 0 0 0 .498-.474 2.48 2.48 0 0 0 .305-.838c.066-.344.099-.754.099-1.231Zm8.075 2.578V106h-5.584v-.779l2.794-3.112c.344-.382.61-.707.797-.972.192-.27.325-.51.399-.721a1.91 1.91 0 0 0 .117-.656c0-.282-.059-.535-.176-.762a1.313 1.313 0 0 0-.504-.55 1.513 1.513 0 0 0-.808-.206c-.379 0-.696.074-.95.223a1.37 1.37 0 0 0-.562.61 2.07 2.07 0 0 0-.188.902h-1.084c0-.48.106-.92.317-1.319.211-.398.523-.715.937-.949.414-.238.924-.357 1.53-.357.539 0 1 .095 1.382.287.383.187.676.453.879.797.207.34.311.738.311 1.195a2.4 2.4 0 0 1-.129.762 3.854 3.854 0 0 1-.346.761 5.872 5.872 0 0 1-.509.75c-.192.246-.397.489-.616.727l-2.285 2.478h4.278Zm6.925-1.98v.891h-6.164v-.639l3.821-5.912h.884l-.949 1.71-2.525 3.95h4.933Zm-1.189-5.66V106h-1.084v-8.531h1.084Z"
                        />
                        <path
                          stroke="#00703C"
                          stroke-width="3"
                          d="M26 20c14.065 1.613 34.557 6.327 43.47 9.97 9.69 1.99-.026-4.36 9.664-6.745 10.974-3.808 11.315 7.59 18.753 2.495 5.398-6.562 4.669.886 10.183 0s5.974 6.255 9.191 6.712c3.216.456 5.973-2.9 9.65-2.462 3.676.439 11.028 14.534 18.84 27.065 6.226 9.986 8.214-4.483 14.647-4.483 6.434 0 22.115 24.16 22.115 17.676 0-14.768 5.526-1.331 9.19-2.685 7.216-2.668 9.484-11.309 13.786-12.083 4.302-.773 10.109 4.923 15.164 4.923s5.514-7.832 14.245-7.832c8.731 0 8.876 11.5 17.922 17.677 3.616 2.47 30.788 5.772 38.14 4.483 7.352-1.288 29.869-17.461 37.681-17.908 7.812-.447 7.352 3.58 12.866 3.58 5.515 0 13.786-11.86 22.057-11.86 8.272 0 23.436 4.028 23.436 4.028"
                        />
                      </svg>
                    </div>

                    <Trend
                      data={{
                        topic: 'COVID-19',
                        metric: 'COVID-19_headline_ONSdeaths_7DayChange',
                        body: 'Last 7 days',
                        percentage_metric: 'COVID-19_headline_ONSdeaths_7DayPercentChange',
                        geography: 'England',
                        geography_type: 'Nation',
                      }}
                    />
                  </Link>
                </Card>
              </div>
              <div className={clsx('mb-3 sm:mb-6 lg:mb-0 lg:w-1/2')}>
                <Card
                  asChild
                  aria-labelledby={`chart-row-card-heading-x3`}
                  className="govuk-!-padding-5 ukhsa-chart-card relative flex flex-col bg-[var(--colour-chart-background)] no-underline transition-colors duration-200 ukhsa-focus hover:bg-[var(--colour-chart-background-hover)] focus:bg-[var(--colour-chart-background-hover)]"
                >
                  <Link href="/topics/measles">
                    <h3 id="chart-row-card-heading-x3" className="govuk-heading-m mb-1">
                      Measles
                    </h3>
                    <p className="govuk-body-s text-grey-1">Positive cases reported</p>

                    <div className="my-3">
                      <svg
                        data-testid="chart-image"
                        xmlns="http://www.w3.org/2000/svg"
                        width="396"
                        height="119"
                        fill="none"
                        className="w-full"
                      >
                        <path
                          stroke="#AB2B17"
                          stroke-width="3"
                          d="M385.152 40.408c-6.831 6.744-11.002 9.991-19.676 13.8-9.43 2.08-14.718 2.493-24.148 0-10.679-3.981-15.12-6.838-22.359-12.163-5.253-6.86-9.838-21.04-15.205-21.966-5.366-.926-5.813 6.539-8.943 7.016-3.131.477-5.814-3.031-9.391-2.573-3.578.459-10.733 15.192-18.335 28.29C261.036 63.252 253.679 79 247.419 79c-6.261 0-5.533-8.982-16.099-12.396-3.808-1.23-5.378-1.392-8.944-2.807-7.022-2.788-9.228-11.821-13.415-12.63-4.187-.809-9.838 5.146-14.757 5.146-4.919 0-5.367-8.187-13.863-8.187-8.497 0-8.638 12.022-17.44 18.478-3.519 2.581-29.962 6.034-37.117 4.686-7.155-1.347-29.067-18.252-36.67-18.72-7.601-.467-7.154 3.743-12.52 3.743-5.367 0-13.416-12.397-21.465-12.397-8.05 0-22.807 4.21-22.807 4.21"
                        />
                        <path
                          fill="#181C1B"
                          d="M30.61 100.51v-6.041h1.124v6.041c0 .562-.115 1.037-.345 1.424-.23.386-.55.681-.955.884-.403.2-.866.299-1.39.299-.523 0-.987-.09-1.394-.269a2.104 2.104 0 0 1-.955-.821c-.23-.367-.345-.83-.345-1.388h1.13c0 .359.067.654.2.884.133.231.316.401.55.51.239.11.51.164.815.164.297 0 .562-.062.797-.187.238-.129.426-.319.562-.569.137-.253.205-.564.205-.931Zm6.755 1.025V96.66h1.09V103h-1.037l-.053-1.465Zm.205-1.336.452-.011c0 .421-.045.812-.135 1.171a2.514 2.514 0 0 1-.422.926 1.988 1.988 0 0 1-.768.615c-.316.145-.7.217-1.154.217-.309 0-.592-.045-.85-.135a1.683 1.683 0 0 1-.656-.416 1.885 1.885 0 0 1-.428-.732 3.531 3.531 0 0 1-.146-1.084v-4.09h1.084v4.102c0 .285.031.521.094.709.066.183.154.33.263.439.114.106.239.18.375.223.14.043.285.064.434.064.46 0 .826-.088 1.096-.263.27-.18.463-.42.58-.721.12-.305.181-.643.181-1.014ZM41.285 94v9h-1.09v-9h1.09Zm2.725 7.711v.873c0 .355-.09.73-.27 1.125a2.71 2.71 0 0 1-.756.996l-.615-.428c.125-.172.23-.347.316-.527.087-.176.15-.359.194-.551.047-.187.07-.387.07-.597v-.891h1.06Zm9.832.398V103h-5.584v-.779l2.795-3.112c.344-.382.61-.707.797-.972.191-.27.324-.51.398-.721.078-.215.117-.434.117-.656 0-.282-.058-.535-.175-.762a1.317 1.317 0 0 0-.505-.55 1.515 1.515 0 0 0-.808-.206c-.379 0-.695.074-.95.223a1.37 1.37 0 0 0-.562.61 2.07 2.07 0 0 0-.187.902h-1.084c0-.48.105-.92.316-1.319.211-.398.524-.715.938-.949.414-.238.924-.357 1.529-.357.539 0 1 .095 1.383.287.383.187.675.453.879.797.207.34.31.738.31 1.195a2.4 2.4 0 0 1-.129.762 3.866 3.866 0 0 1-.345.761 5.905 5.905 0 0 1-.51.75c-.192.246-.397.489-.615.727l-2.285 2.478h4.277Zm6.515-4.054v1.3c0 .7-.062 1.29-.187 1.77s-.305.867-.54 1.16a2.054 2.054 0 0 1-.849.639c-.328.129-.699.193-1.113.193-.328 0-.63-.041-.908-.123a2.165 2.165 0 0 1-.75-.392 2.384 2.384 0 0 1-.563-.715 3.84 3.84 0 0 1-.357-1.067 7.684 7.684 0 0 1-.123-1.464v-1.301c0-.7.062-1.286.187-1.758.13-.473.31-.852.545-1.137.235-.289.516-.496.844-.62a3.14 3.14 0 0 1 1.113-.188c.332 0 .637.04.914.123.282.078.532.205.75.38.22.172.405.403.557.692.156.285.275.635.357 1.049.082.414.123.9.123 1.459Zm-1.09 1.476v-1.658c0-.383-.023-.719-.07-1.008a3.172 3.172 0 0 0-.193-.75 1.483 1.483 0 0 0-.328-.504 1.159 1.159 0 0 0-.451-.28 1.621 1.621 0 0 0-.569-.095c-.258 0-.486.05-.685.147-.2.094-.367.244-.504.451-.133.207-.235.478-.305.814-.07.336-.105.745-.105 1.225v1.658c0 .383.021.721.064 1.014.047.293.115.547.205.762.09.211.2.384.328.521.13.137.278.238.446.305.172.062.36.094.568.094.266 0 .498-.051.697-.153.2-.101.365-.26.498-.474.137-.219.239-.498.305-.838.066-.344.1-.754.1-1.23Zm8.075 2.578V103h-5.584v-.779l2.795-3.112c.344-.382.61-.707.797-.972.191-.27.324-.51.398-.721.078-.215.117-.434.117-.656 0-.282-.058-.535-.175-.762a1.317 1.317 0 0 0-.504-.55 1.515 1.515 0 0 0-.809-.206c-.379 0-.695.074-.95.223a1.37 1.37 0 0 0-.562.61 2.07 2.07 0 0 0-.187.902h-1.084c0-.48.105-.92.316-1.319.211-.398.524-.715.938-.949.414-.238.924-.357 1.529-.357.539 0 1 .095 1.383.287.383.187.675.453.879.797.207.34.31.738.31 1.195a2.4 2.4 0 0 1-.129.762 3.866 3.866 0 0 1-.345.761 5.905 5.905 0 0 1-.51.75c-.192.246-.397.489-.615.727l-2.285 2.478h4.277Zm2.742-3.908h.773c.38 0 .692-.062.938-.187a1.29 1.29 0 0 0 .557-.522c.125-.223.187-.473.187-.75 0-.328-.055-.603-.164-.826a1.099 1.099 0 0 0-.492-.504c-.219-.113-.496-.17-.832-.17-.305 0-.574.06-.809.182a1.33 1.33 0 0 0-.545.504 1.496 1.496 0 0 0-.193.773H68.42c0-.433.11-.828.328-1.183a2.36 2.36 0 0 1 .92-.85c.398-.211.86-.316 1.383-.316.515 0 .967.091 1.353.275.387.18.688.45.903.809.215.355.322.798.322 1.33 0 .215-.05.445-.152.691a2.046 2.046 0 0 1-.463.68 2.39 2.39 0 0 1-.809.521c-.332.133-.73.2-1.195.2h-.926V98.2Zm0 .89v-.65h.926c.543 0 .992.065 1.347.194.356.129.635.3.838.515.207.215.352.452.434.71.086.253.129.507.129.761 0 .399-.069.752-.205 1.061-.133.308-.322.57-.569.785a2.422 2.422 0 0 1-.855.486 3.382 3.382 0 0 1-1.072.164c-.371 0-.721-.053-1.05-.158a2.711 2.711 0 0 1-.86-.457 2.139 2.139 0 0 1-.587-.744 2.342 2.342 0 0 1-.21-1.014h1.084c0 .297.064.557.193.779.133.223.32.397.563.522.246.121.535.182.867.182.332 0 .617-.057.855-.17.242-.118.428-.293.557-.528.133-.234.199-.529.199-.884 0-.356-.074-.647-.223-.873-.148-.231-.36-.4-.632-.51a2.454 2.454 0 0 0-.956-.17h-.773ZM2.537 9.201h.774c.378 0 .691-.062.937-.187a1.29 1.29 0 0 0 .557-.522c.125-.222.187-.472.187-.75 0-.328-.054-.603-.164-.826a1.098 1.098 0 0 0-.492-.504c-.219-.113-.496-.17-.832-.17-.305 0-.574.06-.809.182a1.33 1.33 0 0 0-.545.504 1.496 1.496 0 0 0-.193.773H.873c0-.433.11-.828.328-1.183a2.36 2.36 0 0 1 .92-.85c.399-.211.86-.316 1.383-.316.516 0 .967.091 1.353.275.387.18.688.45.903.809.215.355.322.798.322 1.33 0 .214-.05.445-.152.691a2.045 2.045 0 0 1-.463.68 2.39 2.39 0 0 1-.809.521c-.332.133-.73.2-1.195.2h-.926V9.2Zm0 .89v-.65h.926c.543 0 .992.065 1.348.194.355.129.634.3.837.515.207.215.352.452.434.71.086.253.129.507.129.761 0 .399-.068.752-.205 1.06-.133.31-.322.571-.569.786a2.43 2.43 0 0 1-.855.486c-.328.11-.686.164-1.072.164-.371 0-.72-.053-1.05-.158a2.717 2.717 0 0 1-.86-.457 2.14 2.14 0 0 1-.586-.744 2.34 2.34 0 0 1-.211-1.014h1.084c0 .297.064.557.193.78.133.222.32.396.563.52.246.122.535.183.867.183.332 0 .617-.057.855-.17.242-.117.428-.293.557-.528.133-.234.2-.529.2-.884 0-.356-.075-.647-.224-.873-.148-.231-.359-.4-.632-.51a2.454 2.454 0 0 0-.955-.17h-.774ZM8.912 5v9h-1.09V5h1.09Zm3.873 2.66-2.765 2.96-1.547 1.605-.088-1.155 1.107-1.324 1.969-2.086h1.324Zm-.99 6.34-2.262-3.023.563-.967L13.072 14h-1.277ZM6.31 82.055v1.3c0 .7-.062 1.29-.187 1.77s-.305.867-.539 1.16a2.052 2.052 0 0 1-.85.639c-.328.129-.699.193-1.113.193-.328 0-.63-.04-.908-.123a2.157 2.157 0 0 1-.75-.392 2.38 2.38 0 0 1-.563-.715 3.834 3.834 0 0 1-.357-1.067 7.684 7.684 0 0 1-.123-1.464v-1.301c0-.7.062-1.286.187-1.758.13-.473.311-.852.545-1.137.235-.289.516-.496.844-.62a3.14 3.14 0 0 1 1.113-.188c.332 0 .637.04.914.123.282.078.532.205.75.38.22.172.405.403.557.692.156.285.275.635.357 1.049.083.414.124.9.124 1.459ZM5.22 83.53v-1.658c0-.383-.023-.719-.07-1.008a3.169 3.169 0 0 0-.193-.75 1.484 1.484 0 0 0-.328-.504 1.159 1.159 0 0 0-.451-.28 1.621 1.621 0 0 0-.569-.095c-.257 0-.486.05-.685.147-.2.094-.367.244-.504.451-.133.207-.234.478-.305.814-.07.336-.105.745-.105 1.225v1.658c0 .383.021.721.064 1.014.047.293.115.547.205.762.09.21.2.384.328.521.13.137.278.238.446.305.172.062.361.094.568.094.266 0 .498-.051.697-.153.2-.101.366-.26.498-.474.137-.22.239-.498.305-.838.066-.344.1-.754.1-1.23ZM343.496 103.51v-6.041h1.125v6.041c0 .562-.115 1.037-.346 1.424-.23.386-.548.681-.955.884-.402.2-.865.299-1.388.299-.524 0-.989-.09-1.395-.269a2.103 2.103 0 0 1-.955-.821c-.23-.367-.346-.83-.346-1.388h1.131c0 .359.067.654.199.884.133.231.317.401.551.51.238.11.51.164.815.164.297 0 .562-.062.797-.187.238-.129.425-.319.562-.569.137-.253.205-.564.205-.931Zm6.756 1.025V99.66h1.09V106h-1.037l-.053-1.465Zm.205-1.336.451-.011c0 .421-.045.812-.135 1.171a2.505 2.505 0 0 1-.421.926 1.998 1.998 0 0 1-.768.615c-.316.145-.701.217-1.154.217-.309 0-.592-.045-.85-.135a1.676 1.676 0 0 1-.656-.416 1.887 1.887 0 0 1-.428-.732c-.098-.301-.146-.662-.146-1.084v-4.09h1.084v4.102c0 .285.031.521.093.709.067.183.155.33.264.439.113.106.238.18.375.223.141.043.285.064.434.064.461 0 .826-.088 1.095-.263a1.5 1.5 0 0 0 .58-.721c.121-.305.182-.643.182-1.014ZM354.172 97v9h-1.09v-9h1.09Zm2.724 7.711v.873c0 .355-.089.73-.269 1.125-.18.398-.432.73-.756.996l-.615-.428c.125-.172.23-.347.316-.527.086-.176.151-.359.194-.551.046-.187.07-.387.07-.597v-.891h1.06Zm9.833.398V106h-5.584v-.779l2.794-3.112c.344-.382.61-.707.797-.972.192-.27.325-.51.399-.721a1.91 1.91 0 0 0 .117-.656c0-.282-.059-.535-.176-.762a1.313 1.313 0 0 0-.504-.55 1.513 1.513 0 0 0-.808-.206c-.379 0-.696.074-.95.223a1.37 1.37 0 0 0-.562.61 2.07 2.07 0 0 0-.188.902h-1.084c0-.48.106-.92.317-1.319.211-.398.523-.715.937-.949.414-.238.924-.357 1.53-.357.539 0 1 .095 1.382.287.383.187.676.453.879.797.207.34.311.738.311 1.195a2.4 2.4 0 0 1-.129.762 3.854 3.854 0 0 1-.346.761 5.872 5.872 0 0 1-.509.75c-.192.246-.397.489-.616.727l-2.285 2.478h4.278Zm6.515-4.054v1.3c0 .7-.062 1.29-.187 1.77s-.305.867-.539 1.16a2.06 2.06 0 0 1-.85.639 3.021 3.021 0 0 1-1.113.193c-.328 0-.631-.041-.909-.123a2.172 2.172 0 0 1-.75-.392 2.393 2.393 0 0 1-.562-.715 3.847 3.847 0 0 1-.357-1.067 7.686 7.686 0 0 1-.123-1.465v-1.3c0-.7.062-1.286.187-1.758.129-.473.311-.852.545-1.137.234-.289.516-.496.844-.62a3.139 3.139 0 0 1 1.113-.188c.332 0 .637.04.914.123.281.078.531.205.75.38.219.172.404.403.557.692.156.285.275.635.357 1.049.082.414.123.9.123 1.459Zm-1.09 1.476v-1.658a6.35 6.35 0 0 0-.07-1.008 3.168 3.168 0 0 0-.193-.75 1.483 1.483 0 0 0-.329-.504 1.15 1.15 0 0 0-.451-.28 1.619 1.619 0 0 0-.568-.095c-.258 0-.486.05-.686.147a1.227 1.227 0 0 0-.503.451c-.133.207-.235.478-.305.814-.07.336-.106.745-.106 1.225v1.658c0 .383.022.721.065 1.014.047.293.115.547.205.762.09.211.199.384.328.521s.277.238.445.305c.172.062.362.094.569.094.265 0 .498-.051.697-.153a1.26 1.26 0 0 0 .498-.474 2.48 2.48 0 0 0 .305-.838c.066-.344.099-.754.099-1.231Zm8.075 2.578V106h-5.584v-.779l2.794-3.112c.344-.382.61-.707.797-.972.192-.27.325-.51.399-.721a1.91 1.91 0 0 0 .117-.656c0-.282-.059-.535-.176-.762a1.313 1.313 0 0 0-.504-.55 1.513 1.513 0 0 0-.808-.206c-.379 0-.696.074-.95.223a1.37 1.37 0 0 0-.562.61 2.07 2.07 0 0 0-.188.902h-1.084c0-.48.106-.92.317-1.319.211-.398.523-.715.937-.949.414-.238.924-.357 1.53-.357.539 0 1 .095 1.382.287.383.187.676.453.879.797.207.34.311.738.311 1.195a2.4 2.4 0 0 1-.129.762 3.854 3.854 0 0 1-.346.761 5.872 5.872 0 0 1-.509.75c-.192.246-.397.489-.616.727l-2.285 2.478h4.278Zm6.925-1.98v.891h-6.164v-.639l3.821-5.912h.884l-.949 1.71-2.525 3.95h4.933Zm-1.189-5.66V106h-1.084v-8.531h1.084Z"
                        />
                      </svg>
                    </div>

                    <Trend
                      data={{
                        topic: 'COVID-19',
                        metric: 'COVID-19_headline_7DayAdmissions',
                        body: 'Last 7 days',
                        percentage_metric: 'COVID-19_headline_7DayAdmissionsPercentChange',
                        geography: 'England',
                        geography_type: 'Nation',
                      }}
                    />
                  </Link>
                </Card>
              </div>
            </ChartRowCard>
          </section>

          {weatherHealthSummaryCardEnabled ? (
            <section
              className="govuk-!-margin-top-9"
              data-testid="category"
              aria-labelledby="category-weather-health-alerts"
            >
              <h2 className="govuk-heading-l govuk-!-margin-bottom-4" id="category-weather-health-alerts">
                <Link className="govuk-link--no-visited-state" href="/weather-health-alerts">
                  Weather health alerts
                </Link>
              </h2>
              <ChartRowCard>
                <div className={clsx('mb-3 sm:mb-6 lg:mb-0 lg:w-1/2')}>
                  <MiniMapCard />
                </div>
              </ChartRowCard>
            </section>
          ) : null}
        </>
      ) : (
        <>{body.map(renderSection)}</>
      )}

      {newLandingContentEnabled ? null : (
        <RelatedLinksV1 variant="footer">
          {relatedLinks.map(({ title, body, url, id }) => (
            <RelatedLinkV1 key={id} url={url} title={title}>
              {body}
            </RelatedLinkV1>
          ))}
        </RelatedLinksV1>
      )}
    </View>
  )
}
