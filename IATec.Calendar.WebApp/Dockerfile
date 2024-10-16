# Ajustar NODE_VERSION conforme necessário
ARG NODE_VERSION=20.18.0
FROM node:${NODE_VERSION}-slim as base

LABEL fly_launch_runtime="Vite"

# Definir o diretório de trabalho como /app/IATec.Calendar.WebApp
WORKDIR /app/IATec.Calendar.WebApp

# Definir o ambiente de desenvolvimento para setup local
ENV NODE_ENV="development"

# Instalar dependências de build
RUN apt-get update -qq && \
    apt-get install --no-install-recommends -y build-essential node-gyp pkg-config python-is-python3

# Copiar arquivos package.json e yarn.lock
COPY IATec.Calendar.WebApp/package.json IATec.Calendar.WebApp/yarn.lock ./

# Instalar dependências
RUN yarn install

# Copiar o código da aplicação
COPY IATec.Calendar.WebApp ./

# Etapa de desenvolvimento
FROM base as dev

# Definir o ambiente de desenvolvimento
ENV NODE_ENV=development

# Expor a porta do servidor de desenvolvimento (Vite dev server)
EXPOSE 3000

# Comando para rodar o servidor de desenvolvimento
CMD ["yarn", "dev"]

# Etapa de build (para produção)
FROM base as build

# Definir o ambiente para o build de produção
ENV NODE_ENV=production

# Rodar o build da aplicação Angular
RUN yarn build

# Etapa de produção com Nginx (para deploy)
FROM nginx:alpine

# Copiar a aplicação construída da etapa de build
COPY --from=build /app/IATec.Calendar.WebApp/dist/iatec.calendar.web-app/browser /usr/share/nginx/html
COPY IATec.Calendar.WebApp/nginx.conf /etc/nginx/conf.d/default.conf

# Expor a porta do servidor de produção
EXPOSE 80

# Iniciar o servidor Nginx
CMD ["nginx", "-g", "daemon off;"]
