FROM node:16.9.0-alpine
WORKDIR /app
COPY package.json .
RUN npm install
RUN npm i -g nodemon
COPY . .
EXPOSE 3000
CMD ["npm", "run","dev"]

