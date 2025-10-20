#!/bin/sh
#
# This script is executed before the main process starts.
# It ensures that the 'nextjs' user has the correct permissions
# on the mounted cache volume.

# Change the ownership of the cache directory to the nextjs user and group.
# The -R flag makes it recursive, which is good practice.
chown -R nextjs:nodejs /app/.next/cache

# Execute the command passed to this script (i.e., the Docker CMD)
# 'exec' replaces the shell process with the new process, which is the
# correct way to run the main application.
exec "$@"