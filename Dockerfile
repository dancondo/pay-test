FROM node:12.14.1-alpine3.9 as prod

WORKDIR /app/node_app

EXPOSE 3000

ENV PORT 3000

ENV NODE_ENV=production

COPY package.json ./

RUN npm install ci && npm cache clean --force

COPY . .

CMD ["node", "./index.js"]

FROM production as dev

ENV NODE_ENV=development

RUN npm install --only=development

CMD ["nodemon", "./index.js"]

FROM dev as test

CMD ["npm", "test"]