# Try NATS from the command line

Publish and subscribe to a NATS subject with the NATS CLI. It takes about 5 minutes and uses the public demo server, so you do not need to run a server yourself.

## 1. Install the NATS CLI

On macOS:

```sh
brew tap nats-io/nats-tools
brew install nats-io/nats-tools/nats
```

On Arch Linux:

```sh
yay natscli
```

For other systems, download a build from the [NATS CLI releases page](https://github.com/nats-io/natscli/releases).

## 2. Point the CLI at a server

Save the public demo server as a context and select it. `demo.nats.io` is shared with everyone, so anyone can read what you publish there.

```sh
   nats context add nats --server demo.nats.io:4222 --description "NATS Demo" --select
# \________________________________________________/\_______________________/\________/
#        Create a context named "nats"                     Description        Make it the
#                                                                             current context
```

## 3. Subscribe to a subject

In one terminal:

```sh
   nats sub "red-badger"
# \_______/ \__________/
#  Subscribe  subject name
```

Pick a subject name that other people on the demo server are unlikely to use.

## 4. Publish to the subject

In a second terminal:

```sh
   nats pub red-badger "Hello there 👋"
# \_______/\__________/ \______________/
#  Publish    subject        payload
```

The first terminal prints the message:

```
[#1] Received on "red-badger"
Hello there 👋
```

Every subscriber to the subject gets the message, and the publisher never needs to know who they are. That is the whole mechanism behind the [Node.js demo](../readme.md), where 4 services subscribe to one subject and sing when a message names them.
