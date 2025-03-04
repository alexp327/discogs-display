FROM node:22.14.0

WORKDIR /src

COPY package*.json ./

RUN npm ci

COPY . .

CMD ["npm", "run", "dev"]