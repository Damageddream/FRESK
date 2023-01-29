FROM node:14-buster-slim AS builder

# Set working directory for react project
WORKDIR ./frontend
COPY ["package.json", "package-lock.json", "./"]
COPY ["public/", "public/"]
COPY ["src/", "src/"]
RUN npm install
RUN npm run build


FROM nginxinc/nginx-unprivileged:1-alpine
LABEL maintainer="dd"

COPY ./default.conf.tpl /etc/nginx/default.conf.tpl
COPY ./uwsgi_params /etc/nginx/uwsgi_params
COPY ./run.sh /run.sh

ENV LISTEN_PORT=8000
ENV APP_HOST=app
ENV APP_PORT=9000

USER root

RUN mkdir -p /vol/static && \
    chmod 755 /vol/static && \
    touch /etc/nginx/conf.d/default.conf && \
    chown nginx:nginx /etc/nginx/conf.d/default.conf && \
    chmod +x /run.sh

VOLUME /vol/static

USER nginx
COPY --from=builder /frontend/build .
CMD ["/run.sh"]