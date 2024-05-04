FROM node:20.12-alpine3.18
WORKDIR /opt/app
ADD package.json package.json
ADD pnpm i
ADD . .
RUN pnpm build
RUN pnpm prune --production
CMD ["node", "./dist/main.js"]