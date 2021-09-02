FROM azul/zulu-openjdk-alpine:11.0.10-jre-headless

RUN apk update && apk add nodejs-current npm
WORKDIR /app