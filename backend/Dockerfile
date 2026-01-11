FROM node:18-bullseye

WORKDIR /app

# package.json ve lock
COPY package*.json ./

# Prod + Dev deps (tsc ve prisma için gerekli)
RUN npm ci

# Proje dosyaları
COPY . .

# Prisma client
RUN npx prisma generate

# TypeScript build
RUN npm run build

# Production env
ENV NODE_ENV=production

# Render 10000 port ister
EXPOSE 10000

# Start: migrate + server
CMD ["npm", "start"]
