
FROM node:latest

COPY src/ /usr/local/essays/

COPY proxy/ /usr/local/essays/

COPY server/ /usr/local/essays/

COPY src/ /usr/local/essays/

COPY webpack /usr/local/essays/

COPY .babelrc /usr/local/essays/

COPY .stylelintrc /usr/local/essays/

COPY *.json /usr/local/essays/

COPY *.js /usr/local/essays/

RUN npm install

RUN npm install pm2 -g

RUN npm run server-start
#Enable EPEL for Node.js
