FROM node:latest

# set working directory
RUN mkdir -p ../api
WORKDIR /api

# install and cache app dependencies
COPY /api/package*.json ./

RUN npm install

COPY . /api

CMD ["npm", "run", "start"]