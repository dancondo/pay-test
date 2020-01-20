FROM node:12.14.1-alpine3.9

WORKDIR /app/node_app

COPY package.json ./

RUN npm install --no-optional && npm cache clean --force

COPY . .

CMD ["node", "./index.js"]