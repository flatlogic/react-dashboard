FROM node:20.15-bullseye

WORKDIR /app

RUN apt-get update && apt-get install -y python3 python-is-python3 make g++ \
  && rm -rf /var/lib/apt/lists/*

COPY package.json yarn.lock ./
RUN yarn install

COPY . .
RUN yarn build

ENV REACT_APP_NODE_ENV=production
ENV REACT_APP_PORT=5000

EXPOSE 5000

CMD ["yarn", "server"]
