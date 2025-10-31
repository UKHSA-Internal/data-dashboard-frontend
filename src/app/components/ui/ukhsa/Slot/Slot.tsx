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
    return cloneElement(children, {
      ...props,
      ...(children.props as any),
      style: {
        ...props.style,
        ...(children.props as any).style,
      },
      className: twMerge(props.className, (children.props as any).className),
    })
  }
  if (Children.count(children) > 1) {
    Children.only(null)
  }
  return null
}
