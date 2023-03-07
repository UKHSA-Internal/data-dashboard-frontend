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
    url: '/coronavirus',
  },
  {
    title: 'Influenza',
    url: '/influenza',
  },
  {
    title: 'Other respiratory viruses',
    url: '/other-respiratory-viruses',
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
    title: 'Metrics documentation',
    url: '/metrics-documentation',
  },
  {
    title: 'Download data',
    url: '/download-data',
  },
  {
    title: "Developer's guide",
    url: '/developer-guide',
  },
]
