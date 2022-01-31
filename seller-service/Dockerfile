FROM node:alpine

WORKDIR /app/seller

COPY package.json ./

RUN npm install

COPY . .

EXPOSE 5000

CMD [ "npm", "start" ]