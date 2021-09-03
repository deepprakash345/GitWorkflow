FROM azul/zulu-openjdk-alpine:11.0.10-jre-headless

RUN apk update && apk add nodejs-current npm
RUN npm install -g npm@latest
RUN npm set unsafe-perm true
RUN chown -R 1001:1001 "/root/.npm"
WORKDIR /app