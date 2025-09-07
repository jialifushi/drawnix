FROM node:20 AS builder

WORKDIR /builder
COPY . /builder

ARG ALLOW_CODE
ENV ALLOW_CODE=${ALLOW_CODE}
ENV VITE_ALLOW_CODE=${ALLOW_CODE}

RUN npm install \
    && npx cross-env VITE_ALLOW_CODE=${ALLOW_CODE} nx build web

FROM lipanski/docker-static-website:2.4.0

WORKDIR /home/static
COPY --from=builder /builder/dist/apps/web/ /home/static

EXPOSE 80
CMD ["/busybox-httpd", "-f", "-v", "-p", "80"]
