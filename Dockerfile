
FROM nginx:v3

COPY dist/ /usr/share/nginx/html

FROM node:7.6

#Enable EPEL for Node.js
