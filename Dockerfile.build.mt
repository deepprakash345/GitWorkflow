FROM azul/zulu-openjdk-alpine:11.0.10-jre-headless

RUN apk update && apk add nodejs-current npm
RUN npm install -g npm@latest
RUN npm set unsafe-perm true
WORKDIR /app