#!/bin/sh
set -e

# Fix permissions on mounted cache directory
if [ -d /app/.next/cache ]; then
  chown -R nextjs:nodejs /app/.next/cache
fi

# Execute the main command
exec "$@"
