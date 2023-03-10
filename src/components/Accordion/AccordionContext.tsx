import {
  createContext,
  useState,
  ReactNode,
  useMemo,
  useContext,
  Dispatch,
  SetStateAction,
} from 'react'

interface AccordionContext {
  expanded: Set<string>
  setExpanded: Dispatch<SetStateAction<Set<string>>>
}

const AccordionContext = createContext<AccordionContext | null>(null)

interface AccordionProviderProps {
  children: ReactNode
}

function AccordionProvider({ children }: AccordionProviderProps) {
  const [expanded, setExpanded] = useState<Set<string>>(new Set())

  const value = useMemo(
    () => ({ expanded, setExpanded }),
    [expanded, setExpanded]
  )

  return (
    <AccordionContext.Provider value={value}>
      {children}
    </AccordionContext.Provider>
  )
}

function useAccordion() {
  const context = useContext(AccordionContext)
  if (!context) {
    throw new Error('useAccordion must be used within a AccordionProvider')
  }
  return context
}

export { AccordionProvider, useAccordion }
