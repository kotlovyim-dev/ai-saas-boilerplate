# ADR-007: Use OpenAPI-First Contracts and Generate TypeScript Clients

- Status: Accepted
- Date: 2026-04-11
- Deciders: kotlovyim-dev

## Context

Frontend and backend teams need a reliable contract to avoid drift in request/response shapes. Manual API client maintenance causes regressions and duplicate type definitions.

## Decision

Treat OpenAPI as the source of truth for HTTP contracts. Generate a TypeScript client and shared API types from the backend specification and consume them in frontend code.

## Consequences

### Positive

- Compile-time feedback on contract mismatches.
- Reduced manual boilerplate and fewer integration regressions.
- Better API discoverability via Swagger/OpenAPI docs.

### Negative

- Requires regeneration workflow whenever endpoint contracts change.
- Generated clients can add cognitive overhead if not consistently organized.

## Alternatives Considered

- Handwritten clients: flexible but error-prone and hard to keep current.
- GraphQL: strong typing and discoverability, not aligned with current REST-first backend.
