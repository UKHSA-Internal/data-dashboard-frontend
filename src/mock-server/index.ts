import 'module-alias/register'

import cookieParser from 'cookie-parser'
import { addAliases } from 'module-alias'

declare global {
  interface Error {
    name: string
    message: string
    stack?: string
    code?: number | string
  }
}

// Import path aliases used in the NextJs project need to be maintained
// here as well so that they're resolved correctly by ts-node
addAliases({
  '@/app': `${process.cwd()}/src/app`,
  '@/config': `${process.cwd()}/src/config`,
  '@/lib': `${process.cwd()}/src/lib`,
  '@/api': `${process.cwd()}/src/api`,
})

import express from 'express'

import alertList from './handlers/alerts/v1/[category]'
import alertDetail from './handlers/alerts/v1/[category]/[region]'
import bulkDownloads from './handlers/bulkdownloads/v1'
import charts from './handlers/charts/v3'
import pages from './handlers/cms/pages'
import page from './handlers/cms/pages/[id]'
import downloads from './handlers/downloads/v2'
import flags from './handlers/flags/client/features'
import geographies from './handlers/geographies/v2/[topic]'
import geographiesv3 from './handlers/geographies/v3/[topic]'
import globalBanners from './handlers/global-banners/v2'
import headlines from './handlers/headlines/v3'
import maps from './handlers/maps/v1/v1'
import menus from './handlers/menus/v1'
import suggestions from './handlers/suggestions/v2'
import tables from './handlers/tables/v4'
import trends from './handlers/trends/v3'

const app = express()

app.use(express.urlencoded())
app.use(express.json())
app.use(cookieParser())

// CMS endpoints
app.get('/api/pages', pages)
app.get('/api/pages/:id', page)

// GET endpoints
app.get('/api/headlines/v3', headlines)
app.get('/api/trends/v3', trends)
app.get('/api/bulkdownloads/v1', bulkDownloads)
app.get('/api/geographies/v2/:topic', geographies)
app.get('/api/geographies/v3', geographiesv3)
app.get('/api/global-banners/v2', globalBanners)
app.get('/api/alerts/v1/:category', alertList)
app.get('/api/alerts/v1/:category/:region', alertDetail)
app.get('/api/menus/v1', menus)

// POST endpoints
app.post('/api/charts/v3', charts)
app.post('/api/tables/v4', tables)
app.post('/api/downloads/v2', downloads)
app.post('/api/maps/v1', maps)

// Misc endpoints
app.post('/api/suggestions/v2', suggestions)
app.get('/flags/client/features', flags)

app.listen(3005, () => {
  console.log('Mock server started on port 3005!')
})
