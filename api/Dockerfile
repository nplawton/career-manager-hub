FROM node:16-alpine
WORKDIR /code
COPY package*.json .
RUN npm ci
COPY . .
EXPOSE 3000
CMD ["sh", "-c", "npm run start && npm run migrate && run npm seed"]

