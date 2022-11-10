FROM node:18 AS build

RUN npm install -g gatsby-cli

WORKDIR /app
COPY package.json yarn.lock .yarnrc.yml ./
COPY .yarn ./.yarn
RUN yarn install --immutable

COPY . ./
ENV GATSBY_EXPERIMENTAL_PAGE_BUILD_ON_DATA_CHANGES=true
RUN gatsby build

FROM nginx:1.18-alpine AS deploy

WORKDIR /usr/share/nginx/html
RUN rm -rf ./*
COPY --from=build /app/public/ .
ENTRYPOINT ["nginx", "-g", "daemon off;"]
