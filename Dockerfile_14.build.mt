FROM node:14-alpine3.14

RUN apk update
RUN apk update && apk add git
RUN npm set unsafe-perm true
WORKDIR /app