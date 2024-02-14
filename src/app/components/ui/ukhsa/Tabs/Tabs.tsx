'use client'

import * as TabsPrimitive from '@radix-ui/react-tabs'
import clsx from 'clsx'
import * as React from 'react'

const Tabs = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Root>
>(({ className, children, activationMode = 'manual', ...props }, ref) => (
  <TabsPrimitive.Root ref={ref} activationMode={activationMode} className={clsx('', className)} {...props}>
    {children}
  </TabsPrimitive.Root>
))

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
>(({ className, children, ...props }, ref) => (
  <TabsPrimitive.Trigger
    onClick={(evt) => {
      evt.preventDefault()
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
      }
    }}
    ref={ref}
    tabIndex={0}
    className={clsx(
      'no-js:govuk-dash js:[&:focus>span]:govuk-focus govuk-link govuk-link--no-visited-state govuk-body js:text-black js:shadow-none js:hover:text-black [&:last-child]:mr-0',
      'relative float-left ml-0 text-center js:mb-0 js:mr-[5px] js:bg-light-grey js:px-[8px] js:py-[10px] no-js:clear-both no-js:mb-2 js:sm:px-[15px] js:sm:py-[10px] js:lg:px-[20px]',
      'js:data-[state=active]:px-[7px] js:data-[state=active]:pb-[16px] js:data-[state=active]:pt-[14px] js:sm:data-[state=active]:px-[14px] js:sm:data-[state=active]:pb-[16px] js:sm:data-[state=active]:pt-[14px] js:lg:data-[state=active]:px-[19px]',
      'js:data-[state=active]:mb-[-1px] js:data-[state=active]:mt-[-5px] js:data-[state=active]:border js:data-[state=active]:border-b-0 js:data-[state=active]:border-mid-grey js:data-[state=active]:bg-white js:data-[state=active]:no-underline',
      className
    )}
    {...props}
  >
    {children}
  </TabsPrimitive.Trigger>
))
TabsTrigger.displayName = TabsPrimitive.Trigger.displayName

const TabsContent = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Content
    forceMount
    ref={ref}
    tabIndex={-1}
    className={clsx(
      'clear-both mb-0 js:border js:border-mid-grey js:bg-white js:p-3 js:lg:px-4 js:lg:py-6',
      'js:data-[state=active]:js:block data-[state=inactive]:js:hidden',
      className
    )}
    {...props}
  />
))
TabsContent.displayName = TabsPrimitive.Content.displayName

export { Tabs, TabsContent, TabsList, TabsTrigger }
