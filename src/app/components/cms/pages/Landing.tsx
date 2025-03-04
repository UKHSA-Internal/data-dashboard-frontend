import dynamic from 'next/dynamic'
import { z } from 'zod'

import { Body } from '@/api/models/cms/Page'
import { View } from '@/app/components/ui/ukhsa'
import { PageComponentBaseProps } from '@/app/types'
import { getLandingPage } from '@/app/utils/cms'

interface DynamicRenderSectionProps {
  processedParams: string[]
  sectionData: z.infer<typeof Body>[number]
}

const DynamicRenderSection = dynamic<DynamicRenderSectionProps>(() =>
  import('@/app/utils/cms.utils').then((mod) => {
    return ({ processedParams, sectionData }: DynamicRenderSectionProps) => {
      return mod.renderSection(processedParams, sectionData)
    }
  })
)

export default async function LandingPage({ searchParams: { section } }: PageComponentBaseProps<{ section?: string }>) {
  let processedSectionParams: string[] = []

  if (section) {
    processedSectionParams = processedParams(section)
  }
  const { body } = await getLandingPage()

  return (
    <View>
      {body.map((sectionData, index) => (
        <DynamicRenderSection key={index} processedParams={processedSectionParams} sectionData={sectionData} />
      ))}
    </View>
  )
}

const processedParams = (value: string | string[]) => {
  const emptyArray: string[] = []

  return emptyArray.concat(value).map((section) => section.toLowerCase())
}
