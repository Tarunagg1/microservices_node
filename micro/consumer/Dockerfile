FROM node:16.9.0-alpine
WORKDIR /app
RUN npm i -g nodemon
COPY package.json index.js /app/
RUN npm install
CMD ["nodemon", "index"]


