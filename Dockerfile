# syntax=docker/dockerfile:1

# ---- Build stage ----
FROM node:22-alpine AS build

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

COPY . .

# Vite reads VITE_* from .env at build time and inlines them into the JS bundle.
# Pass .env as a BuildKit secret (not ARG/ENV) so keys are not stored in image metadata.
# Compose: secrets: [env]  |  CLI: docker build --secret id=env,src=.env .
RUN --mount=type=secret,id=env,target=/app/.env,required=false \
    npm run build

# ---- Runtime stage ----
FROM node:22-alpine AS runtime

WORKDIR /app

# Lightweight static file server with SPA fallback
RUN npm install -g serve@14

COPY --from=build /app/dist ./dist

EXPOSE 3000

CMD ["serve", "-s", "dist", "-l", "3000"]
