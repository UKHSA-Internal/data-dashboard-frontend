import React from 'react'

interface CrossIconProps {
  colour?: string
}

export default function CrossIcon({ colour = 'black' }: CrossIconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="10"
      height="10"
      aria-hidden="true"
      focusable="false"
      viewBox="0 0 10 10"
      fill={colour}
    >
      <path d="M10 1.01 8.99 0 5 3.99 1.01 0 0 1.01 3.99 5 0 8.99 1.01 10 5 6.01 8.99 10 10 8.99 6.01 5 10 1.01z" />
    </svg>
  )
}
