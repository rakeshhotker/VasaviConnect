FROM node:latest

WORKDIR /server

COPY ./package.json /server/

COPY . .

RUN npm install

EXPOSE 4000

CMD ["npm","run","start"]