
FROM node:latest

COPY * /essays/

RUN cd /essays

RUN npm install pm2 -g

RUN cd /essays

RUN npm run build

#Enable EPEL for Node.js
