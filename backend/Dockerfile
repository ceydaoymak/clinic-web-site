FROM node:18-alpine

WORKDIR /app

# package.json ve lock dosyasını kopyala
COPY package*.json ./

# Build sırasında tsc lazım olduğu için devDependencies DA kurulur
RUN npm ci

# Proje dosyalarını kopyala
COPY . .

# TypeScript build
RUN npm run build

# Production ayarları
ENV NODE_ENV=production
EXPOSE 4000

# App'i başlat
CMD ["npm", "start"]
