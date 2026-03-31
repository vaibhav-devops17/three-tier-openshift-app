FROM node:18-alpine

WORKDIR /app

# simple static server install
RUN npm install -g serve

COPY index.html .

EXPOSE 8080

CMD ["serve", "-l", "8080", "."]
