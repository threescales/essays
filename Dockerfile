
FROM node:latest

COPY server /usr/local/essays/

RUN cd /usr/local/essays

RUN pm2 start server/build/out/bootstrap.js --watch --env production
#Enable EPEL for Node.js
