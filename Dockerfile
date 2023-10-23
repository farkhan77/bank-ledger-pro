FROM node:lts-alpine

WORKDIR /app

COPY package.json ./

COPY --chown=node:node ./package.json ./
RUN npm install --force

COPY --chown=node:node ./ ./
RUN npm run build

USER node

CMD ["npm", "run", "dev"]

EXPOSE 5173 
