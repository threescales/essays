
FROM node:latest

COPY * /usr/local/essays

RUN npm install

RUN npm install pm2 -g

RUN npm run server-start
#Enable EPEL for Node.js
