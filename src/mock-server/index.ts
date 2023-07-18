import 'module-alias/register'

import { addAliases } from 'module-alias'

// Import path aliases used in the NextJs project need to be maintained
// here as well so that they're resolved correctly by ts-node
addAliases({
  '@/config': `${process.cwd()}/src/config`,
  '@/lib': `${process.cwd()}/src/lib`,
  '@/api': `${process.cwd()}/src/api`,
})

import express from 'express'

import charts from './handlers/charts/v3'
import pages from './handlers/cms/pages'
import page from './handlers/cms/pages/[id]'
import headlines from './handlers/headlines/v2'
import suggestions from './handlers/suggestions/v1'
import tables from './handlers/tables/v2'
import trends from './handlers/trends/v2'

const app = express()

app.use(express.urlencoded())
app.use(express.json())

// CMS endpoints
app.get('/api/pages', pages)
app.get('/api/pages/:id', page)

// Metric endpoints
app.get('/api/headlines/v2', headlines)
app.get('/api/trends/v2', trends)
app.post('/api/charts/v3', charts)
app.post('/api/tables/v2', tables)

// Misc endpoints
app.post('/api/suggestions/v1', suggestions)

app.listen(3005, () => {
  console.log('Mock server started on port 3005!')
})
