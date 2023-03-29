import { defineConfig } from 'cypress'
import { rmdir } from 'fs'
import { loadEnvConfig } from '@next/env'

// const { combinedEnv } = loadEnvConfig(process.cwd())

export default defineConfig({
  projectId: '4ijdq4',
  // env: combinedEnv,
  e2e: {
    baseUrl: 'http://localhost:3000',
    video: false,
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
