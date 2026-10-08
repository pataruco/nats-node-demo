# What NATS is

NATS is a messaging system for distributed applications. Programs send messages to a named subject, and every program subscribed to that subject receives them. Senders and receivers never need each other's network address.

> Summarised from [What is NATS](https://docs.nats.io/nats-concepts/what-is-nats) and the [NATS overview](https://docs.nats.io/nats-concepts/overview) in the NATS docs.

![A publisher sends a message to a subject on the NATS server, and the server delivers it to every subscriber of that subject](https://683899388-files.gitbook.io/~/files/v0/b/gitbook-x-prod.appspot.com/o/spaces%2F-LqMYcZML1bsXrN3Ezg0%2Fuploads%2Fgit-blob-19a2ced7956b0b0681a8d97c2684d8669120eaec%2Fintro.svg?alt=media)

That one idea covers the common patterns in distributed systems:

- **Publish and subscribe**: broadcast an event to whoever is listening. This demo uses it.
- **Request and reply**: ask a question and get an answer, like a service call.
- **Streams**: process a sequence of messages, with persistence if you enable JetStream.

Because programs share the same small message-handling code, they stay decoupled from each other and scale by adding subscribers when message volume grows.

## Delivery guarantees

Core NATS delivers **at most once**. The server holds messages in memory and never writes them to disk. If no subscriber is listening when a message is sent, the message is gone. That is the same guarantee as TCP/IP, and it is enough for this demo.

For **at least once** or **exactly once** delivery, persistence, replay or a key/value store, use NATS JetStream. It is built into the server but switched off by default.

## Why teams pick NATS

- Addressing is by subject, not by hostname and port, so services can move and scale without reconfiguring clients.
- It runs almost anywhere: bare metal, VMs, containers, Kubernetes, or on a device.
- It is secure by default and does not rely on a trusted network perimeter.
- Clients learn about topology changes from the server in real time, so they need no changes when the deployment changes.

## How it compares

[Compare NATS with Kafka, RabbitMQ, gRPC and others](https://docs.nats.io/nats-concepts/overview/compare-nats) on the NATS site.

## Next steps

- [Try NATS from the command line](cli-demo.md) with the NATS CLI
- [Run the Node.js demo](../readme.md)
