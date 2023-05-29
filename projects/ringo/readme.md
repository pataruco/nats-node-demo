# Ringo

## What is it

It is a Node.js/Express server connected to a NATS server via a NATS client and listening to events with the subject `beatles`.

It will "sing" as a server log if a message from the subject subscribed has its service name.

It receives `POST` requests to publish a message to the NATS server.

```sh
curl --location '127.0.0.1:4004' \
--header 'Content-Type: application/json' \
--data '{
    "singers": ["george", "ringo", "paul"]
}'
```

## How to run

From the root of the repo, initiate the NATS server with

```sh
 docker compose -f ./docker-compose-development.yml up
```

In another terminal tab, from the root of the repo, start `ringo` server

```sh
pnpm --filter "ringo" start
```

The server is ready to receive connections when the server shows

```sh
{"level":"info","message":"server listening 📡 {\"HOST\":\"127.0.0.1\",\"PORT\":\"4004\"}","timestamp":"2023-05-29T09:09:53.179Z"}
```

## Formatting and linting

We are using [Rome tools](https://rome.tools/) for linting and formatting

- Lint

```sh
pnpm lint
```

- format

```sh
pnpm lint
```
