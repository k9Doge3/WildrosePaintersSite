# syntax=docker/dockerfile:1

ARG RESEND_API_KEY=placeholder

FROM node:20-alpine AS base
WORKDIR /app
ENV NEXT_TELEMETRY_DISABLED=1
RUN corepack enable && corepack prepare pnpm@9.12.0 --activate

FROM base AS deps
ARG RESEND_API_KEY
ENV RESEND_API_KEY=${RESEND_API_KEY}
COPY package*.json ./
RUN npm install --legacy-peer-deps

FROM base AS builder
ARG RESEND_API_KEY
ENV RESEND_API_KEY=${RESEND_API_KEY}
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV PORT=3000
ARG RESEND_API_KEY
ENV RESEND_API_KEY=${RESEND_API_KEY}
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=deps /app/node_modules ./node_modules
EXPOSE 3000
CMD ["npm", "start"]
