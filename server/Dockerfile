FROM node:lts-alpine
RUN apk add --update git

ENV USER=wss
ENV UID=12345
ENV GID=23456

RUN adduser \
    --disabled-password \
    "$USER"

USER $USER
RUN mkdir -p /home/$USER/ws-server
WORKDIR /home/$USER/ws-server
COPY --chown=$USER package.json .
RUN npm install -y
COPY --chown=$USER . .

ENV NODE_ENV production
CMD npm run start
