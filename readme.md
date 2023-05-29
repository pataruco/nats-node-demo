# NATS Node.JS demo

## What is it

It is a proof of concept using NATS as a connective tissue in an event-driven microservice environment.

We have 4 Node.JS RESTful servers called George, John, Paul, and Ringo connected to a NATS server via a NATS client and listening to events that any of them can trigger.

The idea is that each one of them can publish a message to announce who/whom will "sing."

![NATS Node.JS demo diagram](docs/assets/nats-node-demo.svg)

## How to run

The five services, a NATS server and 4 Node.JS/Express servers, can be built and run using `docker compose`.

Because of the number of services running, we suggest increasing resources in your container runtime. For example, we develop this using [`colima`](https://github.com/abiosoft/colima), and we initiate the runtime with `colima start --cpu 4 --memory 8 --disk 10`

- Build services

```sh
docker compose build
```

- Run services

```sh
docker compose up
```

- Once services are up and running, you can find server logs for the4 Node.JS/Express server

```sh
nats-node-demo-paul-1    | {"level":"info","message":"server listening 📡 {\"HOST\":\"127.0.0.1\",\"PORT\":\"4003\"}","timestamp":"2023-05-29T09:09:52.911Z"}
nats-node-demo-ringo-1   | {"level":"info","message":"server listening 📡 {\"HOST\":\"127.0.0.1\",\"PORT\":\"4004\"}","timestamp":"2023-05-29T09:09:53.149Z"}
nats-node-demo-john-1    | {"level":"info","message":"server listening 📡 {\"HOST\":\"127.0.0.1\",\"PORT\":\"4002\"}","timestamp":"2023-05-29T09:09:53.164Z"}
nats-node-demo-george-1  | {"level":"info","message":"server listening 📡 {\"HOST\":\"127.0.0.1\",\"PORT\":\"4001\"}","timestamp":"2023-05-29T09:09:53.179Z"}
```

- As you can see here, all of them are running in `localhost` (127.0.0.1), but in different ports

| Service name | Port |
| ------------ | ---- |
| `george`     | 4001 |
| `john`       | 4002 |
| `paul`       | 4003 |
| `ringo`      | 4004 |

-
