FROM node:24 AS build

WORKDIR /app

COPY package*.json ./
RUN npm install
# Copy entire app into container
COPY . .

RUN npm run build

FROM nginx:alpine
RUN apk add --no-cache nodejs npm
RUN npm install -g envsub
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["/bin/sh", "-c", "npx envsub /usr/share/nginx/html/index.html /usr/share/nginx/html/index.html && nginx -g 'daemon off;'"]