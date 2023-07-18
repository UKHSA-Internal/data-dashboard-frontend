#!/bin/sh

# Script to wait for a service to return some sort of response

# usage: ./wait-for-service.sh <url>

START=$(date '+%s')
TIMEOUT=$(($START + 90))

echo "Waiting for service $1 to start..."

until $(curl --output /dev/null --silent --head --insecure $1); do
    NOW=$(date '+%s')
    
    if [ "$NOW" -gt "$TIMEOUT" ]; then
        echo "Service $1 failed to start in 90 seconds"
        exit 1
    fi

    sleep 1
done

echo "Service $1 started"