import { loadEnvConfig } from '@next/env'
import { defineConfig } from 'cypress'
import { rmdir } from 'fs'

const { combinedEnv } = loadEnvConfig(process.cwd())

export default defineConfig({
  projectId: '4ijdq4',
  env: combinedEnv,
  e2e: {
    baseUrl: 'http://localhost:3000',
    defaultCommandTimeout: 10000,
    video: false,
    viewportHeight: 1080,
    viewportWidth: 1920,
    setupNodeEvents(on) {
      on('task', {
        deleteFolder(folderName) {
          console.log('deleting folder %s', folderName)

          return new Promise((resolve, reject) => {
            rmdir(folderName, { maxRetries: 10, recursive: true }, (err) => {
              if (err) {
                console.error(err)
                return reject(err)
              }
              resolve(null)
            })
          })
        },
      })
    },
  },
})
