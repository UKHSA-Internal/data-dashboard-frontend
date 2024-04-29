import 'module-alias/register'

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
  '@/config': `${process.cwd()}/src/config`,
  '@/lib': `${process.cwd()}/src/lib`,
  '@/api': `${process.cwd()}/src/api`,
})

import express from 'express'

import bulkDownloads from './handlers/bulkdownloads/v1'
import charts from './handlers/charts/v3'
import pages from './handlers/cms/pages'
import page from './handlers/cms/pages/[id]'
import downloads from './handlers/downloads/v2'
import flags from './handlers/flags/client/features'
import geographies from './handlers/geographies/v2/[topic]'
import globalBanners from './handlers/global-banners/v1'
import headlines from './handlers/headlines/v3'
import suggestions from './handlers/suggestions/v1'
import tables from './handlers/tables/v4'
import trends from './handlers/trends/v3'

const app = express()

app.use(express.urlencoded())
app.use(express.json())

// CMS endpoints
app.get('/api/pages', pages)
app.get('/api/pages/:id', page)

// GET endpoints
app.get('/api/headlines/v3', headlines)
app.get('/api/trends/v3', trends)
app.get('/api/bulkdownloads/v1', bulkDownloads)
app.get('/api/geographies/v2/:topic', geographies)
app.get('/api/global-banners/v1', globalBanners)

// POST endpoints
app.post('/api/charts/v3', charts)
app.post('/api/tables/v4', tables)
app.post('/api/downloads/v2', downloads)

// Misc endpoints
app.post('/api/suggestions/v1', suggestions)
app.get('/flags/client/features', flags)

app.listen(3005, () => {
  console.log('Mock server started on port 3005!')
})
