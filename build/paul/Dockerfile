FROM node:18

RUN corepack enable

RUN corepack prepare pnpm@latest --activate

WORKDIR /nats-node-demo

COPY pnpm-lock.yaml pnpm-workspace.yaml package.json  /nats-node-demo/

COPY projects/paul/package.json /nats-node-demo/projects/paul/

COPY projects/shared /nats-node-demo/projects/shared

ENV NATS_SERVER_URL=nats:4222

RUN set -eu && \
  pnpm install;

COPY projects/paul /nats-node-demo/projects/paul/

EXPOSE 4003
EXPOSE 4222


ENTRYPOINT [ "pnpm" ]

CMD ["--filter" , "paul", "start"]
