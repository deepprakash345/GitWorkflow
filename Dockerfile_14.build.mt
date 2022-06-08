FROM node:14-alpine3.14

RUN apk update
RUN apk update && apk add git
RUN npm set unsafe-perm true
RUN mkdir /.npm
RUN chown -R 1001:1001 "/.npm"
WORKDIR /app
