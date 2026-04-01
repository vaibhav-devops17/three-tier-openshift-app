FROM nginx:alpine

COPY nginx.conf /etc/nginx/nginx.conf
COPY index.html /usr/share/nginx/html/

# important for OpenShift
RUN chmod -R 777 /tmp /var/cache/nginx

EXPOSE 8080
