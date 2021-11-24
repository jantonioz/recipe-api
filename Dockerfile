FROM node:14-alpine

WORKDIR /app

COPY . /app
RUN npm ci
# RUN npm i -g pm2

# run pm2 start server.js

EXPOSE 8080

CMD ["npm", "start"]
# CMD ["pm2", "start", "server.js"]