#
# Build stage
#
FROM node:22.13.1-bookworm-slim AS builder

WORKDIR /app

# Log effective user/group and ownership of WORKDIR (.)
RUN echo "[docker build] process: $(id -u) $(id -un) / $(id -g) $(id -gn) (groups: $(id -Gn))" \
  && echo "[docker build] WORKDIR .:" && ls -ld .

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

RUN npm run build

RUN mkdir -p /app/.next/cache/fetch-cache

#
# Runtime stage (distroless, nonroot)
# Only copy what is required to run the built app.
#
FROM gcr.io/distroless/nodejs22@sha256:c76575945c7abe77aec0cfd130944a875826f8433de2f113c1d9f7d2567d4fee AS runner

WORKDIR /app

ENV NODE_ENV production
ENV KEEP_ALIVE_TIMEOUT 61000

# Disable telemetry during runtime
ENV NEXT_TELEMETRY_DISABLED 1
ENV TZ "Europe/London"

# Next.js standalone output (server.js + minimal node_modules) + static assets
COPY --from=builder /app/public ./public

# Automatically leverage output traces to reduce image size
# https://nextjs.org/docs/advanced-features/output-file-tracing
COPY --from=builder --chown=65532:65532 /app/.next/standalone ./
COPY --from=builder --chown=65532:65532 /app/.next/static ./.next/static
COPY --from=builder /app/next.config.js ./next.config.js

COPY --from=builder --chown=65532:65532 /app/.next ./app/.next

EXPOSE 3000

ENV PORT 3000

CMD ["server.js"]