#!/bin/sh
set -e

# Try to fix permissions on mounted cache directory, but don't fail if we can't
if [ -d /app/.next/cache ]; then
  chown -R nextjs:nodejs /app/.next/cache 2>/dev/null || true
fi

# Create a writable cache directory in /tmp as fallback
mkdir -p /tmp/.next/cache
chown -R nextjs:nodejs /tmp/.next/cache

# Export the cache dir to /tmp if we can't write to /app/.next/cache
export NEXT_CACHE_DIR=/tmp/.next/cache

# Execute the main command
exec "$@"