FROM node:alpine

WORKDIR /app/buyer

COPY package.json ./

RUN npm install

COPY . .

EXPOSE 5001

CMD [ "npm", "start" ]