# Social Publisher — Railway üçün konteyner.
# Tək paket kimi build olunur (monorepo asılılıqları yoxdur).
FROM node:22-slim AS base
WORKDIR /app

# pnpm (monorepo package manager).
RUN corepack enable

# Yalnız bu paketin manifestini kopyala (cache üçün).
COPY package.json ./
RUN npm install --omit=dev=false

# Mənbə + build.
COPY tsconfig.json ./
COPY src ./src
RUN npm run build

# Runtime: yalnız dist + production asılılıqları.
ENV NODE_ENV=production
# Queue və clients faylları üçün default yollar (volume mount edilə bilər).
ENV QUEUE_FILE=/app/data/queue.json
ENV CLIENTS_FILE=/app/clients.json

EXPOSE 3000
CMD ["node", "dist/index.js"]
