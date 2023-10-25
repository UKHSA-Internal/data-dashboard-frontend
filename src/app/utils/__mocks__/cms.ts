import { Mock } from 'ts-mockery'
import { z } from 'zod'

import type { Body, CardTypes } from '@/api/models/cms/Page'

type PageSection = z.infer<typeof Body>[number]

export const mockSection = Mock.of<PageSection>({
  id: 'testId',
  value: {
    heading: 'COVID-19',
    content: [],
  },
})

export const mockSectionWithLongHeading = Mock.of<PageSection>({
  id: 'testId',
  value: {
    heading: 'Other respiratory viruses',
    content: [],
  },
})

export const mockSectionWithCard = Mock.of<PageSection>({
  id: 'testId',
  value: {
    heading: 'Other respiratory viruses',
    content: [
      {
        id: 'cardTestId',
        type: 'text_card',
        value: {
          body: '<p>This is some cms content</p>',
        },
      },
    ],
  },
})

type CardType = z.infer<typeof CardTypes>

export const mockTextCard = Mock.of<CardType>({
  id: 'mockid',
  type: 'text_card',
  value: {
    body: '<div><h3>Text card heading</h3><p>Text card body</p></div>',
  },
})

export const mockChartRowCardWithSingleChartCard = Mock.of<CardType>({
  id: 'mockid',
  type: 'chart_row_card',
  value: {
    columns: [
      {
        id: 'col-1',
        type: 'chart_card',
        value: {
          title: 'Chart heading 1',
          body: 'Chart description 1',
          x_axis: '',
          y_axis: '',
        },
      },
    ],
  },
})

export const mockChartRowCardWithChartHeadlineAndTrendCard = Mock.of<CardType>({
  id: 'mockid',
  type: 'chart_row_card',
  value: {
    columns: [
      {
        id: 'col-1',
        type: 'chart_with_headline_and_trend_card',
        value: {
          title: 'Chart heading 1',
          body: 'Chart description 1',
          x_axis: '',
          y_axis: '',
          headline_number_columns: [
            { id: '1', type: 'percentage_number' },
            { id: '2', type: 'headline_number' },
            { id: '3', type: 'trend_number' },
          ],
        },
      },
    ],
  },
})

export const mockChartRowCardWithDualChartCard = Mock.of<CardType>({
  id: 'mockid',
  type: 'chart_row_card',
  value: {
    columns: [
      {
        id: 'col-1',
        type: 'chart_card',
        value: {
          title: 'Chart heading 1',
          body: 'Chart description 1',
          x_axis: '',
          y_axis: '',
        },
      },
      {
        id: 'col-2',
        type: 'chart_card',
        value: {
          title: 'Chart heading 2',
          body: 'Chart description 2',
          x_axis: '',
          y_axis: '',
        },
      },
    ],
  },
})
