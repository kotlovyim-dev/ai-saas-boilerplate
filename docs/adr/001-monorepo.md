# ADR-001: Adopt a Turborepo Monorepo with Shared Packages

- Status: Accepted
- Date: 2026-04-9
- Deciders: kotlovyim-dev

## Context

This project ships a single product surface split across a web frontend, API backend, and shared contracts. The team needs fast local iteration, consistent dependency versions, and a straightforward way to share types and config between applications.

## Decision

Use a single Turborepo monorepo containing:

- `apps/web` for the Next.js frontend
- `apps/api` for the NestJS backend
- `packages/types`, `packages/db`, and `packages/config` for shared code

Turborepo will orchestrate build, lint, test, and typecheck tasks with pipeline caching.

## Consequences

### Positive

- Shared types and config stay in lockstep with application code.
- Single pull requests can evolve API and UI together.
- Faster CI via task-level caching and selective execution.

### Negative

- Repository-level tooling and scripts are more complex than a single app repo.
- Poorly scoped dependency boundaries can increase coupling.

## Alternatives Considered

- Polyrepo with one repo per service: simpler boundaries, higher cross-repo coordination cost.
- Nx monorepo: stronger graph tooling, higher setup and convention overhead for this starter.
