FROM marcusandre/nodejs
MAINTAINER Dallin Osmun

RUN npm install -g supervisor
RUN npm install -g webpack

# Get npm modules
ADD package.json /tmp/package.json
RUN cd /tmp && npm install

# Build with webpack
ADD webpack.config.js /tmp/webpack.config.js
ADD client/app /tmp/client/app
RUN cd /tmp && webpack -p

# Add project
# TODO:: Only add what's relavent?
ADD client /app/client
ADD config /app/config
ADD server /app/server

RUN cp -a /tmp/package.json /app
RUN cp -a /tmp/node_modules /app
RUN cp -a /tmp/webpack.config.js /app
RUN cp -a /tmp/client/build /app/client

EXPOSE 4000
CMD cd /app && npm start
