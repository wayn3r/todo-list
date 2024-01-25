FROM node:20.10-slim as build

WORKDIR /todoapp

COPY . ./

WORKDIR /todoapp/app

RUN npm install && npm run build

WORKDIR /todoapp/api

RUN npm install && npm run build

RUN cd ./node_modules/sqlite3 && npm run install --target_platform=linux --target_libc=glibc

RUN npm install --omit=dev

FROM node:20.10-slim

ENV NODE_ENV=production

ENV PORT=3000

WORKDIR /todoapp

COPY --from=build /todoapp/api/node_modules ./node_modules
COPY --from=build /todoapp/api/dist ./
COPY --from=build /todoapp/app/dist/app ./public

ENV STATIC_PATH=./public

EXPOSE ${PORT}

CMD ["node", "main.js"]