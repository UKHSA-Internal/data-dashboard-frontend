'use client'

import { createContext, useContext, useState } from 'react'

interface LayoutContextType {
  showBanner: boolean | null
  setShowBanner: (val: boolean) => void
}
const LayoutContext = createContext<LayoutContextType>({
  showBanner: null,
  setShowBanner: () => {},
})

export const LayoutProvider = ({ children }: { children: React.ReactNode }) => {
  const [showBanner, setShowBanner] = useState<boolean | null>(null)

  return <LayoutContext.Provider value={{ showBanner, setShowBanner }}>{children}</LayoutContext.Provider>
}

export const useLayout = () => useContext(LayoutContext)
