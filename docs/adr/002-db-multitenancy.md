# ADR-002: Use Shared-Schema Multi-Tenancy with Tenant-Scoped Access

- Status: Accepted
- Date: 2026-04-9
- Deciders: kotlovyim-dev

## Context

The product must support many customer tenants while keeping operational complexity low for an early-stage SaaS architecture. Tenant isolation is a hard requirement for all business data and AI artifacts.

## Decision

Use a shared PostgreSQL schema with a mandatory `tenant_id` on tenant-owned tables. Enforce tenant scoping in application services and guards. The tenant context is derived from authenticated identity, never from client-submitted payload fields.

## Consequences

### Positive

- Lower operational overhead than schema-per-tenant or database-per-tenant models.
- Efficient use of pooled resources and straightforward analytics across tenants.
- Compatible with future hardening via Postgres Row-Level Security.

### Negative

- Any missed tenant filter becomes a high-risk data leak path.
- Migrations and indexes must be tuned for mixed-tenant cardinality.

## Alternatives Considered

- Schema per tenant: stronger blast-radius isolation, heavy lifecycle overhead.
- Database per tenant: strongest isolation, highest infrastructure and orchestration cost.
