FROM node:20.15-bullseye

WORKDIR /app

COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

COPY . .
RUN yarn build

ENV REACT_APP_NODE_ENV=production
ENV REACT_APP_PORT=5000

EXPOSE 5000

CMD ["yarn", "server"]
