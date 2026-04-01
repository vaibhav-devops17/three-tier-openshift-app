FROM nginx:alpine

COPY nginx.conf /etc/nginx/nginx.conf
COPY index.html /usr/share/nginx/html/

# fix permissions for OpenShift
RUN mkdir -p /tmp/client_temp \
    && chmod -R 777 /tmp \
    && chmod -R 777 /usr/share/nginx/html

EXPOSE 8080
