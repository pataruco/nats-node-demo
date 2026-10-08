# Service

The one Express service in the [NATS Node.js demo](../../readme.md). It runs as `george`, `john`, `paul` or `ringo` depending on `SERVICE_NAME`.

## What it does

- Subscribes to the `beatles` subject on NATS and "sings" in its log when a message's `to` list includes its own name.
- Accepts `POST /` with `{"singers": [...]}`, validates it, and publishes `{"from": "<its name>", "to": [...]}` to `beatles`.
- Answers `GET /` with its name, so you can check it is up.

## Configuration

| Variable          | Required | Default        | What it does                                                                      |
| ----------------- | -------- | -------------- | --------------------------------------------------------------------------------- |
| `SERVICE_NAME`    | Yes      |                | One of `george`, `john`, `paul`, `ringo`. The service refuses to start otherwise. |
| `PORT`            | No       | `4000`         | HTTP port to listen on.                                                           |
| `NATS_SERVER_URL` | No       | `0.0.0.0:4222` | NATS server address.                                                              |

## Run it locally

All commands run from the repo root.

1. Start NATS:

   ```sh
   docker compose -f docker-compose-development.yml up
   ```

2. In another terminal, start the service as `george` on port 4001:

   ```sh
   pnpm start:george
   ```

3. Ask `george` to make `john` sing:

   ```sh
   curl 127.0.0.1:4001 \
     --header 'Content-Type: application/json' \
     --data '{"singers": ["john"]}'
   ```

   Nothing sings yet, because `john` is not running. Start it with `pnpm start:john` in a third terminal and send the request again.

## Files

- `main.ts`: creates the Express app, starts listening, then waits for NATS messages
- `config.ts`: reads and validates the environment variables; the list of valid names lives here
- `routes.ts`: `GET /` and `POST /`, with the Joi schema for the body
- `nats.ts`: NATS connection, subscription, and the sing loop
- `libs/logger.ts`: winston JSON logger
- `middlewares/`: request logging and the error handler

Setup, linting, formatting and the full walkthrough are in the [root readme](../../readme.md).
