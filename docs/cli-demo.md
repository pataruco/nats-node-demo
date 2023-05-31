# NATS CLI Demo

## What is it

It is a set of instructions on how to connect, publish and subscribe to a NATS server using the NATS CLI

## Installation

For macOS:

```sh
brew tap nats-io/nats-tools
brew install nats-io/nats-tools/nats
```

For Arch Linux:

```sh
yay natscli
```

## How to connect

We need to connect to a server. For this demo, we are connecting to a remote server

```sh
   nats context add nats --server demo.nats.io:4222 --description "NATS Demo" --select
# \________________________________________________/\_______________________/\________/
#               Set default context                     Some description      Select this as
#                                                                             the current context
```

In another terminal tab, subscribe to a subject

```sh
   nats sub "101ways"
# \_______/ \______/
#  Subscribe subject name
```

In another terminal tab, publish a subject

```sh
   nats pub 101ways "hello Jordan"
# \_______/\______/ \____________/
# publish  subject   payload
```

As simple as that 🚀
