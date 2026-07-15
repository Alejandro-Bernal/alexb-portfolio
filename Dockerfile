# ---- Build stage ----
FROM node:22-alpine AS build

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

COPY . .

# Vite inlines these at build time (browser-facing)
ARG VITE_BACKEND_API_URL=http://localhost:8000/contact
ARG VITE_API_KEY=
ENV VITE_BACKEND_API_URL=$VITE_BACKEND_API_URL \
    VITE_API_KEY=$VITE_API_KEY

RUN npm run build

# ---- Runtime stage ----
FROM node:22-alpine AS runtime

WORKDIR /app

# Lightweight static file server with SPA fallback
RUN npm install -g serve@14

COPY --from=build /app/dist ./dist

EXPOSE 3000

CMD ["serve", "-s", "dist", "-l", "3000"]
