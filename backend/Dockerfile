#
# Builder stage.
# This state compile our TypeScript to get the JavaScript code
#
FROM node:12.13.0 AS builder

WORKDIR /sources

COPY package*.json ./
COPY tsconfig*.json ./
COPY yarn.lock ./
COPY App.ts ./
COPY ./src ./src
COPY ./scripts ./scripts
RUN npm ci --quiet && npm run tsc

#
# Production stage.
# This state compile get back the JavaScript code from builder stage
# It will also install the production package only
#
FROM node:12.13.0-slim

WORKDIR /app
ENV NODE_ENV=production

COPY package*.json ./
COPY ecosystem.config.yml ./
COPY entrypoint.sh ./
RUN npm ci --quiet --only=production
RUN npm install pm2 -g --quiet

## We just need the build to execute the command
COPY --from=builder /sources/build ./build

ENTRYPOINT ["sh", "./entrypoint.sh"]

EXPOSE 3001
EXPOSE 8087

VOLUME /app/.env
