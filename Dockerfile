FROM node:24

# Node 25+ images no longer ship corepack, so install pnpm directly.
# pnpm then honours the version pinned in the root package.json.
RUN npm install -g pnpm@12

WORKDIR /nats-node-demo

COPY pnpm-lock.yaml pnpm-workspace.yaml package.json ./
COPY projects/service/package.json projects/service/

RUN pnpm install --frozen-lockfile

COPY projects/service projects/service/

ENV NATS_SERVER_URL=nats:4222

CMD ["pnpm", "--filter", "service", "start"]
