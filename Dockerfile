FROM node:lastest

COPY . /app

WORKDIR /app

RUN npm install

CMD npm start