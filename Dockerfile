# Imagem para realizar o builder da React webapp
FROM node:12.18.3 AS builder

# Informacoes sobre a imagem
LABEL author="Rafael Brayner" \
      email="me@rafaelbrayner.com" \
      date_create="01/08/2020" \
      version="1.0.0" \
      description="Build e Deploy do WebApp ReactJS" \
      license="copyright"

WORKDIR /opt/web
COPY package.json package-lock.json ./
RUN npm install

COPY . ./
RUN npm run build

FROM nginx:1.17-alpine

COPY --from=builder /opt/web/build /usr/share/nginx/html