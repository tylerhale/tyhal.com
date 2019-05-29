FROM node:8 as buildlayer

# Only grab package.json and npm install
# So that normal code changes don't trigger a redownload of node_modules
WORKDIR /repo/
COPY package.json /repo/package.json
COPY package-lock.json /repo/package-lock.json
RUN npm install

# Only grab what is needed to build
COPY script/test /repo/script/test
COPY public /repo/public
COPY src /repo/src

ENV NODE_ENV production
RUN sh script/test

# New image layer so we don't put our deps folder into prod container

FROM nginx:1.16-alpine

LABEL maintainer="Tyler Hale <t.w.hale32@gmail.com>"

RUN apk --no-cache add curl

# Basic "Can we get an OK 200" as a healthcheck
HEALTHCHECK CMD curl -f http://localhost:80 || exit 1

EXPOSE 80

COPY nginx.conf /etc/nginx/nginx.conf

COPY --from=buildlayer /repo/build /site/build
