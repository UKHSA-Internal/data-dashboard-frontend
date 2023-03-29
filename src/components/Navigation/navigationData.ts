/**
 * Navigation links & page hierarchy are hard-coded into the app for the MVP
 * Eventually, these may get served from the CMS
 */

import type { NavigationLink } from '../NavigationLink/NavigationLink'

export const primaryLinksData: NavigationLink[] = [
  {
    title: 'Home',
    url: '/',
  },
  {
    title: 'Coronavirus',
    url: '/viruses/coronavirus',
  },
  {
    title: 'Influenza',
    url: '/viruses/influenza',
  },
  {
    title: 'Other respiratory viruses',
    url: '/viruses/other-respiratory-viruses',
  },
]

export const secondaryLinksData: NavigationLink[] = [
  {
    title: 'About',
    url: '/about',
  },
  {
    title: "What's new",
    url: '/whats-new',
  },
  {
    title: 'Maps',
    url: '/maps',
  },
  {
    title: 'How to use this data',
    url: '/how-to-use-this-data',
  },
]
