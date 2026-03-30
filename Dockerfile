#
# Build stage
#
FROM node:22.13.1-bookworm-slim AS builder

WORKDIR /app


# Install dependencies based on the preferred package manager
COPY package.json package-lock.json ./
RUN \
  if [ -f yarn.lock ]; then yarn --frozen-lockfile; \
  elif [ -f package-lock.json ]; then npm ci; \
  elif [ -f pnpm-lock.yaml ]; then yarn global add pnpm && pnpm i --frozen-lockfile; \
  else echo "Lockfile not found." && exit 1; \
  fi

# Copy source and build a standalone Next.js output
COPY . .

# Disable telemetry during build
ENV NEXT_TELEMETRY_DISABLED 1

# Ensure the standalone output traces the cache handler + its deps into `.next/standalone`.
RUN npm run build && mkdir -p /app/.next/cache/fetch-cache

#
# Runtime stage (distroless, nonroot)
# Only copy what is required to run the built app.
#

# Pinned digest; bump when upgrading the runtime image (see: docker buildx imagetools inspect gcr.io/distroless/nodejs22:nonroot).
FROM gcr.io/distroless/nodejs22@sha256:c76575945c7abe77aec0cfd130944a875826f8433de2f113c1d9f7d2567d4fee AS runner

WORKDIR /app

ENV NODE_ENV production
ENV KEEP_ALIVE_TIMEOUT 61000

# Disable telemetry during runtime
ENV NEXT_TELEMETRY_DISABLED 1
ENV TZ "Europe/London"

# Next.js standalone output (server.js + minimal node_modules) + static assets.
# Keep copied layers non-writable; mount a writable cache at runtime if needed.
COPY --from=builder --chown=nonroot:nonroot --chmod=555 /app/public ./public
# Do not copy `.next/cache` into the image (it is runtime state). In compose we mount a writable tmpfs
# at `/app/.next/cache` for Next.js to create `fetch-cache` etc.

# Automatically leverage output traces to reduce image size
# https://nextjs.org/docs/advanced-features/output-file-tracing
COPY --from=builder --chown=nonroot:nonroot --chmod=555 /app/.next/standalone ./
COPY --from=builder --chown=nonroot:nonroot --chmod=555 /app/.next/static ./.next/static
COPY --from=builder --chown=nonroot:nonroot --chmod=444 /app/next.config.js ./next.config.js
COPY --from=builder --chown=nonroot:nonroot --chmod=444 /app/cache-handler.mjs ./cache-handler.mjs

EXPOSE 3000

ENV PORT 3000

CMD ["server.js"]