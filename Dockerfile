FROM node:20.10-slim

WORKDIR /todoapp

COPY . ./

RUN cd ./app && npm install && npm run build

RUN cd ./api && npm install && npm run build

RUN cd ./api/node_modules/sqlite3 && npm run install --target_platform=linux --target_libc=glibc

WORKDIR /todoapp/api

EXPOSE 3000

CMD ["npm", "run", "start:prod"]