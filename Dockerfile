# T1
# # build environment
# FROM node:lts-alpine as build

# LABEL maintainer="bigdeli.ali3@gmail.com"

# WORKDIR /usr/src/app

# # Copy lock file + package.json
# COPY ./app/package.json ./app/yarn.lock ./

# # Install vite globally (yarn already exists in base image)
# RUN yarn global add vite && yarn install

# # Environment variables
# ARG VITE_BASE_URL
# ENV VITE_BASE_URL=$VITE_BASE_URL

# # Copy app source
# COPY ./app .

# # Build
# RUN yarn vite build

# # nginx environment
# FROM nginx:stable-alpine

# COPY --from=build /usr/src/app/dist /usr/share/nginx/html
# COPY ./nginx.conf /etc/nginx/conf.d/default.conf

# EXPOSE 80

# CMD ["nginx", "-g", "daemon off;"]


# T2

# FROM node:18-alpine as build

# WORKDIR /usr/src/app

# # 🔥 تنظیم mirror رانفلر برای yarn
# RUN yarn config set npmRegistryServer https://mirror-npm.runflare.com \
#     && yarn config set strict-ssl false

# # فقط dependency (درستش اینه 👇)
# COPY ./app/package.json ./app/yarn.lock ./

# # 🔥 نصب پایدار
# RUN yarn install --network-timeout 1000000 --frozen-lockfile --no-progress

# # ENV
# ARG VITE_BASE_URL
# ENV VITE_BASE_URL=$VITE_BASE_URL

# # سورس
# COPY ./app ./

# # build
# RUN yarn build


# # ========= NGINX =========
# FROM nginx:stable-alpine

# COPY --from=build /usr/src/app/dist /usr/share/nginx/html
# COPY ./nginx.conf /etc/nginx/conf.d/default.conf

# EXPOSE 80

# CMD ["nginx", "-g", "daemon off;"]

# T3

# FROM hub.hamdocker.ir/library/node:20-alpine as build

# WORKDIR /usr/src/app

# # mirror npm (داخلی)
# RUN npm config set registry https://repo.hmirror.ir/npm \
#     && npm config set strict-ssl false

# # فقط dependency
# COPY ./app/package.json ./app/package-lock.json ./

# # نصب پایدار
# RUN npm install \
#     --no-audit \
#     --no-fund \
#     --prefer-offline
# # ENV
# ARG VITE_BASE_URL
# ENV VITE_BASE_URL=$VITE_BASE_URL

# # سورس
# COPY ./app ./

# # ✅ build درست
# RUN npm run build


# # ========= NGINX =========
# FROM hub.hamdocker.ir/library/nginx:stable-alpine

# RUN sed -i 's/dl-cdn.alpinelinux.org/repo.hmirror.ir\/apk/g' /etc/apk/repositories

# COPY --from=build /usr/src/app/dist /usr/share/nginx/html
# COPY ./nginx.conf /etc/nginx/conf.d/default.conf

# EXPOSE 80

# CMD ["nginx", "-g", "daemon off;"]

################T4####################
FROM hub.hamdocker.ir/library/node:22-alpine as build

WORKDIR /usr/src/app

# npm mirror (اگر مجبور هستی نگهش دار)
RUN npm config set registry https://repo.hmirror.ir/npm \
    && npm config set strict-ssl false

# فقط dependency ها (بهتر از install)
COPY ./app/package.json ./app/package-lock.json ./

RUN node -v && npm -v

RUN echo "===== package.json =====" \
    && cat package.json

RUN echo "===== lock version =====" \
    && node -e "console.log(require('./package-lock.json').lockfileVersion)"

RUN echo "===== yaml =====" \
    && grep -n "yaml" package-lock.json || true

RUN npm install --no-audit --no-fund

# مهم: Vite env ها باید ARG باشند (نه فقط ENV)
# ARG VITE_BASE_URL
# ARG VITE_IMAGE_BASE_URL

# ENV VITE_BASE_URL=$VITE_BASE_URL
# ENV VITE_IMAGE_BASE_URL=$VITE_IMAGE_BASE_URL

# سورس
COPY ./app ./

# build
RUN npm run build


# ========= NGINX =========
FROM hub.hamdocker.ir/library/nginx:stable-alpine

RUN sed -i 's/dl-cdn.alpinelinux.org/repo.hmirror.ir\/apk/g' /etc/apk/repositories

COPY --from=build /usr/src/app/dist /usr/share/nginx/html
COPY ./nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]