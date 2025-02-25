'use client'

// eslint-disable-next-line no-restricted-imports
import * as TabsPrimitive from '@radix-ui/react-tabs'
import clsx from 'clsx'
import * as React from 'react'
import { useRef, useState } from 'react'

export function useTabContent(initialValue = 'chart') {
  const [selectedTab, setSelectedTab] = useState(initialValue)
  const tabChangeTrigger = useRef(0)

  const updateTab = (newTab: string) => {
    setSelectedTab(newTab)
    tabChangeTrigger.current += 1
  }

  return [selectedTab, updateTab] as const
}

export const TabsContext = React.createContext<ReturnType<typeof useTabContent> | null>(null)

const Tabs = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Root>
>(({ className, children, activationMode = 'manual', ...props }, ref) => {
  const tabContentState = useTabContent(props.defaultValue)

  return (
    <TabsContext.Provider value={tabContentState}>
      <TabsPrimitive.Root ref={ref} activationMode={activationMode} className={clsx('', className)} {...props}>
        {children}
      </TabsPrimitive.Root>
    </TabsContext.Provider>
  )
})

const TabsList = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.List>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.List ref={ref} className={clsx('govuk-clearfix', className)} {...props} />
))
TabsList.displayName = TabsPrimitive.List.displayName

const TabsTrigger = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger>
>(({ className, children, ...props }, ref) => {
  const context = React.useContext(TabsContext)
  if (!context) throw new Error('TabsTrigger must be used within the <Tabs/> component')

  const [, setSelectedTab] = context

  return (
    <TabsPrimitive.Trigger
      onClick={(evt) => {
        evt.preventDefault()
        setSelectedTab(props.value)
      }}
      onKeyDown={(evt) => {
        const tab = evt.currentTarget
        if (evt.key == ' ' && tab instanceof HTMLAnchorElement) {
          evt.preventDefault()
          tab.dispatchEvent(
            new KeyboardEvent('keydown', {
              bubbles: true,
              key: 'Enter',
              keyCode: 13,
            })
          )
          setSelectedTab(props.value)
        }
      }}
      ref={ref}
      tabIndex={0}
      className={clsx(
        'no-js:govuk-dash js:[&:focus>span]:govuk-focus govuk-link govuk-link--no-visited-state govuk-body js:text-black js:shadow-none js:hover:text-black [&:last-child]:mr-0',
        'relative float-left ml-0 text-center js:mb-0 js:mr-1 js:bg-light-grey js:px-[8px] no-js:clear-both no-js:mb-2 js:sm:px-3 js:sm:py-2 js:lg:px-2',
        'js:data-[state=active]:px-[7px] js:data-[state=active]:pb-[16px] js:data-[state=active]:pt-[14px] js:sm:data-[state=active]:px-[14px] js:sm:data-[state=active]:pb-[16px] js:sm:data-[state=active]:pt-[14px] js:lg:data-[state=active]:px-[19px]',
        'js:data-[state=active]:-mt-1 js:data-[state=active]:mb-[-1px] js:data-[state=active]:border js:data-[state=active]:border-b-0 js:data-[state=active]:border-mid-grey js:data-[state=active]:bg-white js:data-[state=active]:no-underline',
        className
      )}
      {...props}
    >
      {children}
    </TabsPrimitive.Trigger>
  )
})
TabsTrigger.displayName = TabsPrimitive.Trigger.displayName

const TabsContent = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content>
>(({ className, ...props }, ref) => {
  const context = React.useContext(TabsContext)
  if (!context) throw new Error('TabsTrigger must be used within the <Tabs/> component')

  const [selectedTab] = context
  return (
    <TabsPrimitive.Content
      forceMount
      ref={ref}
      tabIndex={-1}
      data-state={props.value === selectedTab ? 'active' : 'inactive'}
      className={clsx(
        'clear-both mb-0 js:border js:border-mid-grey js:bg-white js:p-3 js:lg:px-4 js:lg:py-6',
        'js:data-[state=active]:js:block data-[state=inactive]:js:hidden',
        className
      )}
      {...props}
    />
  )
})
TabsContent.displayName = TabsPrimitive.Content.displayName

export { Tabs, TabsContent, TabsList, TabsTrigger }
