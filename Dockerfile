FROM node:16-alpine3.11

WORKDIR /app

COPY package*.json ./

RUN npm install

WORKDIR /app/src

COPY ./src .

CMD ["npm", "run", "start"]