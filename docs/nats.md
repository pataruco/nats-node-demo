# What is NATS

> Reference from https://docs.nats.io/nats-concepts/what-is-nats

NATS is a connective technology that powers modern distributed systems. Connective technology addresses discovers, and exchanges messages that drive the common patterns in distributed systems, asks and answers questions, aka services/microservices, and makes and processes statements or stream processing.

NATS makes it easy for applications to communicate by sending and receiving messages. Subject strings address and identify these messages and do not depend on the network location.

![pub sub pattern](https://683899388-files.gitbook.io/~/files/v0/b/gitbook-x-prod.appspot.com/o/spaces%2F-LqMYcZML1bsXrN3Ezg0%2Fuploads%2Fgit-blob-19a2ced7956b0b0681a8d97c2684d8669120eaec%2Fintro.svg?alt=media)

With this simple design, NATS lets programs share standard message-handling code, isolate resources and interdependencies, and scale by efficiently handling an increase in message volume, whether service requests or stream data.

## NATS Quality of service (QoS)

- **At most once QoS**: Core NATS offers an **at most once** quality of service. If a subscriber is not listening on the subject (no subject match) or is inactive when the message is sent, the message is not received. This is the same level of guarantee that TCP/IP provides. Core NATS is a fire-and-forget messaging system. It will only hold messages in memory and will never write messages directly to disk.

- **At-least / exactly once QoS**: If you need higher qualities of service (at least once and exactly once), or functionalities such as persistent streaming, de-coupled flow control, and Key/Value Store, you can use NATS JetStream, which is built into the NATS server (but needs to be enabled)

## Some benefits of using NATS

> Reference from https://docs.nats.io/nats-concepts/overview

- NATS manages addressing and discovery based on subjects and not hostname and ports
- NATS can be deployed nearly anywhere; on bare metal, in a VM, as a container, inside K8S, on a device, or in whichever environment you choose. NATS runs well within deployment frameworks or without
- NATS is secure by default and makes no requirements on network perimeter security models
- NATS infrastructure and clients communicate all topology changes in real-time. This means that NATS clients do not need to change when NATS deployments change

## Comparison with other techcnologies

To check NATS comparison to Kafka, Rabbit, gRPC, and others go to https://docs.nats.io/nats-concepts/overview/compare-nats
