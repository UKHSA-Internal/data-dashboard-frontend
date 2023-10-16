'use client'

import * as TabsPrimitive from '@radix-ui/react-tabs'
import clsx from 'clsx'
import * as React from 'react'

const Tabs = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Root>
>(({ className, children, ...props }, ref) => (
  <TabsPrimitive.Root ref={ref} className={clsx('', className)} {...props}>
    {children}
  </TabsPrimitive.Root>
))

const TabsList = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.List>
>(({ className, ...props }, ref) => <TabsPrimitive.List ref={ref} className={clsx('', className)} {...props} />)
TabsList.displayName = TabsPrimitive.List.displayName

const TabsTrigger = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger>
>(({ className, children, ...props }, ref) => (
  <TabsPrimitive.Trigger
    ref={ref}
    className={clsx(
      '[&:focus>span]:govuk-focus govuk-link govuk-body hover:text-black focus:shadow-none [&:last-child]:mr-0',
      'relative float-left mb-0 ml-0 mr-[5px] bg-light-grey px-[8px] py-[10px] text-center sm:px-[15px] sm:py-[10px] lg:px-[20px]',
      'data-[state=active]:px-[7px] data-[state=active]:pb-[16px] data-[state=active]:pt-[14px] sm:data-[state=active]:px-[14px] sm:data-[state=active]:pb-[16px] sm:data-[state=active]:pt-[14px] lg:data-[state=active]:px-[19px]',
      'data-[state=active]:mb-[-1px] data-[state=active]:mt-[-5px] data-[state=active]:border data-[state=active]:border-b-0 data-[state=active]:border-mid-grey data-[state=active]:bg-white data-[state=active]:no-underline',
      'data-[state=inactive]:bg-white',
      className
    )}
    {...props}
  >
    <span>{children}</span>
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
      'clear-both mb-0 border border-mid-grey bg-white px-[20px] py-[30px]',
      'data-[state=inactive]:hidden',
      className
    )}
    {...props}
  />
))
TabsContent.displayName = TabsPrimitive.Content.displayName

export { Tabs, TabsContent, TabsList, TabsTrigger }
