'use client'

import { useLayout } from '@/app/context/LayoutContext'

import ClassificationBanner from './ClassificationBanner'

interface BannerWrapperProps {
  size: 'small' | 'medium' | 'large'
}

export default function BannerWrapper({ size }: BannerWrapperProps) {
  const { showBanner } = useLayout()
  if (!showBanner) return null

  return <ClassificationBanner size={size} />
}
