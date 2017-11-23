
FROM nginx

COPY dist/ /usr/share/nginx/html

#Enable EPEL for Node.js
