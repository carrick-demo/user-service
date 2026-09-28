# User Service (Carrick Demo)

This service is part of a multi-repository microservice demo showcasing Carrick's ability to detect cross-repository API inconsistencies.

Built on NestJS 11 (Express platform), listening on port 3001.

## Overview

The User Service serves user records and, for a single user, proxies their order history from the Order Service. Both the Order Service and the Notification Service depend on it.

## API Endpoints

All three endpoints are GET. There are no write routes.

### Get All Users

- **URL**: `/api/users`
- **Method**: GET
- **200 response**: `UsersResponse`
  ```typescript
  interface UsersResponse {
    success?: boolean;
    data?: User[];
    count?: number;
    error?: string;
  }
  ```
  Served as `{ success: true, data: users, count: users.length }`.

### Get User by ID

- **URL**: `/api/users/:id`
- **Method**: GET
- **200 response**: `User`
  ```typescript
  interface User {
    id: number;
    name: string;
    email?: string;
    age: number;
  }
  ```
  `email` is optional and genuinely absent on some seeded users.
- **404 response**: `{ "error": "User not found" }`

### Get a User's Orders

- **URL**: `/api/users/:id/orders`
- **Method**: GET
- Calls the Order Service's `GET /api/orders` and filters the result client-side by `userId`.
- **200 response**: a bare `Order[]`
  ```typescript
  interface Order {
    id: number;
    userId: number;
    product: string;
    amount: number;
  }
  ```
- **404 response**: `{ "error": "User not found" }`
- **502 response**: `{ "error": "Order service unavailable" }` when the Order Service call fails

## Configuration

Environment variables:

- `PORT` - Port to run the service on (default: 3001)
- `ORDER_SERVICE_URL` - Base URL of the Order Service (default: `http://localhost:3002`)

## Development

### Install Dependencies

```bash
npm install
```

### Start in Development Mode

```bash
npm run dev
```

### Build TypeScript

```bash
npm run build
```

The build is plain `tsc`, not the Nest CLI bundler, so the emitted layout mirrors the source tree. The entry point lands at `dist/src/main.js`.

### Start Production Server

```bash
npm start
```

## Project Layout

- `src/main.ts` - bootstrap, CORS, port binding
- `src/app.module.ts` - root module
- `src/users/users.controller.ts` - the three routes, under `@Controller("api/users")`
- `src/users/users.service.ts` - seed users and the outbound Order Service call
- `types/` - the API contract types

## Carrick Configuration

This service includes a `carrick.json` configuration file that identifies:

- Service name: `user-service`
- `ORDER_SERVICE_URL` as an internal service env var

## Type Definitions

Type definitions in the `types/` directory define the API contract for this service:

- `User` - Basic user entity
- `UserResponse` - Single user response format
- `UsersResponse` - Multiple users response format
- `CreateUserRequest` - Declared for the contract, no route consumes it
- `Order` - The Order Service shape this repo reads, hand-copied rather than shared

The `Order` copy here deliberately omits fields the Order Service actually sends. That drift is the point of the demo.
<!-- carrick: cross-repo PR-rerun test trigger -->

Last Carrick pipeline test: 2026-07-10 (cross-repo walkthrough).


Scanned with carrick 0.3.0 (type-compat v2).
Verdict backfill pass after order-service 0.3.0 stub landed.
Re-scan on carrick 0.3.1 (v2 correctness batch: poison containment, wrapped-envelope, inline-literal).
<!-- carrick reindex 1784718193-23965 (v2 verdict persistence) -->