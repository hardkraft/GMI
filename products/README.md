## Description

[Products](https://github.com/hardkraft/GMI/tree/main/products) the project repository.

Simple CRUD App that uses Nest for API routing and Next for server side rendering. It uses Nest-Next library to join both and run them on the same server.

The app has basic localization which defaults to English if a translation is not provided.
You can change the language setting in sever/config.ts

The app uses Postgres as the database provider and Prisma ORM.

The product table is defined by the following schema:
Product = {
id: number;
name: string;
description: string;
price: runtime.Decimal;
quantity: number;
timestamp: Date;
document: Prisma.JsonValue;
}

All the fields should be self explanatory, except for the 'document' which is a JSON column to hold ad hoc values and future features.

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```
