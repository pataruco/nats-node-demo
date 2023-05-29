# Shared

## What is it

It is an NPM package with the shared/common libraries between all Node.js/Express servers written in TypeScript

## How to run

Install dependencies

```sh
pnpm i
```

Build libraries

```sh
pnpm build
```

Once libraries are compiled, you can consume them in a monorepo package by referencing this package in their `package.json`

```json
{
  // ...
  "dependencies": {
    "shared": "workspace:*"
  }
  // ...
}
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
