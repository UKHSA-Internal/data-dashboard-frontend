/**
 * Navigation links & page hierarchy are hard-coded into the app for the MVP
 */

import type { NavigationLink } from '../NavigationLink/NavigationLink'

export const primaryLinksData: NavigationLink[] = [
  {
    title: 'Dashboard',
    url: '/',
  },
  {
    title: 'Maps',
    url: '/maps',
  },
  {
    title: 'API',
    url: '/how-to-use-this-data',
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
