'use client'

import { useEffect } from 'react'

import { useLayout } from '@/app/context/LayoutContext'

interface PublicFlagSetterProps {
  isPublic: boolean
}

export default function PublicFlagSetter({ isPublic }: PublicFlagSetterProps) {
  const { setShowBanner } = useLayout()

  useEffect(() => {
    setShowBanner(isPublic)
  }, [isPublic])
  return null
}
