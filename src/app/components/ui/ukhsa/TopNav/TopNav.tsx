'use client'

import clsx from 'clsx'
import Link from 'next/link'
import { MouseEvent, ReactNode, useState } from 'react'

/**
 * Topnav
 */
export const TopNav = ({ children }: { children: ReactNode }) => {
  const [menuOpen, setMenuOpen] = useState(false)

  const handleOpen = (event: MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault()
    setMenuOpen(!menuOpen)
    return false
  }

  return (
    <>
      <Link
        className={clsx(
          ' ukhsa-chevron govuk-link govuk-link--inverse float-right ml-5 px-2 py-1 no-underline motion-reduce:transition-none md:right-[30px] md:top-[6px] lg:hidden',
          {
            open: menuOpen,
          }
        )}
        onClick={handleOpen}
        href="/browse"
        aria-expanded={menuOpen}
        aria-controls="ukhsa-topnav"
        aria-label={`${menuOpen ? 'Hide' : 'Show'} navigation menu`}
      >
        Menu
      </Link>

      <nav
        className={clsx(
          'sticky mx-[-15px] my-0 h-full min-w-[var(--ukhsa-nav-width)] overflow-hidden border-b-[1px] border-mid-grey bg-grey-3 sm:mx-[-30px] lg:mt-7 lg:hidden lg:h-full',
          {
            'hidden h-0': !menuOpen,
          }
        )}
        id="ukhsa-topnav"
        aria-label="Menu"
      >
        <ul>{children}</ul>
      </nav>
    </>
  )
}

// /**
//  * TopNav link
//  */
// interface TopNavLinkProps {
//   children: ReactNode
//   href: string
//   subMenu?: ReactNode
// }

// export const TopNavLink = ({ children, href, subMenu }: TopNavLinkProps) => {
//   const pathname = usePathname()
//   const isActive = pathname === href

//   return (
//     <li>
//       <Link
//         href={href}
//         className={clsx(
//           'govuk-link--no-visited-state block border-l-4 px-2 py-[8px] no-underline decoration-1 hover:underline [&:not(:focus)]:hover:bg-grey-3',
//           {
//             'border-[var(--colour-blue)] font-bold [&:not(:focus)]:bg-grey-3': isActive,
//             'border-transparent no-underline': !isActive,
//           }
//         )}
//         aria-current={isActive ? 'page' : undefined}
//       >
//         {children}
//       </Link>
//       {subMenu}
//     </li>
//   )
// }
