FROM node:18.17-alpine

# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Copy app source code
COPY . .

RUN npm install

#RUN npm install pm2 -g
RUN npm install -g nodemon

# Exports
CMD ["npm", "run", "serve:dev"]

