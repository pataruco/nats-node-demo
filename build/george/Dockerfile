FROM node:18

RUN corepack enable

RUN corepack prepare pnpm@latest --activate

WORKDIR /nats-node-demo

COPY pnpm-lock.yaml pnpm-workspace.yaml package.json  /nats-node-demo/

COPY projects/george/package.json /nats-node-demo/projects/george/

COPY projects/shared /nats-node-demo/projects/shared

RUN set -eu && \
  pnpm install;


COPY projects/george /nats-node-demo/projects/george/

EXPOSE 4001
EXPOSE 4222

ENV NATS_SERVER_URL=nats://nats:8222

ENTRYPOINT [ "pnpm" ]

CMD ["--filter" , "george", "start"]
