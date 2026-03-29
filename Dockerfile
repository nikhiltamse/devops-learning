FROM node:18-alpine

WORKDIR /app

COPY app/package.json ./
RUN npm install

COPY app/ ./

ENV PORT=3000
ENV NODE_ENV=production

EXPOSE 3000

CMD ["node", "server.js"]
