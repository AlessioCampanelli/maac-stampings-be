FROM node:12.16-alpine As development

WORKDIR /usr/src/app

COPY package*.json ./

COPY . .

COPY dist ./

RUN npm install

RUN npm run build

FROM nginx:alpine
COPY ./app.conf /etc/nginx/conf.d/default.conf
EXPOSE ${PORT}

#CMD ["nginx -g 'daemon off;'"]

FROM node:12.16-alpine as production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install --only=production

COPY . .

COPY --from=development /usr/src/app/dist ./dist

#EXPOSE ${PORT}

#CMD ["node", "dist/main"]