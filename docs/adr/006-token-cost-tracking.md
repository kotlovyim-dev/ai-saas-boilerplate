# ADR-006: Track Token Usage and Cost Per Tenant

- Status: Accepted
- Date: 2026-04-11
- Deciders: kotlovyim-dev

## Context

LLM usage is a primary variable cost. In a multi-tenant product, billing fairness and budget controls require accurate attribution of token consumption by tenant and request.

## Decision

Record prompt tokens, completion tokens, model metadata, and computed cost for each LLM call. Aggregate these records by tenant for dashboards, budget enforcement, and overage handling.

## Consequences

### Positive

- Enables transparent cost reporting and internal margin visibility.
- Supports budget alerts, hard limits, and future billing integration.
- Improves incident analysis by linking spend spikes to request patterns.

### Negative

- Requires ongoing model-pricing table maintenance.
- Increases write volume and analytics query complexity.

## Alternatives Considered

- Provider-only reporting: low implementation effort, insufficient per-tenant granularity.
- Sampling-based estimation: cheaper to compute, inaccurate for billing-grade controls.
