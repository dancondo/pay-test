FROM node:12.14.1 as prod

WORKDIR /app

EXPOSE 3000

ENV PORT 3000

ENV NODE_ENV=production

COPY package.json ./

RUN npm config list

RUN npm install --only=prod && npm cache clean --force

ENV PATH /app/node_modules/.bin:$PATH

COPY . .

CMD ["node", "index.js"]

FROM prod as dev

ENV NODE_ENV=development

RUN npm install --only=development

CMD ["nodemon", "index.js"]

FROM dev as test

CMD ["npm", "test"]