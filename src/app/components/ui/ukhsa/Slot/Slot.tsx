import { Children, cloneElement, isValidElement } from 'react'
import { twMerge } from 'tailwind-merge'

export type AsChildProps<DefaultElementProps> =
  | ({ asChild?: false } & DefaultElementProps)
  | { asChild: true; children: React.ReactNode }

/**
 * Slot component (asChild pattern)
 * https://www.jacobparis.com/content/react-as-child
 */
export function Slot({
  children,
  ...props
}: React.HTMLAttributes<HTMLElement> & {
  children?: React.ReactNode
}) {
  if (isValidElement(children)) {
    const childProps = children.props as any
    return cloneElement(children, {
      ...props,
      ...childProps,
      style: {
        ...props.style,
        ...(childProps?.style || {}),
      },
      className: twMerge(props.className, childProps?.className),
    })
  }
  if (Children.count(children) > 1) {
    Children.only(null)
  }
  return null
}
