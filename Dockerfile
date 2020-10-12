# -- BUILD STAGE --------------------------------
FROM node:12-alpine AS build

# Create app directory
WORKDIR /app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY . ./

#Equivalent to npm i, but better and faster for ci
RUN npm ci --no-audit

#Build it
RUN npm run build

#Remove all dev packages
RUN npm prune --production --no-audit

# -- RUNTIME STAGE --------------------------------
FROM node:12-alpine AS runtime

WORKDIR /app

COPY --from=build /app/.env /app/.env
COPY --from=build /app/package.json /app/package.json
COPY --from=build /app/node_modules /app/node_modules
COPY --from=build /app/build /app/build

CMD [ "npm", "run", "start" ]
