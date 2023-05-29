# NATS Node.JS demo

## What is it

It is a proof of concept using NATS as a connective tissue in an event-driven microservice environment.

We have 4 Node.JS RESTful servers called `george`, `john`, `paul`, and `ringo` connected to a NATS server via a NATS client and listening to events that any of them can trigger.

The idea is that each of them can publish a message to announce who/whom will "sing" via an array of strings with the name of the services.

If a service is subscribed to the message, it will "sing" as a server log with

```sh
nats-node-demo-george-1  | {"from":"george","level":"warn","message":["la ♪","la ♩","la ♫","la ♪"],"timestamp":"2023-05-29T09:36:26.470Z","to":["john","george"]}
```

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

- Send `POST` request to one of them with a payload like this. You can add or remove service names from the payload array to make more or fewer services "sing."

```json
{
  "singers": ["john"]
}
```

```json
{
  "singers": ["john", "paul", "george", "ringo"]
}
```

```sh
curl --location '127.0.0.1:4001' \
--header 'Content-Type: application/json' \
--data '{
    "singers": ["john", "george"]
}'
```

- You will receive a response like this

```json
{
  "message": "people singing: john, george"
}
```

- Check the server logs, and you will see the services "sing" like this

```sh
nats-node-demo-john-1    | {"from":"george","level":"warn","message":["la ♪","la ♩","la ♫","la ♪"],"timestamp":"2023-05-29T09:43:36.179Z","to":["john","george"]}
nats-node-demo-george-1  | {"from":"george","level":"warn","message":["la ♪","la ♩","la ♫","la ♪"],"timestamp":"2023-05-29T09:43:36.181Z","to":["john","george"]}
```

- You can send `POST` requests to any of them just by changing the port number

```sh
# Via george
curl --location '127.0.0.1:4001' \
--header 'Content-Type: application/json' \
--data '{
    "singers": ["john", "ringo", "paul"]
}'
```

```sh
# Via john
curl --location '127.0.0.1:4001' \
--header 'Content-Type: application/json' \
--data '{
    "singers": ["john", "george"]
}'
```
