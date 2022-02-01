FROM node:alpine

WORKDIR /app/database

COPY ["package.json", "package-lock.json*", "./"]

RUN npm install

COPY . .

EXPOSE 5003

CMD [ "npm", "start" ]