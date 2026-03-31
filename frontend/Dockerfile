FROM nginx:alpine

# remove default config
RUN rm -rf /usr/share/nginx/html/*

# copy app
COPY index.html /usr/share/nginx/html/

# fix permissions for OpenShift
RUN chmod -R 777 /var/cache/nginx /var/run /usr/share/nginx/html

EXPOSE 8080

CMD ["nginx", "-g", "daemon off;"]
