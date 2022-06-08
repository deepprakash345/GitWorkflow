FROM azul/zulu-openjdk-alpine:11.0.10-jre-headless

RUN apk update && apk add nodejs-current npm
RUN apk update && apk add git
RUN apk update && apk add --no-cache jq
RUN echo "http://dl-cdn.alpinelinux.org/alpine/edge/main" > /etc/apk/repositories \
    && echo "http://dl-cdn.alpinelinux.org/alpine/edge/community" >> /etc/apk/repositories \
    && echo "http://dl-cdn.alpinelinux.org/alpine/edge/testing" >> /etc/apk/repositories \
    && echo "http://dl-cdn.alpinelinux.org/alpine/v3.12/main" >> /etc/apk/repositories \
    && apk upgrade -U -a \
    && apk add \
    libstdc++ \
    chromium \
    harfbuzz \
    nss \
    freetype \
    ttf-freefont \
    font-noto-emoji \
    wqy-zenhei \
    && rm -rf /var/cache/* \
    && mkdir /var/cache/apk
RUN npm install -g npm@latest
RUN npm set unsafe-perm true
RUN npm install -g @lhci/cli@0.8.x
RUN chown -R $(id -u):$(id -g) "/root/.npm"
RUN mkdir /.npm
RUN chown -R 1001:1001 "/.npm"
WORKDIR /app
