#!/bin/sh
# Give the nextjs user and nodejs group ownership of the cache directory
chown -R nextjs:nodejs /app/.next/cache

exec "$@"
