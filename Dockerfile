
FROM node:latest

COPY server/* /usr/local/essays/

RUN cd /usr/local/essays

RUN npm install pm2 -g

RUN pm2 start build/out/bootstrap.js --watch --env production
#Enable EPEL for Node.js
