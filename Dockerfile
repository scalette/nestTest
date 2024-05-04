FROM node:20.12-alpine3.18
WORKDIR /opt/app
ADD package.json package.json
RUN npm install -g pnpm
RUN pnpm install
ADD . .
RUN pnpm build
RUN pnpm prune --production
CMD ["node", "./dist/main.js"]