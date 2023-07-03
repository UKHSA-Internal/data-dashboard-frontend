/**
 * Navigation links & page hierarchy are hard-coded into the app for the MVP
 */

import type { NavigationLink } from '../NavigationLink/NavigationLink'

export const primaryLinksData: NavigationLink[] = [
  {
    title: 'Home',
    url: '/',
  },
  {
    title: 'API',
    url: `${process.env.API_URL}/api/public/timeseries`,
  },
  {
    title: 'About',
    url: '/about',
  },
  {
    title: "What's new",
    url: '/whats-new',
  },
]
